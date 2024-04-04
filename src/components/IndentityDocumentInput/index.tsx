import React, { SetStateAction } from 'react'
import { verifyCE, verifyDNI } from '../../utils/validations'
import { CustomInput } from '../ImputCustom'
import { SelectInput, option } from '../Input/SelectInput'
import style from './index.module.scss'

interface props {
  label?: string
  inputValue: string
  inputChange: (value: string) => void
  showError: boolean
  setShowError: React.Dispatch<SetStateAction<boolean>>
  selectedValue: string
  setSelectedValue: React.Dispatch<SetStateAction<string>>
}

export const IdentityDocumentInput = ({
  label,
  inputValue,
  inputChange,
  showError,
  setShowError,
  selectedValue,
  setSelectedValue
}: props): JSX.Element => {
  const options: option[] = [
    {
      label: 'DNI',
      value: 'DNI'
    },
    {
      label: 'C.E',
      value: 'CE'
    }
  ]

  const handleChangeSelect = (value: string): void => {
    setSelectedValue(value)
    setShowError(false)
    inputChange('')
  }

  return (
    <div className={`${style.container}`}>
      <SelectInput
        options={options}
        name=''
        onSelect={handleChangeSelect}
        defaultValue='DNI'
        size='large'
        inputSelect
        showError={showError}
      />
      <CustomInput
        label={label ?? 'Nro. de Documento'}
        inputSelect
        value={inputValue}
        onChange={inputChange}
        validation={selectedValue === '2' ? verifyDNI : verifyCE}
        showError={showError}
        setShowError={setShowError}
        messageError={`*Tu número de ${selectedValue} es inválido`}
        typeInput={selectedValue === 'DNI' ? '' : 'CE'}
        type={selectedValue === 'DNI' ? 'number' : ''}
        maxLength={selectedValue === 'DNI' ? '8' : '11'}
        required
      />
    </div>
  )
}
