import { useState } from 'react'

export default function LiTag(
    {value, index, setCurrentUserList, currentUserList, userList, setUserList}: 
    {value: (string | undefined), 
     index: number, 
     setCurrentUserList: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>, 
     currentUserList: (string | undefined)[][], 
     userList: string[], 
     setUserList: React.Dispatch<React.SetStateAction<string[]>>}) {


    const [activSpan, setActivSpan] = useState(false)
    return (
        <li
        onMouseEnter={() => setActivSpan(true)}
        onMouseLeave={() => setActivSpan(false)}
        >{activSpan
            ? <>
            {value}
            <span className="text-muted" onClick={() => deleteUser(index, currentUserList, setCurrentUserList, userList, setUserList)} >Удалить</span>
            </>
            : value
        }</li>
)}

function deleteUser(
    index: number,
    currentUserList: (string | undefined)[][],
    setCurrentUserList: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>,
    userList: string[],
    setUserList: React.Dispatch<React.SetStateAction<string[]>>
) {
    const tempArr = []
    for (let i = 0; i < currentUserList.length; i++) {
        if (i !== index) {
            tempArr.push(currentUserList[i])
        } else {
            // setUserList([currentUserList[i], ...userList])
        }
    } 
    setCurrentUserList(tempArr)    
}