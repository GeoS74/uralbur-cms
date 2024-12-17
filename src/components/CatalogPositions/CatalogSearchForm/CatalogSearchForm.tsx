import { useState } from "react"
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import SelectPane from "./SelectPane/SelectPane";
import styles from "./styles.module.css"
import classNames from "classnames";

type Props = {
  setSearchPositions: React.Dispatch<React.SetStateAction<ICatalogPosition[]>>
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
  setLastQuery: React.Dispatch<React.SetStateAction<string>>
  levels: ICatalogLevel[]
  limit: number
}

export default function SearchForm({ setSearchPositions, setShowNextButton, setLastQuery, levels, limit }: Props) {
  const [disabled, setDisabled] = useState(false);
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  return <form id="searchForm" className={classNames(styles.root, "mt-4")}
    onSubmit={(event) => {
      onSubmit(event, setDisabled, setSearchPositions, setShowNextButton, setLastQuery, limit)
    }}>

    <fieldset disabled={disabled}>
      <input type="search" name="search" className="form-control" placeholder="Введите название документа" />
      <SelectPane 
        prefix="level"
        levels={levels}
      />
      <input type="submit" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'}`)} value="Поиск" />  
    </fieldset>
  </form>
}



async function onSubmit(
  event: React.FormEvent<HTMLFormElement>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchPositions: React.Dispatch<React.SetStateAction<ICatalogPosition[]>>,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>,
  setLastQuery: React.Dispatch<React.SetStateAction<string>>,
  limit: number
) {

  event.preventDefault()

  const fd = new FormData(event.target as HTMLFormElement)

  setDisabled(true)

  const query = `?search=${fd.get('search')}&limit=${limit}&level=${fd.get('level')}`
  setLastQuery(query);
  
  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/position/public/${query}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      setShowNextButton(true)
      if (response.ok) {
        const res = await response.json()
        setSearchPositions(res)

        setShowNextButton(!!res.length)

        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}