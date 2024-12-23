import { useNavigate } from "react-router-dom";
import tokenManager from "../../../libs/token.manager"
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import { responseNotIsArray } from "../../../middleware/response.validator";
import { date } from "../../../libs/formatter";

import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import { ReactComponent as IconDelete } from "./icons/trash.svg";
import styles from "./styles.module.css";

type Props = {
  id: string
  createdAt: string
  _updatePositions: () => boolean // читай про эту функцию в readme к компоненте CatalogPosition
}

export default function OptionalHeader({ id, createdAt, _updatePositions }: Props) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div><small>добавлен {date(createdAt)}</small></div>
    <div>
      <small></small>

      <IconEdit className={styles.svg}
        onClick={() => navigate(`/catalog/positions/edit/${id}`)}
      />
      <IconDelete className={styles.svg}

       // ninja code ;)
        onClick={async () => _deletePosition(id)
          .then(res => {
            if (res) {
              _updatePositions() ? navigate(`/catalog/positions`) : null;
            }
          })} />
    </div>
  </div>
}

async function _deletePosition(id: string): Promise<boolean> {
  if (!confirm('Удалить позицию?')) {
    return false;
  }

  return fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/position/${id}`, {
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
