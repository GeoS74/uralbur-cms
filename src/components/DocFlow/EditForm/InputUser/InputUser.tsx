import React from 'react'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'

import serviceHost from "../../../../libs/service.host"
import tokenManager from "../../../../libs/token.manager"
import session from "../../../../libs/token.manager";

export default function InputUser(
    {currentUserList, setCurrentUserList}: 
    {currentUserList: (string | undefined)[][], setCurrentUserList: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>}) {
    session.subscribe('DocFlow/InputUser');    

    // Проверка что в input что то ввели
    const [valueInput, setValueInput] = useState<string>('')
    // проверка открыт список всех пользователей или нет
    const [isOpen, setIsOpen] = useState(false)
    // список который будет отображаться при вводк
    const [displayList, setDisplayList] = useState(Array<Array<string>>)

    useEffect(() => {
        fechInput(valueInput)
        .then((res) => {
            const tempArray = [] as Array<Array<string>>
            
            if (currentUserList.length !== 0) {
                const tempArrayDisplayUser = [] as Array<string | undefined>
                for (let i = 0; i < currentUserList.length; i++) {
                    tempArrayDisplayUser.push(currentUserList[i][1])
                }
                res.map((value: PropsUserList) =>{   
                    if (!tempArrayDisplayUser.includes(value.uid)) {
                        const temp = []
                        temp.push(value.uid)
                        temp.push(value.name)
                        tempArray.push(temp)                            
                    } else {
                        setDisplayList(displayList)
                    }             
                    })
                setDisplayList(tempArray)
            } else {
                res.map((value: PropsUserList) =>{                      
                    const temp = []
                    temp.push(value.uid)
                    temp.push(value.name)
                    tempArray.push(temp)
                        })
                setDisplayList(tempArray)
            }
            
        })
        .catch((e) => {console.log(e.message)})
    }, [valueInput, currentUserList])


    return (
        <div className={styles.searshForm}>
            <input type="text" 
                placeholder='Список подписантов'
                value={valueInput}
                onChange={(event) => {
                    onChangeInput(event, setValueInput, setIsOpen)}}
                onClick={() => inputClick(setIsOpen, isOpen)}/>
            <ul className={styles.autoComplite}>
            { isOpen 
                ? displayList?.map((value, index) =>
                    <li data-uid={value[0]}
                        key={index} 
                        className={styles.autoCompliteItem}
                        onClick={(event) => itemClick(event, setValueInput, setIsOpen, currentUserList, setCurrentUserList)}
                        >{value[1]}</li>) 
                : null}
            </ul>
        </div>     
    )
}

function itemClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    setValueInput: React.Dispatch<React.SetStateAction<string>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentUserList: (string | undefined)[][],
    setCurrentUserList: React.Dispatch<React.SetStateAction<(string | undefined)[][]>>
) {
    if (event.currentTarget.textContent !== null) {
                const tempArrayUserTarget = [] as Array<string | undefined>
                tempArrayUserTarget.push(event.currentTarget.textContent, event.currentTarget.dataset.uid)
                setCurrentUserList([tempArrayUserTarget, ...currentUserList])
                setValueInput('')
                setIsOpen(false)
            }               
    }


function inputClick(
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
) {
    setIsOpen(!isOpen)
}

function onChangeInput(event: React.ChangeEvent<HTMLInputElement>, 
    setValueInput: React.Dispatch<React.SetStateAction<string>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    ) {
    setIsOpen(true)
    setValueInput(event.target.value)
}
// запрос на бэк по введеным значениям в input
const fechInput = async (value: string) => {
    const response = await fetch(`${serviceHost("informator")}/api/informator/user/search/?email=${value}`, {
        headers: {
          'Authorization': `Bearer ${tokenManager.getAccess()}`
            }
          })
        if (!response.ok) {
            throw new Error(`Что то пошло не так ${response.status}`)
        } else {
            return await response.json()
        }
    }