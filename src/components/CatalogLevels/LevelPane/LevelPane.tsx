import LevelUL from "./LevelUL/LevelUL";
import styles from "./styles.module.css"

type Props = {
  levels: ICatalogLevel[]
}

export default function LevelPane({ levels }: Props) {
  return levels?.length ?

    <div className={styles.root}>
      <LevelUL levels={levels} hidden={false} />
    </div> : <div>уровни не добавлены</div>
}



 
