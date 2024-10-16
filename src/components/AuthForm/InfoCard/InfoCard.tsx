import { Link, useLoaderData } from "react-router-dom";

import styles from "./styles.module.css"

type Props = {
  mode: AuthInfoCardMode
}

export const InfoCard = ({ mode }: Props) => {
  const data = _getMessage(mode, useLoaderData() as number)

  return <div className={styles.root}>
    <div className={`card border-${data.accept ? 'success' : 'danger'}`}>
      <div className="card-header">{data.title}</div>
      <div className="card-body">
        <h4 className="card-title">{data.message}</h4>
        <p className="card-text">{data.description}</p>
        <p className="card-text"><Link to="/auth">Перейти на страницу авторизации</Link></p>
      </div>
    </div>
  </div>
}

function _getMessage(mode: AuthInfoCardMode, status: number) {
  return mode === 'confirm' ? _getConfirmMessage(status) : _getRecoveryMessage(status)
}

function _getConfirmMessage( status: number){
  return {
    title: "Подтверждение email",
    message: status === 200 ? 
      "Вы успешно зарегестрировались" : 
      "Переданный токен не действителен",
    description: status === 200 ?
      "Используйте свой логин и пароль, указанные при регистрации для входа на сайт" :
      "Возможно ссылка устарела или токен не верный",
    accept: status === 200,
  }
}

function _getRecoveryMessage( status: number){
  return {
    title: "Сброс пароля",
    message: status === 200 ? 
      "Пароль сброшен" : 
      "Ошибка сброса пароля",
    description: status === 200 ?
      "Новый пароль сгенерирован и выслан на Ваш email, указанный при регистрации" :
      "Возможно ссылка устарела или токен сброса пароля не верный",
    accept: status === 200,
  }
}