import { useLoaderData } from "react-router-dom";
import ContactPagePane from "../ContactPagePane/ContactPagePane";
// import session from "../../../libs/token.manager";
import styles from "./styles.module.css";

export default function ContactList() {
  // session.subscribe('MainSliderList');
  const contacts = useLoaderData() as IContact[]

  return <div className={styles.root} >
    <ContactPagePane contacts={contacts} />
  </div>
}
