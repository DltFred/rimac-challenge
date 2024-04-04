import logoWhite from '../assets/logo-white.svg'

import { Header } from '../components/Header'
import style from './index.module.scss'

export const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  return (
    <div className={style.layout}>
      <Header />
      {children}
      <div className={style.footer}>
        <img src={logoWhite} alt="Logo" />
        <p>© 2024 RIMAC Seguros y Reaseguros.</p>
      </div>
    </div>
  )
}
