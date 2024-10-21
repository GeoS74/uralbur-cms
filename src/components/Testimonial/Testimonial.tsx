import { Outlet } from "react-router-dom";
import session from "../../libs/token.manager";

import Navigate from "../navigate/Navigate";
import styles from "./styles.module.css"

export default function Testimonial() {
    session.subscribe('Testimonial');
    return <>
        <Navigate />
        <div className={styles.root} >
            <h1>Отзывы</h1>
            <hr />
            <Outlet />
        </div>
    </>
}