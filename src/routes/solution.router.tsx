import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Solution from "../components/Solution/Solution";
import SolutionList from "../components/Solution/SolutionList/SolutionList";
import SolutionEditForm from "../components/Solution/SolutionEditForm/SolutionEditForm";
import SolutionPage from "../components/Solution/SolutionPage/SolutionPage";
import { _getMe } from "../libs/auth.user";

export default {
  path: "/solutions",
  element: <Solution />,
  children: [
    {
      index: true,
      element: <SolutionList />,
      loader: () => fetchWrapper(_getMe)
        .then(() => fetchWrapper(_getSearch))
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/solutions/page/:id",
      element: <SolutionPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _getSlide(params.id)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/solutions')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/solutions/create",
      element: <SolutionEditForm />,
      loader: () => fetchWrapper(_getMe)
        .then(() => null)
        .catch(() => redirect('/auth'))
        .finally(() => session.start()),
    },
    {
      path: "/solutions/edit/:id",
      element: <SolutionEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _getSlide(params.id)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/solutions')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/solution/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getSlide(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/solution/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}