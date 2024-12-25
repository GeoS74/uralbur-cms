import { useState } from "react";
import classNames from "classnames";
import serviceHost from "../../../../libs/service.host"
import { ReactComponent as IconUpRow } from "../icons/caret-up.svg"
import OptionalButton from "../OptionalButton/OptionalButton";
import LevelUL from "../LevelUL/LevelUL";
import styles from "./styles.module.css"

type props = {
  level: ICatalogLevel
}

export default function LevelLi({ level }: props) {
  const [ulHidden, setUlHidden] = useState(false);
  const [showOptionalButton, setShowOptionalButton] = useState(false);

  return <li className={styles.root}
    onClick={(e) => {
      setUlHidden(!ulHidden)
      e.stopPropagation(); // обязательно: остановка всплытия события
    }}
  >
    <div
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >

      {level?.image?.fileName ?
        <img src={`${serviceHost('mcontent')}/api/mcontent/static/images/catalog/${level.image.fileName}`} loading="lazy" />
        : <></>}

      <span>{level.title}</span>
      {level.childs.length ? <IconUpRow className={classNames(styles.svgRow, (ulHidden ? styles.rotate : ''))}
      /> : <></>}

      {showOptionalButton ? <OptionalButton {...level} /> : <></>}
    </div>

    {level.childs.length ? <LevelUL levels={level.childs} hidden={ulHidden} /> : <></>}
  </li>
}