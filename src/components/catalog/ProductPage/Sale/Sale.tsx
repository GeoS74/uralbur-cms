import {ReactComponent as Handbag} from "./icons/handbag.svg";
import classNames from "classnames";
import styles from "./styles.module.css";

export default function Sale() {
  return <div className={classNames(styles.root)}>
  <hr/>
  <h6 className="mb-4"><Handbag className={styles.svg} />Как сделать заказ</h6>
  <p>Для оформления заказа Вы можете:</p>

  <ul>
    <li>связаться с менеджером по тел: <b>+7 (351) 777-17-72</b></li>
    <li>отправить заявку на email: <b>info@sgn74.ru</b></li>
  </ul>
</div>
}