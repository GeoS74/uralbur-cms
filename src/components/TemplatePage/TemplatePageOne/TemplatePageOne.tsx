import { useLoaderData } from "react-router-dom"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../TemplatePageOptionalHeader/TemplatePageOptionalHeader";

export default function ContactPage() {
  const s = useLoaderData() as ITempatePage;

  return <>
    <BackArrow path={"/template"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>

        <div><h5>{s.name}</h5></div>
        <div>файл: {s.tplFileName}</div>

        <div>Мета-тег title: {s.meta.title}</div>
        <div>Мета-тег description: {s.meta.description}</div>

        {
          ["index", "product-single"].indexOf(s.alias) === -1 ?
            <>
               <div>Заголовок: {s.title}</div>
               <div>Текст: {s.description}</div>
            </> : <></>
        }
      </div>

    </div>
  </>
}