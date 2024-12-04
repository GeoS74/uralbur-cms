import { useLoaderData } from "react-router-dom"
import serviceHost from "../../../libs/service.host"
import classNames from "classnames";
import styles from "./styles.module.css"
import BackArrow from "../../BackArrow/BackArrow";
import OptionalHeader from "../TeamOptionalHeader/TeamOptionalHeader";

export default function TeamPage() {
  const s = useLoaderData() as ITeamUnit;

  return <>
    <BackArrow path={"/team"} />
    <div className={classNames(styles.root, "card")}>
      <OptionalHeader {...s} />

      <div className={classNames(styles.nested)}>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/team/${s.photo.fileName}`} loading="lazy" />
        </div>

        {s.name ? <div><h5>{s.name}</h5></div> : <></>}

        {s.position ? <div>{s.position}</div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>
  </>
}