import { ErrorMessage } from "../ErrorMessage/ErrorMessage"

type Props = {
  prefix: string,
  errorMessage?: IErrorMessage
}

export default function InputFile({ prefix, errorMessage }: Props) {
  return <>
    <div>
      <label htmlFor="formFile" className="form-label mt-4">Загрузка слайда</label>
      <input className="form-control" type="file" id="formFile" name={`${prefix}`} />
    </div>
    {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
  </>
}


