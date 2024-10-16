import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import styles from "./styles.module.css"

type Props = {
  title: string | undefined
  errorMessage: IErrorMessage | undefined
}

export default function TitleDoc({ title, errorMessage }: Props) {
  return <>
    <div className={styles.root}>
      <label htmlFor="titleInput" className="form-label mt-1">Название документа</label>
      <input 
        type="text" 
        id="titleInput" 
        defaultValue={title}
        name="title" 
        className="form-control" 
        placeholder="Введите название документа" />
    </div>
    {errorMessage?.field === "title" ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}