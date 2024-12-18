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
import SelectPane from "./SelectPane/SelectPane";
import TextArea from "./TextArea/TextArea";


export default function SlideEditForm() {
  const [position, levels] = useLoaderData() as [ICatalogPosition | undefined, ICatalogLevel[]];

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
        position
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader createdAt={position?.createdAt} />

        <legend className="mt-3">{!position ? "Добавление новой позиции" : "Изменение позиции"}</legend>

        {/* <small className="text-danger">ВАЖНО: Размер изображения должен быть 1900х900 px</small> */}

        {position ?
          <div className="mt-2">
            <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/catalog/${position?.image?.fileName}`} loading="lazy" />
          </div>
          : <></>}

        <InputFile errorMessage={errorMessage} prefix="image" />

        <SelectPane
          errorMessage={errorMessage}
          levels={levels}
          val={position?.level.id}
          prefix="level"
          label="Раздел каталога" />

        <InputText errorMessage={errorMessage} val={position?.title} prefix="title" label="Наименование" />

        <InputText errorMessage={errorMessage} val={position?.article} prefix="article" label="Артикл" />

        <TextArea errorMessage={errorMessage} val={position?.description} prefix="description" label="Описание" />

        <CheckBox val={position?.isPublic === undefined ? true : position.isPublic} prefix="isPublic" label="Отображается" />

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
  position?: ICatalogPosition
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  if ((fd.get('image') as File).size == 0) {
    fd.delete('image')
  }

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/position/${position?.id || ''}`, {
    method: position ? 'PATCH' : 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/catalog/positions/page/${res.id}`)
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
      return { field: "title", message: "Название не может быть пустым" }
    case `invalid level id of catalog position`:
      return { field: "level", message: "Не выбран раздел каталога" }
    case `bad image mime type`:
      return { field: "image", message: "Файл должен быть картинкой" }
    case `field name "image" is empty`:
      return { field: "image", message: "изображение не загружено" }
    default: return { field: "image", message: error }
  }
}