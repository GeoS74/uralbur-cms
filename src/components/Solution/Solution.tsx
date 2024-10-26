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
            <Outlet />
        </div>
    </>
}