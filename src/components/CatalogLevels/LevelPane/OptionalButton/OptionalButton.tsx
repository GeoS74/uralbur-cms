import { useNavigate } from "react-router-dom";
import tokenManager from "../../../../libs/token.manager"
import fetchWrapper from "../../../../libs/fetch.wrapper";
import serviceHost from "../../../../libs/service.host";
import { responseNotIsArray } from "../../../../middleware/response.validator";
import { ReactComponent as IconEdit } from "../icons/wrench.svg";
import { ReactComponent as IconDelete } from "../icons/trash.svg";
import styles from "./styles.module.css";

export default function OptionalButton({ id }: ICatalogLevel) {
  const navigate = useNavigate();

  return <span className={styles.root}>
    <IconEdit className={styles.svg}
      onClick={() => navigate(`/catalog/levels/edit/${id}`)}
    />

    <IconDelete className={styles.svg}
      onClick={async () => {
        // ninja code ;)
        await _deleteLevel(id) ? navigate(`/catalog/levels`) : null;
      }} />
  </span>
}

async function _deleteLevel(id: string) {
  if (!confirm('Удалить уровень?')) {
    return false;
  }

  return fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/catalog/level/${id}`, {
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
      if (response.status === 400) {
        alert('Отклонено, уровень имеет связанные позиции.');
        return false;
      }
      throw new Error(`response status: ${response.status}`)
    })
    .catch(error => {
      console.log(error.message);
      return false;
    })
}