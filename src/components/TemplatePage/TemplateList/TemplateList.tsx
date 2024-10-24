import { useLoaderData } from "react-router-dom";
import TemplatePagePane from "../TemplatePagePane/TemplatePagePane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function TemplateList() {
  // session.subscribe('MainSliderList');
  const templates = useLoaderData() as ITempatePage[]

  return <div className={styles.root} >

    <TemplatePagePane templates={templates} />
  </div>
}
