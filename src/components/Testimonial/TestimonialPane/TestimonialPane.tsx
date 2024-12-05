import styles from "./styles.module.css"
import serviceHost from "../../../libs/service.host"
import OptionalHeader from "../TestimonialOptionalHeader/TestimonialOptionalHeader"

type Props = {
  testimonials: ITestimonial[]
}

export default function TestimonialPane({ testimonials }: Props) {
  return testimonials?.length ?

    <div className={styles.root}>
      {_makeList(testimonials)}
    </div> : <div>отзывы не добавлены</div>
}

function _makeList(testimonials: ITestimonial[]) {
  return testimonials
    .map((s, index) => <div key={index} className="card mt-0">

      <OptionalHeader {...s} />

      <div>
        <div>
          <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/testimonial/${s.photo.fileName}`} loading="lazy" />
        </div>

        {s.name ? <div><h5>{s.name}</h5></div> : <></>}

        {s.company ? <div><h5>{s.company}</h5></div> : <></>}

        {s.message ? <div><pre>{s.message}</pre></div> : <></>}

        <div>Отображается на странице: {s.isPublic ? "да" : "нет"}</div>
      </div>

    </div>)
}