import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import SlideOptionalHeader from "../SlideOptionalHeader/SlideOptionalHeader"

type Props = {
  slides: IMainSlide[]
}

export default function SearchPane({ slides }: Props) {
  return slides?.length ?

    <div className={styles.root}>
      {_makeList(slides)}
    </div> : <div>слайды не добавлены</div>
}

function _makeList(slides: IMainSlide[]) {
  return slides
    .map((s) => <div key={s.id} className="card mt-0">

      <SlideOptionalHeader {...s} />

      <div>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/slider/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.title ? <div><h5>{s.title}</h5></div> : <></>}

        {s.message ? <div>{s.message}</div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}