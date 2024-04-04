import React from 'react'
import style from './index.module.scss'
type props = {
  children: JSX.Element | JSX.Element[] | string
  top?: string
  left?: string
}
export const Chip = ({ children, top, left }: props): JSX.Element => {
  const styleCSSVar = { '--top': top, '--left': left }
  return (
    <div className={style.chip} style={styleCSSVar as React.CSSProperties}>
      <p>{children}</p>
    </div>
  )
}
