import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import CatalogPositions from "../components/CatalogPositions/CatalogPositions";
import CatalogPositionList from "../components/CatalogPositions/CatalogPositionList/CatalogPositionList";
import CatalogPositionEditForm from "../components/CatalogPositions/CatalogPositionEditForm/CatalogPositionEditForm";
import CatalogPositionPage from "../components/CatalogPositions/CatalogPositionPage/CatalogPositionPage";

export default {
  path: "/catalog/positions",
  element: <CatalogPositions />,
  children: [
    {
      index: true,
      element: <CatalogPositionList />,
      loader: () => fetchWrapper([_getSearch, _getLevels])
        .then(response => {
          if (Array.isArray(response)) {
            return Promise.all(response.map(async r => await r.json()))
          }
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/catalog/positions/page/:id",
      element: <CatalogPositionPage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getPosition(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/catalog/positions')
          }
          return res;
        })
        // .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/catalog/positions/create",
      element: <CatalogPositionEditForm />,
      loader: () => fetchWrapper(_getLevels)
        .then(responseNotIsArray)
        .then(async response => {
          const res = await response.json();
          return [undefined, res]
        })
        .finally(() => session.start()),
    },
    {
      path: "/catalog/positions/edit/:id",
      element: <CatalogPositionEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper([
        () => _getPosition(params.id),
        () => _getLevels()
      ])
        .then(res => {
          if (Array.isArray(res)) {
            if (res[0].status === 404) {
              return redirect('/catalog/positions')
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
  return fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getPosition(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getLevels() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}