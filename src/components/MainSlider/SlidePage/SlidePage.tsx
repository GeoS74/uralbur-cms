import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../BackArrow/BackArrow";
import OptionalHeader from "../SlideOptionalHeader/SlideOptionalHeader";

export default function ContactPage() {
  const s = useLoaderData() as IMainSlide;

  return <>
    <BackArrow path={"/mainpage/slider"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/slider/${s.image.fileName}`} loading="lazy" />
        </div>

        {s.title ? <div><h5>{s.title}</h5></div> : <></>}

        {s.message ? <div>{s.message}</div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}