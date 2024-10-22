import { redirect } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Price from "../components/Price/Price";
import PricePage from "../components/Price/PricePage/PricePage";
import PriceEditForm from "../components/Price/PriceEditForm/PriceEditForm"

export default {
  path: "/price",
  element: <Price />,
  children: [
    {
      index: true,
      element: <PricePage />,
      loader: () => fetchWrapper(_getPrice)
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return null
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/price/edit",
      element: <PriceEditForm />,
      loader: () => fetchWrapper(_getPrice)
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return null
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getPrice() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/price/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}
