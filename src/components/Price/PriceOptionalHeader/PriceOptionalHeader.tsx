import { useNavigate } from "react-router-dom";
import tokenManager from "../../../libs/token.manager"
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import { responseNotIsArray } from "../../../middleware/response.validator";
import { date } from "../../../libs/formatter";

import { ReactComponent as IconDelete } from "./icons/trash.svg";
import styles from "./styles.module.css"

type Props = {
  price?: IPrice
}

export default function OptionalHeader({ price }: Props) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div>{price ? <small>обновлён {date(price.createdAt)}</small> : <></>}</div>
    <div>
      <small></small>

      {price ? <>
        <IconDelete className={styles.svg}
          onClick={async () => {
            // ninja code ;)
            await _deletePrice() ? navigate(`/price`) : null;
          }} />
      </>
        : <></>}
    </div>
  </div>
}

async function _deletePrice() {
  if (!confirm('Удалить прайс?')) {
    return false;
  }

  return fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/price`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  }))
    .then(responseNotIsArray)
    .then(async response => {
      if (response.ok) {
        return true;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      return false;
    })
}
