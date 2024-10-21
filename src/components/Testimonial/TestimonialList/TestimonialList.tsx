import { useLoaderData, useNavigate } from "react-router-dom";
import TestimonialPane from "../TestimonialPane/TestimonialPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function TestimonialList() {
  // session.subscribe('TestimonialList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const testimonials = useLoaderData() as ITestimonial[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/testimonial/create`)} >Добавить отзыв</button>

    <TestimonialPane testimonials={testimonials} />
  </div>
}
