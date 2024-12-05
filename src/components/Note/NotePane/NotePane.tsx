import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import NoteOptionalHeader from "../NoteOptionalHeader/NoteOptionalHeader"

type Props = {
  notes: INote[]
}

export default function NotePane({ notes }: Props) {
  return notes?.length ?

    <div className={styles.root}>
      {_makeList(notes)}
    </div> : <div>статей нет</div>
}

function _makeList(notes: INote[]) {
  return notes
    .map((s) => <div key={s.id} className="card mt-0">

      <NoteOptionalHeader {...s} />

      <div>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/note/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.title ? <div><h5>{s.title}</h5></div> : <></>}

        {s.message ? <div><pre>{s.message}</pre></div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}