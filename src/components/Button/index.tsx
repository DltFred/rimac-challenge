import React, { useState } from "react"
import { Spinner } from "../Spinner"
import style from './index.module.scss'

type props = {
  type?: 'red'
  children: JSX.Element | JSX.Element[] | string
  onClick: () => Promise<void> | void
}
export const ButtonComponent = ({ children, onClick, type, ...props }: props) => {
  const [loading, setLoading] = useState(false)
  const varCSSStyle = { '--backgroundColor': type === 'red' ? '#FF1C44' : 'black' }
  const handleClick = async () => {
    setLoading(true)
    try {
      await onClick()
    } finally {
      setLoading(false)
    }
  }
  return (
    <button style={varCSSStyle as React.CSSProperties} className={style.button} onClick={handleClick} {...props}>
      {loading ? <Spinner /> : children}
    </button>
  )
};

