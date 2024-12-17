type Props = {
  prefix: string,
  levels: ICatalogLevel[]
}

export default function SelectPane({ prefix, levels }: Props) {
  return <select className="form-select btn-outline-light"
    name={`${prefix}`}
    defaultValue=""
  >
    <option value="">Выберите раздел</option>
    {_makeOptions(levels)}
  </select>
}

function _makeOptions(levels: ICatalogLevel[], depth = 1) {
  const result: JSX.Element[] = [];

  for (let i = 0; i < levels.length; i++) {
    result.push(<option
      value={levels[i].id}
      key={levels[i].id}
    >{_makePrefix(depth)}{levels[i].title}</option>);

    if (levels[i].childs.length) {
      result.push(..._makeOptions(levels[i].childs, depth + 1));
    }
  }

  return result;
}

function _makePrefix(depth: number) {
  return `|-${new Array(depth).fill('--').join('')}`
}
