import React from 'react'
import style from './index.module.scss'

export const Spinner = ({ color }: { color?: string }) => {
  const styleCSSVar = { '--color': color }
  return <div className={style.spinner} style={styleCSSVar as React.CSSProperties}></div>
}
