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
import TextArea from "./TextArea/TextArea";


export default function NoteEditForm() {
  const note = useLoaderData() as INote;

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
        note
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader {...note} />

        <legend className="mt-3">{!note ? "Добавление новой статьи" : "Изменение статьи"}</legend>

        <small className="text-danger">ВАЖНО: Размер изображения должен быть 1900х900 px</small>

        {note ?
          <div className="mt-2">
            <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/note/${note?.image?.fileName}`} loading="lazy" />
          </div>
          : <></>}

        <InputFile errorMessage={errorMessage} prefix="image"/>

        <InputText errorMessage={errorMessage} val={note?.title} prefix="title" label="Заголовок" />

        <TextArea errorMessage={errorMessage} val={note?.message} prefix="message" label="Текст" />

        <CheckBox val={note?.isPublic} prefix="isPublic" label="Отображается" />

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
  note?: INote
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  if((fd.get('image') as File).size == 0) {
    fd.delete('image')
  }

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/note/${note?.id || ''}`, {
    method: note ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/note/page/${res.id}`)
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
    case `field name "image" is empty`:
      return { field: "image", message: "Изображение не загаружено" }
    case `bad image mime type`:
      return { field: "image", message: "Файл должен быть картинкой" }
    default: return { field: "image", message: error }
  }
}