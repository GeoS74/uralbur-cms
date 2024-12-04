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
import InputFile from "./InputFile/InputFile";
import CheckBox from "./CheckBox/CheckBox";


export default function TeamEditForm() {
  const teamUnit = useLoaderData() as ITeamUnit;

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
        teamUnit
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader {...teamUnit} />

        <legend className="mt-3">{!teamUnit ? "Добавление нового сотрудника" : "Изменение данных"}</legend>

        <small>ВАЖНО: Рекомендуемый размер 700х700 px</small>

        {teamUnit ?
          <div className="mt-2">
            <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/team/${teamUnit?.photo?.fileName}`} loading="lazy" />
          </div>
          : <></>}

        <InputFile errorMessage={errorMessage} prefix="photo" />

        <InputText errorMessage={errorMessage} val={teamUnit?.name} prefix="name" label="Имя" />

        <InputText errorMessage={errorMessage} val={teamUnit?.position} prefix="position" label="Должность" />

        <CheckBox val={teamUnit?.isPublic} prefix="isPublic" label="Отображается" />

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
  teamUnit?: ITeamUnit
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  if ((fd.get('photo') as File).size == 0) {
    fd.delete('photo')
  }

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/team/${teamUnit?.id || ''}`, {
    method: teamUnit ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/team/page/${res.id}`)
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
    case `field name "photo" is empty`:
      return { field: "photo", message: "Изображение не загружено" }
    case `bad photo mime type`:
      return { field: "photo", message: "Файл должен быть картинкой" }
    case `name is required`:
      return { field: "name", message: "Имя обязательно к заполнению" }
    default: return { field: "photo", message: error }
  }
}