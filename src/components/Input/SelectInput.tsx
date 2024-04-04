import React, { useState } from 'react'
import arrowDown from './down.svg'
import style from './index.module.scss'
export type option =
  | { value: string, label: string }
interface props {
  options: option[]
  onSelect: (value: string) => void
  name: string
  defaultValue?: string
  size?: 'large' | 'small' | 'medium' | 'x-large'
  inputSelect?: boolean
  showError?: boolean
}
const sizes = {
  small: '2rem',
  medium: '2.5rem',
  large: '3rem',
  'x-large': '3.5rem'
}

export const SelectInput = ({ options, onSelect, name, defaultValue, size = 'medium', inputSelect, showError }: props): JSX.Element => {
  const initDefaultValue = defaultValue ?? ''
  const [selectedValue, setSelectedValue] = useState(initDefaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const styleVariablesForSize = { '--size': sizes[size] }

  const placeHolder = (): string => {
    if (defaultValue == null) return 'Elige una opción'
    const [draftDefaultValue] = options.filter(option => option.value === defaultValue)
    return draftDefaultValue.label
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedValue = event.target.value
    setSelectedValue(selectedValue)
    onSelect(selectedValue)
  }
  const toggleDropdown = (): void => (setIsOpen(!isOpen))

  return (
    <div className={style.container} style={styleVariablesForSize as React.CSSProperties}>
      {/* eslint-disable-next-line */}
      <div className={`${style.comboBox} ${isOpen ? style.open : ''} ${inputSelect ? style.inputSelect : ''} ${showError ? style.selectError : ''}`} onClick={toggleDropdown}>
        <select value={selectedValue} onChange={handleSelectChange} title={name}>
          <option value=''>{placeHolder()}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div><img src={arrowDown} alt="arrow" /></div>
      </div>
      <ul className={`${style.customOptions} ${isOpen ? style.open : ''}`}>
        {options.map(option => (
          <li
            key={option.value} onClick={() => {
              handleSelectChange({ target: { value: option.value } } as never)
              toggleDropdown()
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
