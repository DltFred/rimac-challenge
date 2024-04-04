import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ButtonComponent } from '../../components/Button'
import { Chip } from '../../components/Chip'
import { CustomInput } from '../../components/ImputCustom'
import { IdentityDocumentInput } from '../../components/IndentityDocumentInput'
import { Checkbox } from '../../components/Input/Checkbox'
import { PLAN_ROUTE } from '../../constants'
import { UserInput } from '../../interfaces/user'
import { fetchUserData } from '../../services/person'
import { verifyPhone } from '../../utils/validations'
import { Layout } from '../layout'
import heroImage from './../../assets/hero.png'
import style from './index.module.scss'


export const HOME = (): JSX.Element => {
  localStorage.clear()
  const [documentType, setDocumentType] = useState('DNI')
  const [documentValue, setDocumentValue] = useState('')
  const [identityError, setIdentityError] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [validIdentity, setValidIdentity] = useState(false)
  const [validPhone, setValidPhone] = useState(false)
  const [isChecked, setIsChecked] = useState({ privacidad: false, comunicaciones: false })
  const navigate = useNavigate()


  const handleNumberInput = (value: string): void => {
    setPhoneNumber(value)
    if (value.length === 9) {
      setValidPhone(true)
    } else {
      setValidPhone(false)
    }
  }

  const handleChangeIdentity = (value: string): void => {
    setDocumentValue(value)
    if (
      (documentType === 'DNI' && value.length === 8) ||
      (documentType === 'CE' && value.length >= 8)
    ) {
      setValidIdentity(true)
    } else {
      setValidIdentity(false)
    }
  }


  const handleCheckPrivacidad = (): void => {
    setIsChecked({ ...isChecked, privacidad: !isChecked.privacidad })
  }
  const handleCheckComunicaciones = (): void => {
    setIsChecked({ ...isChecked, comunicaciones: !isChecked.comunicaciones })
  }

  const handleContinue = async (): Promise<void> => {
    if (!validIdentity) {
      setIdentityError(true)
    }
    if (!validPhone) {
      setPhoneError(true)
    }
    if (validIdentity && validPhone && isChecked.comunicaciones && isChecked.privacidad) {
      const data = await fetchUserData()
      localStorage.setItem('data-api', JSON.stringify(data))
      const user: UserInput = {
        documentType: documentType,
        documentNumber: documentValue,
        telephone: phoneNumber
      }
      localStorage.setItem('user', JSON.stringify(user))
      navigate(PLAN_ROUTE)
    }
  }

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.tittleContainer}>
          <Chip top='-1.8rem'>Seguro Salud Flexible</Chip>
          <h1 className={style.tittle}>Creado para ti y tu familia</h1>
        </div>
        <img className={style.image} src={heroImage} alt="imagen de familia" />
        <p className={style.paragraph}>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría, 100% online.</p>
        <div className={style.form}>
          <IdentityDocumentInput
            inputValue={documentValue}
            inputChange={handleChangeIdentity}
            showError={identityError}
            setShowError={setIdentityError}
            selectedValue={documentType}
            setSelectedValue={setDocumentType}
          />
          <CustomInput
            label='Celular'
            value={phoneNumber}
            maxLength={9}
            required
            showError={phoneError}
            setShowError={setPhoneError}
            type='number'
            validation={verifyPhone}
            messageError='*Tu número de celular es inválido'
            onChange={handleNumberInput}
          />
          <div className={style.politicas}>
            <Checkbox checked={isChecked.privacidad} onChange={handleCheckPrivacidad} />
            <p> Acepto la <a href=''>Política de privacidad</a></p>
            <Checkbox checked={isChecked.comunicaciones} onChange={handleCheckComunicaciones} />
            <p> Acepto la <a href=''>Política Comunicaciones Comerciales</a></p>
          </div>
          <ButtonComponent onClick={handleContinue}>Continuar</ButtonComponent>
        </div>

      </div>
    </Layout>
  )
}
