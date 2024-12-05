import { useLoaderData, useNavigate } from "react-router-dom";
import NotePane from "../NotePane/NotePane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function NoteList() {
  // session.subscribe('NoteList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const notes = useLoaderData() as INote[]

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/note/create`)} >Добавить статью</button>

    <NotePane notes={notes} />
  </div>
}
