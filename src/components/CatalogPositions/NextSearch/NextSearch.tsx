import { useState } from "react"
import { useSelector } from "react-redux";

import tokenManager from "../../../libs/token.manager"
import serviceHost from "../../../libs/service.host"
import fetchWrapper from "../../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../../middleware/response.validator"
import classNames from "classnames";

type Props = {
  setSearchPositions: (pos: ICatalogPosition[]) => void
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
  showNextButton: boolean
  lastQuery: string,
  lastId: string
}

export default function NextSearch({ showNextButton, setSearchPositions, setShowNextButton, lastQuery, lastId }: Props) {
  const [disabled, setDisabled] = useState(false);
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  return <button
    hidden={!showNextButton}
    disabled={disabled}
    onClick={() => onSubmit(lastQuery, lastId, setDisabled, setSearchPositions, setShowNextButton)}
    className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4`)}
  >Загрузить ещё</button>
}

function onSubmit(
  lastQuery: string,
  lastId: string,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  setSearchPositions: (pos: ICatalogPosition[]) => void,
  setShowNextButton: React.Dispatch<React.SetStateAction<boolean>>
) {

  setDisabled(true);

  fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/position/public/${lastQuery}&last=${lastId}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        const res = await response.json()
        setSearchPositions(res)

        if (!res.length) {
          setShowNextButton(false)
        }
        return;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => console.log(error.message))
    .finally(() => setDisabled(false));

}
