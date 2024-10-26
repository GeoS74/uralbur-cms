import { useLoaderData, useNavigate } from "react-router-dom";
import ProgressPane from "../ProgressPane/ProgressPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function ProgressList() {
  // session.subscribe('MainSliderList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const progress = useLoaderData() as IInfoBlock[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/progress/create`)} >Добавить достижение</button>

    <ProgressPane progress={progress} />
  </div>
}
