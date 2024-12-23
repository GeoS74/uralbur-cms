import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import CatalogPositionPane from "../CatalogPositionPane/CatalogPositionPane";
// import session from "../../../libs/token.manager";
import { useSelector } from "react-redux";
import CatalogSearchForm from "../CatalogSearchForm/CatalogSearchForm";
import NextSearch from "../NextSearch/NextSearch";
import styles from "./styles.module.css";
import classNames from "classnames";

export default function CatalogPositionList() {
  // session.subscribe('CatalogPositionList');
  const navigate = useNavigate();
  const theme = (useSelector((state) => state) as { theme: { theme: string } }).theme.theme;

  const [positions, levels] = useLoaderData() as [ICatalogPosition[], ICatalogLevel[]];

  const [searchPositions, setSearchPositions] = useState<ICatalogPosition[]>(positions);

  const [showNextButton, setShowNextButton] = useState(!!searchPositions.length);
  const [lastQuery, setLastQuery] = useState("");

  return <div className={styles.root} >

    <CatalogSearchForm
      limit={25}
      levels={levels}
      setSearchPositions={setSearchPositions}
      setShowNextButton={setShowNextButton}
      setLastQuery={setLastQuery}
    />

    <button type="button" className={classNames(`btn btn-outline-${theme === 'light' ? 'primary' : 'light'} mt-4 mb-4`)}
      onClick={() => navigate(`/catalog/positions/create`)} >Добавить позицию</button>

    <CatalogPositionPane positions={searchPositions} setSearchPositions={setSearchPositions} />

    <NextSearch
      setSearchPositions={(pos: ICatalogPosition[]) => setSearchPositions([...searchPositions, ...pos])}
      setShowNextButton={setShowNextButton}
      showNextButton={showNextButton}
      lastQuery={lastQuery}
      lastId={searchPositions.length ? searchPositions[searchPositions.length - 1]?.id : ''}
    />
  </div>
}
