import { useLoaderData, useNavigate } from "react-router-dom";
import CatalogPositionPane from "../CatalogPositionPane/CatalogPositionPane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function CatalogPositionList() {
  // session.subscribe('CatalogPositionList');
  const navigate = useNavigate();
  const theme = (useSelector((state) =>  state) as {theme: {theme: string}}).theme.theme

  const positions = useLoaderData() as ICatalogPosition[];

  return <div className={styles.root} >
    
    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
          onClick={() => navigate(`/catalog/positions/create`)} >Добавить позицию</button>

    <CatalogPositionPane positions={positions} />
  </div>
}
