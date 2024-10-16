import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import User from "../components/User/User"
import UserPage from "../components/User/UserPage/UserPage";
import ChangePassword from "../components/User/ChangePassword/ChangePassword";
import tokenManager from "../libs/token.manager"

export default {
  path: "/user",
  element: <User />,
  children: [
    {
      index: true,
      element: <UserPage />,
      loader: () => fetchWrapper([_getMe, _getUser])
        .then(async res => {
          if (Array.isArray(res)) {
            return {
              ...await _me(res[0]),
              ...await _user(res[1]),
            }
          }
        })
        .catch(() => redirect('/auth')),
    },
    {
      path: '/user/changePassword',
      element: <ChangePassword />,
      loader: () => fetchWrapper([_getMe, _getUser])
        .then(async res => {
          if (Array.isArray(res)) {
            return {
              ...await _me(res[0]),
              ...await _user(res[1]),
            }
          }
        })
        .catch(() => redirect('/auth')),
    },
  ]
}

async function _me(res: Response) {
  if (res.ok) return await res.json()
  throw new Error()
}

async function _user(res: Response) {
  if (res.ok) return await res.json()
  if (res.status === 404) {
    /**
     * перед созданием кабинета получить значение поля name из сервиса mAuth
     */
    const userMaut = await _getMe().then(_me).catch(console.log);
    return await _createUser(userMaut?.name || '')
  }
  throw new Error()
}

function _getMe() {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getUser() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/user/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _createUser(name: string) {
  const fd = new FormData();
  fd.append('name', name);
  
  return fetch(`${serviceHost("mcontent")}/api/mcontent/user/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    },
    body: fd
  })
    .then(async res => {
      if (res.ok) return await res.json()
    })
}