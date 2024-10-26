import { useLoaderData, useNavigate } from "react-router-dom";
import SolutionPane from "../SolutionPane/SolutionPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function SolutionList() {
  // session.subscribe('MainSliderList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const solution = useLoaderData() as IInfoBlock[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/solutions/create`)} >Добавить решение</button>

    <SolutionPane solution={solution} />
  </div>
}
