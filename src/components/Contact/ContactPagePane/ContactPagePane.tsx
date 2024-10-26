import styles from "./styles.module.css"
import ContactOptionalHeader from "../ContactOptionalHeader/ContactOptionalHeader"

type Props = {
  contacts: IContact[]
}

export default function ContactPagePane({ contacts }: Props) {
  return <div className={styles.root}>
    {_makeList(contacts)}
  </div>
}

function _makeList(contacts: IContact[]) {
  return contacts
    .map((s, index) => <div key={index} className="card mt-0">

      <ContactOptionalHeader {...s} />

      <div>
        <div>{s.title}: {s.value}</div>
      </div>

    </div>)
}