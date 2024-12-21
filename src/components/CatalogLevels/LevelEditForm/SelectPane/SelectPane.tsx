// import { useState } from "react";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  levels: ICatalogLevel[]
  currentId?: string
  parentId?: string | null
  errorMessage?: IErrorMessage
  label?: string
}

export default function SelectPane({ prefix, levels, parentId, currentId, errorMessage, label }: Props) {
  return <div className={classNames(styles.root, "mb-4")}>
    <div className="form-group">
      <label htmlFor={`${prefix}Input`} className="form-label mt-4">{label || ""}</label>
      <select className="form-select btn-outline-light mt-2"
        name={`${prefix}`}
        id={`${prefix}Input`}
        defaultValue={parentId || ""}
      >
        <option value="">Выберите раздел</option>
        {_makeOptions(levels, currentId)}
      </select>

      {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

  </div>
}

function _makeOptions(levels: ICatalogLevel[], currentId?: string, depth = 1, dis = false) {
  const result: JSX.Element[] = [];

  for (let i = 0; i < levels.length; i++) {
    result.push(<option
      value={levels[i].id}
      key={levels[i].id}
      disabled={dis || levels[i].id === currentId}
      // selected={!!val && levels[i].parent === val}
    >{_makePrefix(depth)}{levels[i].title}</option>);

    if (levels[i].childs.length) {
      result.push(..._makeOptions(levels[i].childs, currentId, depth + 1, dis || levels[i].id === currentId));
    }
  }

  return result;
}

function _makePrefix(depth: number) {
  return `|-${new Array(depth).fill('--').join('')}`
}
