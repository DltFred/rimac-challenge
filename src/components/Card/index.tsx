import { ReactNode } from 'react'
import style from './index.module.scss'

interface Baseprops {
  onClick: React.MouseEventHandler<HTMLDivElement>
  checked: boolean
  textLabel: string
  description: string
  children: ReactNode
}

export const Card = ({ onClick, checked, children, description, textLabel }: Baseprops): JSX.Element => {
  return (
    <div key={textLabel} className={`${style.container} ${checked ? style.checked : ''}`} onClick={onClick}>
      <div className={style.graphic}>
        {children}
      </div>
      <div>
        <p className={style.tittle}>{textLabel}</p>
        <p className={style.description} dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className={style.button}>
        <input type='radio' checked={checked} readOnly />
      </div>
    </div>
  )
}
