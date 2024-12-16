import LevelLI from "../LevelLI/LevelLI";

type props = {
  levels: ICatalogLevel[]
  hidden: boolean
}

export default function LevelUL({ levels, hidden }: props) {
  return <ul hidden={hidden}>
    {
      levels.map((e) => <LevelLI key={e.id} level={e} />)
    }
  </ul>
}