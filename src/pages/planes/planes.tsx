import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import iconForOther from '../../assets/IcAddUser.svg'
import iconForMe from '../../assets/IcProtection.svg'
import iconBack from '../../assets/arrow-back.svg'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { PlanCard } from '../../components/PlanCard'
import { FILTER_PLAN, RESUME_ROUTE } from '../../constants'
import { User } from '../../interfaces/user'
import { List, fetchPlansData } from '../../services/plans'
import { ageCalculated } from '../../utils/age'
import style from './index.module.scss'
export const Planes = (): JSX.Element => {
  const userInfo: User = JSON.parse(localStorage.getItem('data-api') ?? '')
  const styleCSSVar = { '--actual-step': '50%' }
  const [plans, setPlans] = useState({} as List[])
  const [itemSelected, setItemSelected] = useState(0)
  const [filteredPlans, setFilteredPlans] = useState([] as List[])
  const navigate = useNavigate()

  useEffect(() => {
    const plansData = async () => {
      try {
        const response = await fetchPlansData()
        const filtered = response.list.filter(item => item.age >= ageCalculated(userInfo.birthDay))
        setPlans(filtered)
      } catch (error) {
        console.log(error)
      }
    }
    plansData()
  }, [userInfo.birthDay])

  const handleClick = (param: number) => {
    if (param === 1) {
      setFilteredPlans(plans)
      setItemSelected(param)
    }
    if (param === 2) {
      const filtered = plans.map(item => ({
        ...item,
        price: item.price * 0.95
      }))
      setFilteredPlans(filtered)
      setItemSelected(param)
    }
  }
  const handleContinue = (price: string, name: string) => {
    navigate(`${RESUME_ROUTE}?name=${name}&price=${price}`)
  }

  return (
    <div className={style.container}>
      <Header />
      <div className={style.navigation}>
        <img src={iconBack} alt="volver" />
        <p>Paso 1 de 2</p>
        <div className={style.stepper} style={styleCSSVar as React.CSSProperties}></div>
      </div>
      <div className={style.section}>
        <h1>{userInfo.name} ¿Para quién deseas cotizar?</h1>
        <p>Selecciona la opción que se ajuste más a tus necesidades.</p>
        <div className={style.cards}>
          <Card
            onClick={() => { handleClick(1) }}
            checked={itemSelected === 1}
            textLabel={FILTER_PLAN[1]}
            description='Cotiza tu seguro de salud y agrega familiares si así lo deseas.' >
            <img src={iconForMe} alt="icon card" />
          </Card>
          <Card
            onClick={() => { handleClick(2) }}
            checked={itemSelected === 2}
            textLabel={FILTER_PLAN[2]}
            description='Realiza una cotización para uno de tus familiares o cualquier persona.' >
            <img src={iconForOther} alt="icon card" />
          </Card>
        </div>
      </div>

      <div className={style.plans}>
        {
          filteredPlans.map(item => (<>
            <PlanCard
              name={item.name}
              price={item.price}
              description={item.description}
              handleContinue={handleContinue} />
          </>))
        }
      </div>
    </div>
  )
}