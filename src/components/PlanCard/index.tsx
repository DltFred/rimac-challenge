import { ButtonComponent } from '../Button'
import style from './index.module.scss'

interface props {
  name: string
  price: number
  description: string[]
  handleContinue: (price: string, name: string) => Promise<void> | void
}
export const PlanCard = ({ name, price, description, handleContinue }: props): JSX.Element => {
  return (
    <div className={style.card}>
      <h2 className={style.tittle}>{name}</h2>
      <p className={style.p}>costo del plan</p>
      <p className={style.price}>
        S/{price} al mes
      </p>
      <div className={style.body}>
        <div className={style.coveragesContainer}>
          {
            description.map(item => (
              <p className={style.p3} key={item}>
                {item}
              </p>
            ))
          }
        </div>
        <div className={style.callToAction}>
          <ButtonComponent type='red' onClick={() => handleContinue(price.toString(), name)}>Seleccionar plan</ButtonComponent>
        </div>
      </div>
    </div>
  )
}
