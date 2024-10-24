import { useNavigate } from "react-router-dom";

import { ReactComponent as IconEdit } from "./icons/wrench.svg";
import styles from "./styles.module.css"

export default function OptionalHeader({ alias }: ITempatePage) {
  const navigate = useNavigate();

  return <div className={styles.root}>
    <div></div>
    <div>
      <small></small>

      <IconEdit className={styles.svg}
        onClick={() => navigate(`/template/page/edit/${alias}`)}
      />
    </div>
  </div>
}

