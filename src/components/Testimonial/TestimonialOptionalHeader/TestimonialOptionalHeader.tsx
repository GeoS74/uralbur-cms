import { useNavigate } from "react-router-dom";
import tokenManager from "../../../libs/token.manager"
import fetchWrapper from "../../../libs/fetch.wrapper";
import serviceHost from "../../../libs/service.host";
import { responseNotIsArray } from "../../../middleware/response.validator";
import { date } from "../../../libs/formatter";

import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import { ReactComponent as IconDelete } from "./icons/trash.svg";
import styles from "./styles.module.css"

export default function OptionalHeader({ id, createdAt }: ITestimonial) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div><small>добавлен {date(createdAt)}</small></div>
    <div>
      <small></small>

      <IconEdit className={styles.svg}
        onClick={() => navigate(`/testimonial/edit/${id}`)}
      />

      <IconDelete className={styles.svg}
        onClick={async () => {
          // ninja code ;)
          await _delete(id) ? navigate(`/testimonial`) : null;
        }} />
    </div>
  </div>
}

async function _delete(id: string) {
  if (!confirm('Удалить запись?')) {
    return false;
  }

  return fetchWrapper(() => fetch(`${serviceHost('mcontent')}/api/mcontent/testimonial/${id}`, {
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
