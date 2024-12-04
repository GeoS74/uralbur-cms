import classNames from "classnames"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  prefix: string,
  val?: string
  errorMessage?: IErrorMessage
  label?: string
}

export default function Title({ prefix, val, errorMessage, label }: Props) {
  return <>
    <div className={classNames(styles.root, "mt-4")}>
      <label htmlFor={`${prefix}Input`} className="form-label mt-1">{label || ""}</label>
      <input 
        type="text" 
        id={`${prefix}Input`}
        defaultValue={val}
        name={`${prefix}`}
        className="form-control" 
        placeholder={label || "Введите название организации"} />
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}