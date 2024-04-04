import { useLocation } from 'react-router'
import icFamily from '../../assets/icFamily.svg'
import { Header } from '../../components/Header'
import style from './index.module.scss'
export const Resumen = (): JSX.Element => {
  const userInfo = JSON.parse(localStorage.getItem('data-api') ?? '')
  const userInput = JSON.parse(localStorage.getItem('user') ?? '')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const name = queryParams.get('name')
  const price = queryParams.get('price')


  return (
    <div className={style.container}>
      <Header />
      <div className={style.section}>
        <h1>Resumen del seguro</h1>
        <div className={style.card}>
          <span>Precios calculados para:</span>
          <div className={style.name}>
            <img src={icFamily} alt="" />
            <p>{userInfo.name} {userInfo.lastName}</p>
          </div>
          <h2>Responsable de pago</h2>
          <p>{userInput.documentType}: {userInput.documentNumber}</p>
          <p>Celular: {userInput.telephone}</p>
          <h2>Plan elegido</h2>
          <p>{name}</p>
          <p>Costo del plan: S/{price} al mes</p>
        </div>
      </div>
    </div>
  )
}
