import classNames from "classnames"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  prefix: string,
  val?: string
  errorMessage?: IErrorMessage
  label?: string
}

export default function TextArea({ prefix, val, errorMessage, label }: Props) {
  return <>
    <div className={classNames(styles.root, "mt-4")}>
      <label htmlFor={`${prefix}Input`} className="form-label mt-1">{label || ""}</label>
      <textarea className="form-control"
        id={`${prefix}TextArea`}
        name={`${prefix}`}
        defaultValue={val}
      ></textarea>
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}