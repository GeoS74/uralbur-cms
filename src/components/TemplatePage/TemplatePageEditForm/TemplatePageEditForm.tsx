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


export default function EditForm() {
  const template = useLoaderData() as ITempatePage;

  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()

  return <>
    <BackArrow />
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        navigate,
        template
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader />

        <legend className="mt-3">Редактирование шаблона &quot;{template.name}&quot;</legend>

        <InputText val={template?.meta?.title} prefix="meta[title]" label="Meta-тег title" />
        <InputText val={template?.meta?.description} prefix="meta[description]" label="Meta-тег description" />

        {
          ["index", "product-single", "simple-article"].indexOf(template.alias) === -1 ?
            <>
              <InputText val={template?.title} prefix="title" label="Заголовок" />
              <InputText val={template?.description} prefix="description" label="Текст" />
            </> : <></>
        }

        <SubmitButton />

        <CancelButton />
      </fieldset>
    </form>
  </>
}

function _onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  template: ITempatePage
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/template/pages/${template.alias}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json();
        return navigate(`/template/page/${res.alias}`)
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}