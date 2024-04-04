import style from './index.module.scss'

type props = {
  checked: boolean,
  onChange: () => void
}
export const Checkbox = ({ checked, onChange }: props): JSX.Element => {
  return (
    <label className={style.containerCheckbox} onChange={onChange}>
      <input type="checkbox" checked={checked} readOnly />
      <span className={style.checkmark}></span>
    </label>
  )
}
