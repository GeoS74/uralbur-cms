import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

export default function OptionalHeader({ createdAt }: IPrice) {
  return <div className={styles.root}>
    <div>{createdAt ? <small>последнее обновление {date(createdAt)}</small> : <></>}</div>
    <div>
      <small></small>
    </div>
  </div>
}
