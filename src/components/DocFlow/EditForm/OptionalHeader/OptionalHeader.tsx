import styles from "./styles.module.css"

type Props = {
  directing: ISimpleRow
  task?: ISimpleRow
  num?: number
  createdAt?: string
}

export default function OptionalHeader({ directing, task, num, createdAt }: Props) {
  return <div className={styles.root}>
    <div>{num ? <small> № {num || 'б/н'} от {_makeDate(createdAt)}</small> : <></>}</div>
    <div>
      <small>{directing.title} / {task?.title}</small>
    </div>
  </div>
}

function _makeDate(date?: string) {
  const d = new Date(date || "");
  const day = `0${d.getDate()}`.slice(-2);
  const month = `0${d.getMonth() + 1}`.slice(-2);
  return `${day}.${month}.${d.getFullYear()}`
}