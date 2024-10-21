import styles from "./styles.module.css"
// import {ReactComponent as IconBackArrow} from "./backArrow.svg"
import { useNavigate } from "react-router-dom"

type Props = {
  path?: string
}

export default function BackArrow({path}: Props) {
  const navigate = useNavigate();

    if(path) {
      return (
        <div className={styles.root} onClick={() => navigate(path)}>
            {/* <IconBackArrow  height="30px" width="30px" className={styles.rootButton}/> */}
            <p>Вернуться назад</p>
        </div>
      )
    }

    return (
        <div className={styles.root} onClick={() => navigate(-1)}>
            {/* <IconBackArrow  height="30px" width="30px" className={styles.rootButton}/> */}
            <p>Вернуться назад</p>
        </div>
        
        
)}