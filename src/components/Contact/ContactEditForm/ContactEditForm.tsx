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
  const contact = useLoaderData() as IContact;

  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()

  return <>
    <BackArrow />
    <form className={styles.root}
      onSubmit={event => _onSubmit(
        event,
        setDisabled,
        navigate,
        contact
      )}
    >
      <fieldset disabled={disabled} className="form-group">

        <OptionalHeader />

        <legend className="mt-3">Редактирование контактов</legend>

        <InputText val={contact.value} prefix="value" label={contact.title} />

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
  contact: IContact
) {

  event.preventDefault();
  setDisabled(true);

  const fd = new FormData(event.currentTarget);

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/contact/${contact.alias}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        await response.json();
        return navigate(`/contact`)
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));
}