import { useState } from "react";
import { useNavigate, NavigateFunction, useLoaderData } from "react-router-dom";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"

import styles from "./styles.module.css"
import CancelButton from "./CancelButton/CancelButton";
import SubmitButton from "./SubmitButton/SubmitButton";
import OptionalHeader from "./OptionalHeader/OptionalHeader";
import InputText from "./InputText/InputText";
import BackArrow from "../../BackArrow/BackArrow";
import CheckBox from "./CheckBox/CheckBox";


export default function ProgressEditForm() {
  const progress = useLoaderData() as IInfoBlock;

  const [disabled, setDisabled] = useState(false)
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate()

  return <>
    <BackArrow />
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        setErrorResponse,
        navigate,
        progress
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader {...progress} />

        <legend className="mt-3">{!progress ? "Добавление нового достижения" : "Изменение достижения"}</legend>



        <InputText errorMessage={errorMessage} val={progress?.title} prefix="title" label="Заголовок" />

        <InputText errorMessage={errorMessage} val={progress?.message} prefix="message" label="Текст" />

        <InputText errorMessage={errorMessage} val={progress?.cssClass} prefix="cssClass" label="css класс" />
        <small className="text-danger">ВАЖНО: для выбора css класса воспользуйтесь
          <a href="/ionicons/cheatsheet.html" target="blank">этой библиотекой</a>
        </small>

        <CheckBox val={progress?.isPublic} prefix="isPublic" label="Отображается" />

        <SubmitButton />

        <CancelButton />
      </fieldset>
    </form>
  </>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorResponse: React.Dispatch<React.SetStateAction<IErrorMessage | undefined>>,
  navigate: NavigateFunction,
  progress?: IInfoBlock
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/progress/${progress?.id || ''}`, {
    method: progress ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/progress/page/${res.id}`)
      }
      else if (response.status === 400) {
        const res = await response.json()
        setErrorResponse(_getErrorResponse(res.error))
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}

function _getErrorResponse(error: string): IErrorMessage {
  switch (error) {
    case `title is empty`:
      return { field: "title", message: "Заголовок не должен быть пустым" }
    default: return { field: "title", message: error }
  }
}