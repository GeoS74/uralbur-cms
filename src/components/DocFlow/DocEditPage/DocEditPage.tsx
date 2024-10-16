import { useLoaderData } from "react-router-dom";
import EditForm from "../EditForm/EditForm";
import session from "../../../libs/token.manager"

export default function DocEditPage(){
  session.subscribe('DocEditPage');

  const doc = useLoaderData() as IDoc;
  const typeDoc = { 
    directing: doc.directing as IDirecting, 
    task: doc.task as ITask 
  }

  return <EditForm typeDoc={typeDoc} doc={doc} />
}