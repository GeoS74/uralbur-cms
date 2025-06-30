import { useLoaderData } from "react-router-dom"
import { Converter } from "md-conv";
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../NoteOptionalHeader/NoteOptionalHeader";

const converter = new Converter();

export default function NotePage() {
  const s = useLoaderData() as INote;

  return <>
    <BackArrow path={"/note"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/note/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.title ? <div><h5>{s.title}</h5></div> : <></>}

        {s.message ? <div
          dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(s.message) }}
        ></div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}