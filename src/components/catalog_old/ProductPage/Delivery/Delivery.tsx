import {ReactComponent as Truck} from "./icons/truck.svg";
import classNames from "classnames";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export default function Delivery() {
  return <div className={classNames(styles.root)}>
  <h6 className="mb-4"><Truck className={styles.svg} />Доставка</h6>
  <p>Доставка товара осуществляется во все регионы Российской Федерации транспортными компаниями:</p>
  <ul>
    <li>ТК Деловые Линии</li>
    <li>ТК КИТ</li>
    <li>ТК Байкал Сервис</li>
    <li>ТК Луч</li>
  </ul>
  <noindex><p className="mb-4"><small>Ознакомьтесь подробнее с <Link to="/about/delivery">условиями доставки</Link></small></p></noindex>
</div>
}