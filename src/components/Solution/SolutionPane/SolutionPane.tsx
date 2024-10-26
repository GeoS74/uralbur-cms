import styles from "./styles.module.css"
import ProgressOptionalHeader from "../SolutionOptionalHeader/SolutionOptionalHeader"

type Props = {
  solution: IInfoBlock[]
}

export default function SolutionPane({ solution }: Props) {
  return solution?.length ?

    <div className={styles.root}>
      {_makeList(solution)}
    </div> : <div>решения компании не добавлены</div>
}

function _makeList(solution: IInfoBlock[]) {
  return solution
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