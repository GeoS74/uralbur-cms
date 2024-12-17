import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import CatalogLevels from "../components/CatalogLevels/CatalogLevels";
import LevelList from "../components/CatalogLevels/LevelList/LevelList";
import LevelEditForm from "../components/CatalogLevels/LevelEditForm/LevelEditForm";

export default {
  path: "/catalog/levels",
  element: <CatalogLevels />,
  children: [
    {
      index: true,
      element: <LevelList />,
      loader: () => fetchWrapper(_getSearch)
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/catalog/levels/create",
      element: <LevelEditForm />,
      loader: () => fetchWrapper(_getSearch)
      .then(responseNotIsArray)
      .then(async response => {
        const res = await response.json();
        return [undefined, res]
      })
      .finally(() => session.start()),
    },
    {
      path: "/catalog/levels/edit/:id",
      element: <LevelEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper([
        () => _getLevel(params.id),
        () => _getSearch()
      ])
        .then(res => {
          if (Array.isArray(res)) {
            if (res[0].status === 404) {
              return redirect('/catalog/levels')
            }
          }
          return res;
        })
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getLevel(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}