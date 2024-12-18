import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import CatalogPositionOptionalHeader from "../CatalogPositionOptionalHeader/CatalogPositionOptionalHeader"

type Props = {
  positions: ICatalogPosition[]
}

export default function CatalogPositionPane({ positions }: Props) {
  return positions?.length ?

    <div className={styles.root}>
      {_makeList(positions)}
    </div> : <div>позиции отсутствуют</div>
}

function _makeList(positions: ICatalogPosition[]) {
  return positions
    .map((s) => <div key={s.id} className="card mt-0">

      <CatalogPositionOptionalHeader {...s} />

      <div>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/catalog/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.level.title ? <div>раздел каталога: {s.level.title}</div> : <></>}
        {s.title ? <div><h5>{s.title}</h5></div> : <></>}
        {s.article ? <div><h5>{s.article}</h5></div> : <></>}
        {s.description ? <div>описание:<pre>{s.description}</pre></div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}