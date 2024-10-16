import { Link } from "react-router-dom"
import styles from "./styles.module.css"


export default function Main() {
  return <div className={styles.root}>
    <div>
      <h5>Быстрый доступ:</h5>
      <ul>
        <li><Link to="/user">Личный кабинет</Link></li>
      </ul>
    </div>
    <div>
    </div>
  </div>
}