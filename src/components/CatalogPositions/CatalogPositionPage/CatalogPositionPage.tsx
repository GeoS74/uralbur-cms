import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../CatalogPositionOptionalHeader/CatalogPositionOptionalHeader";
import { ReactComponent as DefaultImg } from "../image/file-earmark-image.svg"

export default function CatalogPositionPage() {
  const s = useLoaderData() as ICatalogPosition;

  return <>
    <BackArrow path={"/catalog/positions"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader
        id={s.id}
        createdAt={s.createdAt}
        _updatePositions={() => true} // читай про эту функцию в readme к компоненте CatalogPosition
      />

      <div className={classNames(styles.nested)}>

      {s.level.title ? <div><i>раздел каталога: {s.level.title}</i></div> : <></>}

        {!s.files.image.fileName ?
          <DefaultImg width="50" height="50" />
          : <img src={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/images/${s.files.image.fileName}`} loading="lazy" />
        }


        {s.level.title ? <div>раздел каталога: {s.level.title}</div> : <></>}
        {s.title ? <div><h5>{s.title}</h5></div> : <></>}
        {s.article ? <div><h5>{s.article}</h5></div> : <></>}
        {s.description ? <div>описание:<pre>{s.description}</pre></div> : <></>}

         {/* <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>pdf</a> */}


        {/* <object data={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`} type="application/pdf" width="100%" height="200px">
          <p>Alternative text - include a link <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>to the PDF!</a></p>
        </object> */}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}