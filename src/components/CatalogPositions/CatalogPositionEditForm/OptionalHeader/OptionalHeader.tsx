import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

type props = {
  createdAt?: string
}

export default function OptionalHeader({ createdAt }: props) {
  return <div className={styles.root}>
    <div>{createdAt ? <small>добавлен {date(createdAt)}</small> : <></>}</div>
    <div>
      <small></small>
    </div>
  </div>
}
