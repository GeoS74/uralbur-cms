import { useLoaderData, useNavigate } from "react-router-dom";
import LevelPane from "../LevelPane/LevelPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function LevelList() {
  // session.subscribe('LevelList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const levels = useLoaderData() as ICatalogLevel[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/catalog/levels/create`)} >Добавить уровень</button>

    <LevelPane levels={levels} />
  </div>
}
