import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../TestimonialOptionalHeader/TestimonialOptionalHeader";

export default function TestimonialPage() {
  const s = useLoaderData() as ITestimonial;

  return <>
    <BackArrow path={"/testimonial"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/testimonial/${s.photo.fileName}`} loading="lazy" />
        </div>

        {s.name ? <div><h5>{s.name}</h5></div> : <></>}

        {s.company ? <div><h5>{s.company}</h5></div> : <></>}

        {s.message ? <div>{s.message}</div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}