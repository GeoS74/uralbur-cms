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

        <div>Тег title: {s.title}</div>

        <div>Тег description:{s.description}</div>
      </div>

    </div>
  </>
}