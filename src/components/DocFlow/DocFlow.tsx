import { Outlet } from "react-router-dom";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

export default function DocFlow() {
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>С.Э.Д.</h1>
            <hr />
            <Outlet />
        </div>
    </>
}