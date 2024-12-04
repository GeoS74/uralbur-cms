import { useLoaderData, useNavigate } from "react-router-dom";
import TeamPane from "../TeamPane/TeamPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function TeamlList() {
  // session.subscribe('TeamlList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const team = useLoaderData() as ITeamUnit[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/team/create`)} >Добавить сотрудника</button>

    <TeamPane team={team} />
  </div>
}
