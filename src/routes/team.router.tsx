import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Team from "../components/Team/Team";
import TeamList from "../components/Team/TeamList/TeamList";
import TeamEditForm from "../components/Team/TeamEditForm/TeamEditForm";
import TeamPage from "../components/Team/TeamPage/TeamPage";
import { _getMe } from "../libs/auth.user";

export default {
  path: "/team",
  element: <Team />,
  children: [
    {
      index: true,
      element: <TeamList />,
      loader: () => fetchWrapper(_getMe)
        .then(() => fetchWrapper(_getSearch))
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/team/page/:id",
      element: <TeamPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _getTeamUnit(params.id)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/team')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/team/create",
      element: <TeamEditForm />,
      loader: () => fetchWrapper(_getMe)
        .then(() => null)
        .catch(() => redirect('/auth'))
        .finally(() => session.start()),
    },
    {
      path: "/team/edit/:id",
      element: <TeamEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _getTeamUnit(params.id)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/team')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/team/public`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getTeamUnit(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/team/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}