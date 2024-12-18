import { Outlet } from "react-router-dom";
import session from "../../libs/token.manager";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

export default function Progress() {
    session.subscribe('Progress');
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>Достижения</h1>
            <hr />
            <i><small>Подсказка: в шаблоне должно отображаться 4 элемента</small></i>
            <Outlet />
        </div>
    </>
}