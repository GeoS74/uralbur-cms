import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../CatalogPositionOptionalHeader/CatalogPositionOptionalHeader";

export default function CatalogPositionPage() {
  const s = useLoaderData() as ICatalogPosition;

  return <>
    <BackArrow path={"/catalog/positions"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/catalog/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.level.title ? <div>раздел каталога: {s.level.title}</div> : <></>}
        {s.title ? <div><h5>{s.title}</h5></div> : <></>}
        {s.article ? <div><h5>{s.article}</h5></div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}