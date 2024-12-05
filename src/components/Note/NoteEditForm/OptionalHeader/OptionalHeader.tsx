import { date } from "../../../../libs/formatter";
import styles from "./styles.module.css";

export default function OptionalHeader({ createdAt }: IMainSlide) {
  return <div className={styles.root}>
    <div>{createdAt ? <small>добавлен {date(createdAt)}</small> : <></>}</div>
    <div>
      <small></small>
    </div>
  </div>
}
