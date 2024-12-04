import styles from "./styles.module.css"
import TemplatePageOptionalHeader from "../TemplatePageOptionalHeader/TemplatePageOptionalHeader"

type Props = {
  templates: ITempatePage[]
}

export default function TemplatePagePane({ templates }: Props) {
  return <div className={styles.root}>
    {_makeList(templates)}
  </div>
}

function _makeList(templates: ITempatePage[]) {
  return templates
    .map((s, index) => <div key={index} className="card mt-0">

      <TemplatePageOptionalHeader {...s} />

      <div>
        <div><h5>{s.name}</h5></div>
        <div>файл: {s.tplFileName}</div>

        <div>Meta-тег title: {s.meta.title}</div>
        <div>Meta-тег description: {s.meta.description}</div>

        {
          ["index", "product-single"].indexOf(s.alias) === -1 ?
            <>
               <div>Заголовок: {s.title}</div>
               <div>Текст: {s.description}</div>
            </> : <></>
        }

      </div>

    </div>)
}