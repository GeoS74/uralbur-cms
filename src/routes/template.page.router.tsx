import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import TemplatePage from "../components/TemplatePage/TemplatePage";
import TemplateList from "../components/TemplatePage/TemplateList/TemplateList";
import TemplatePageEditForm from "../components/TemplatePage/TemplatePageEditForm/TemplatePageEditForm"
import TemplatePageOne from "../components/TemplatePage/TemplatePageOne/TemplatePageOne"
import { _getMe } from "../libs/auth.user";

export default {
  path: "/template",
  element: <TemplatePage />,
  children: [
    {
      index: true,
      element: <TemplateList />,
      loader: () => fetchWrapper(_getMe)
        .then(() => fetchWrapper(_getSearch))
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/template/page/:alias",
      element: <TemplatePageOne />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _get(params.alias)))
        // .fetchWrapper(() => _get(params.alias))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/template')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/template/page/edit/:alias",
      element: <TemplatePageEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _get(params.alias)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/template')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/template/pages/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _get(alias?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/template/public/${alias || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}