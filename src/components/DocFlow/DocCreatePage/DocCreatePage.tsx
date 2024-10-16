import { useState } from "react";
import DocSelectType from "../DocSelectType/DocSelectType";
import EditForm from "../EditForm/EditForm";
import session from "../../../libs/token.manager"

export default function DocCreatePage(){
  session.subscribe('DocCreatePage');

  const [typeDoc, setTypeDoc] = useState<DocType>();

  if(typeDoc?.directing && typeDoc.task) {
    return <EditForm typeDoc={typeDoc}/>
  }

  return <DocSelectType setTypeDoc={setTypeDoc} typeDoc={typeDoc}/>
}