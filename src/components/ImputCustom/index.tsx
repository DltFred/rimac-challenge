import style from './index.module.scss'

/* eslint-disable */
export const CustomInput = ({
  typeInput,
  maxLength,
  minLength,
  label,
  value,
  onChange,
  messageError,
  onBlur,
  required,
  validation,
  type = null,
  showError,
  setShowError,
  disabled,
  onFocus,
  name,
  inputSelect,
  ...props
}: any): JSX.Element => {

  const handleOnBlur = (): void => {
    if (typeof onBlur === 'function') {
      onBlur()
    }
    if (validation && setShowError) {
      setShowError(!validation(value))
    }
  }

  return (
    <div>
      <div className={style.inputField} {...props}>
        <p className={style.labelInput}>
          {label}
        </p>
        <input
          autoComplete="false"
          type="text"
          name={name}
          disabled={disabled}
          id={name}
          value={value || ''}
          minLength={minLength}
          maxLength={maxLength}
          onBlur={handleOnBlur}
          onFocus={() => {
            if (onFocus) {
              onFocus()
            }
          }}
          className={`${showError ? style.inputError : ''} ${inputSelect ? style.inputSelect : ''}`}
          onChange={(event) => {
            if (!onChange) return
            let value = event.target.value

            if (type === "number") {
              value = value.replace(/\D/, "")
            }

            if (typeInput === "CE") {
              value = value.replace(/[^a-z0-9-]/gi, "")
            }
            if (type === "onlyText") {
              value = value.replace(/[0-9]/g, "")
            }
            onChange(value.replace(/  +/g, ' '))
          }}
        />
      </div>

      {required && showError && (
        <span className={style.showError}>{messageError || "*Error"}</span>
      )}
    </div>
  )
}