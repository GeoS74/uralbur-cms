import styles from "./styles.module.css"
import ProgressOptionalHeader from "../ProgressOptionalHeader/ProgressOptionalHeader"

type Props = {
  progress: IInfoBlock[]
}

export default function ProgressPane({ progress }: Props) {
  return progress?.length ?

    <div className={styles.root}>
      {_makeList(progress)}
    </div> : <div>достижения не добавлены</div>
}

function _makeList(progress: IInfoBlock[]) {
  return progress
    .map((s) => <div key={s.id} className="card mt-0">

      <ProgressOptionalHeader {...s} />

      <div>
        <div><h5>{s.title}</h5></div>

        {s.message ? <div>{s.message}</div> : <></>}

        <div>css class: {s.cssClass || 'css класс не указан'}</div>

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}