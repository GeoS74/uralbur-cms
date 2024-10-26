import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Progress from "../components/Progress/Progress";
import ProgressList from "../components/Progress/ProgressList/ProgressList";
import ProgressEditForm from "../components/Progress/ProgressEditForm/ProgressEditForm"
import ProgressPage from "../components/Progress/ProgressPage/ProgressPage"

export default {
  path: "/progress",
  element: <Progress />,
  children: [
    {
      index: true,
      element: <ProgressList />,
      loader: () => fetchWrapper(_getSearch).catch(() => redirect('/auth'))
      .finally(() => session.start())
    },
    {
      path: "/progress/page/:id",
      element: <ProgressPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/progress')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/progress/create",
      element: <ProgressEditForm />,
      loader: () => session.start(),
    },
    {
      path: "/progress/edit/:id",
      element: <ProgressEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/progress')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/progress/public/search/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getSlide(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/progress/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}