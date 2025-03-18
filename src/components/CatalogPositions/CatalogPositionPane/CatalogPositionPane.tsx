import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import CatalogPositionOptionalHeader from "../CatalogPositionOptionalHeader/CatalogPositionOptionalHeader"
import { ReactComponent as DefaultImg } from "../image/file-earmark-image.svg"
import { useNavigate, NavigateFunction } from "react-router-dom"

type Props = {
  setSearchPositions: React.Dispatch<React.SetStateAction<ICatalogPosition[]>>
  positions: ICatalogPosition[]
}

export default function CatalogPositionPane({ positions, setSearchPositions }: Props) {
  const navigate = useNavigate()
  return positions?.length ?

    <div className={styles.root}>
      {_makeList(positions, setSearchPositions, navigate)}
    </div> : <div>позиции отсутствуют</div>
}

function _makeList(
  positions: ICatalogPosition[],
  setSearchPositions: React.Dispatch<React.SetStateAction<ICatalogPosition[]>>,
  navigate: NavigateFunction
) {
  return positions
    .map((s, index) => <div key={s.id} className="card mt-0">

      <CatalogPositionOptionalHeader
        id={s.id}
        createdAt={s.createdAt}

        _updatePositions={() => { // читай про эту функцию в readme к компоненте CatalogPosition
          positions.splice(index, 1);
          setSearchPositions([...positions]); // обязательно прокидывать изменение массива так, а не ссылкой на старый массив
          return false; // возврат false проигнорирует вызов navigate(...)
        }}
      />

      <div onClick={() => navigate(`/catalog/positions/page/${s.id}`)}>
        {s.level.title ? <div><i>раздел каталога: {s.level.title}</i></div> : <></>}

        <div>
          {!s.files.image.fileName ?
            <DefaultImg width="50" height="50" />
            : <img src={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/images/${s.files.image.fileName}`} loading="lazy" />
          }
        </div>

         

        {s.title ? <div><h5>{s.title}</h5></div> : <></>}
        {s.article ? <div><h5>{s.article}</h5></div> : <></>}
        {s.description ? <div>описание:<pre>{s.description}</pre></div> : <></>}




        {/* <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>pdf</a> */}


        {/* <object data={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`} type="application/pdf" width="100%" height="200px">
          <p>Alternative text - include a link <a href={`${serviceHost('mcontent')}/api/mcontent/static/catalog/position/pdf/${s.files.pdf.fileName}`}>to the PDF!</a></p>
        </object> */}


        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}