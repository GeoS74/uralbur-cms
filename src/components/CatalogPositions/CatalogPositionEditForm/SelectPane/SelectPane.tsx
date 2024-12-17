// import { useState } from "react";

import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import classNames from "classnames";
import styles from "./styles.module.css";

type Props = {
  prefix: string,
  levels: ICatalogLevel[]
  val?: string | null
  errorMessage?: IErrorMessage
  label?: string
}

export default function SelectPane({ prefix, levels, val, errorMessage, label }: Props) {
  return <div className={classNames(styles.root, "mb-4")}>
    <div className="form-group">
      <label htmlFor={`${prefix}Input`} className="form-label mt-4">{label || ""}</label>
      <select className="form-select btn-outline-light mt-2"
        name={`${prefix}`}
        id={`${prefix}Input`}
        defaultValue={val || ""}
      >
        <option value="">Выберите уровень</option>
        {_makeOptions(levels, val)}
      </select>

      {errorMessage?.field === prefix ? <ErrorMessage errorMessage={errorMessage.message} /> : <></>}
    </div>

  </div>
}

function _makeOptions(levels: ICatalogLevel[], val?: string | null, depth = 1) {
  const result: JSX.Element[] = [];

  for (let i = 0; i < levels.length; i++) {
    result.push(<option
      value={levels[i].id}
      key={levels[i].id}
      // selected={!!val && levels[i].parent === val}
    >{_makePrefix(depth)}{levels[i].title}</option>);

    if (levels[i].childs.length) {
      result.push(..._makeOptions(levels[i].childs, val, depth + 1));
    }
  }

  return result;
}

function _makePrefix(depth: number) {
  return `|-${new Array(depth).fill('--').join('')}`
}
