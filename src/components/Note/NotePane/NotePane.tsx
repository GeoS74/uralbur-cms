import { Converter } from "md-conv";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import NoteOptionalHeader from "../NoteOptionalHeader/NoteOptionalHeader"

const converter = new Converter();

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

        {s.message ? <>
          <div
            dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(_cut(s.message, 250)) }}
          ></div>
          <div>{(s.message.length > 350) ? <Link to={`/note/page/${s.id}`} className="nav-link">Читать полностью...</Link> : <></>}
          </div>
        </> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}

function _cut(text: string, limit?: number) {
  return (limit && text.length > limit) ? text.substring(0, text.indexOf(".", limit) + 1) : text;
}