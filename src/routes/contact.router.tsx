import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Contact from "../components/Contact/Contact";
import ContactList from "../components/Contact/ContactList/ContactList";
import ContactEditForm from "../components/Contact/ContactEditForm/ContactEditForm";
import { _getMe } from "../libs/auth.user";

export default {
  path: "/contact",
  element: <Contact />,
  children: [
    {
      index: true,
      element: <ContactList />,
      loader: () => fetchWrapper(_getMe)
        .then(() => fetchWrapper(_getSearch))
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/contact/edit/:alias",
      element: <ContactEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(_getMe)
        .then(() => fetchWrapper(() => _get(params.alias)))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/contact')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/contact/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _get(alias?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/contact/${alias || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}