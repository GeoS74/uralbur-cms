import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import OptionalHeader from "../TeamOptionalHeader/TeamOptionalHeader"

type Props = {
  team: ITeamUnit[]
}

export default function TestimonialPane({ team }: Props) {
  return team?.length ?

    <div className={styles.root}>
      {_makeList(team)}
    </div> : <div>сотрудники не добавлены</div>
}

function _makeList(testimonials: ITeamUnit[]) {
  return testimonials
    .map((s, index) => <div key={index} className="card mt-0">

      <OptionalHeader {...s} />

      <div>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/team/${s.photo.fileName}`} loading="lazy" />
        </div>

        {s.name ? <div><h5>{s.name}</h5></div> : <></>}

        {s.position ? <div>{s.position}</div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}