import classNames from "classnames"
import styles from "./styles.module.css"

type Props = {
  prefix: string,
  val?: boolean
  label?: string
}

export default function CheckBox({ prefix, val, label }: Props) {
  return <>
    <div className={classNames(styles.root, "form-check mt-4")}>
      <input className="form-check-input" type="checkbox" id={`${prefix}flexCheck`} name={`${prefix}`} defaultChecked={!!val} />
      <label className="form-check-label" htmlFor={`${prefix}flexCheck`}>
        {label || ""}
      </label>
    </div>
  </>
}








