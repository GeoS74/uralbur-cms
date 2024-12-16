import { useState } from "react";
import classNames from "classnames";
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

  return <li
    onClick={(e) => {
      setUlHidden(!ulHidden)
      e.stopPropagation(); // обязательно: остановка всплытия события
    }}
  >
    <div
      onMouseEnter={() => setShowOptionalButton(true)}
      onMouseLeave={() => setShowOptionalButton(false)}
    >
      {level.title}
      {level.childs.length ? <IconUpRow className={classNames(styles.svgRow, (ulHidden ? styles.rotate : ''))}
      /> : <></>}

      {showOptionalButton ? <OptionalButton {...level} /> : <></>}
    </div>

    {level.childs.length ? <LevelUL levels={level.childs} hidden={ulHidden} /> : <></>}
  </li>
}