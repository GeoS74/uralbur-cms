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

        <div>Тег title: {s.title}</div>

         
        <div>Тег description:{s.description}</div>
      </div>

    </div>)
}