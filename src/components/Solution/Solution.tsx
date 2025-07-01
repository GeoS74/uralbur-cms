import { Outlet } from "react-router-dom";
import session from "../../libs/token.manager";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

export default function Solution() {
    session.subscribe('Solution');
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>Решения</h1>
            <hr />
            <i><small>Подсказка: в шаблоне должно быть минимум 4 элемента</small></i>
            <Outlet />
        </div>
    </>
}