import { useLoaderData, useNavigate } from "react-router-dom";
import SlidePane from "../SlidePane/SlidePane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function ContactList() {
  // session.subscribe('MainSliderList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const slides = useLoaderData() as IMainSlide[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/mainpage/slider/create`)} >Добавить слайд</button>

    <SlidePane slides={slides} />
  </div>
}
