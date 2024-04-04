import logo from '../../assets/logo.svg'
import IconTelephone from '../../assets/telephone.svg'
import style from './index.module.scss'
export const Header = (): JSX.Element => {
  return (
    <div className={style.header}>
      <img src={logo} alt="Logo" />
      <div>
        <p>¡Compra por este medio!</p>
        <a href="tel:014116001"><img src={IconTelephone} alt="telephone" />{`(01) 4116001`}</a>
      </div>
    </div>
  )
}
