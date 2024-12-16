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
import SelectPane from "./SelectPane/SelectPane";

export default function LevelEditForm() {
  const [currentLevel, levels] = useLoaderData() as [ICatalogLevel, ICatalogLevel[]];

  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorResponse] = useState<IErrorMessage>();

  const navigate = useNavigate();

  return <>
    <BackArrow />
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        setErrorResponse,
        navigate,
        currentLevel
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader {...currentLevel} />

        <legend className="mt-3">{!currentLevel ? "Добавление нового уровня" : "Изменение уровня"}</legend>

        <InputText errorMessage={errorMessage} val={currentLevel?.title} prefix="title" label="Заголовок" />

        <SelectPane errorMessage={errorMessage}
          levels={levels}
          val={currentLevel?.parent}
          prefix="parent"
          label="Верхний уровень" />

        <div></div>
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
  level?: ICatalogLevel
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/level/${level?.id || ''}`, {
    method: level ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return navigate(`/catalog/levels`)
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
      return { field: "title", message: "Название уровня не может быть пустым" }
    default: return { field: "title", message: error }
  }
}