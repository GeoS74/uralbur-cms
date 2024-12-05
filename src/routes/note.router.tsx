import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Note from "../components/Note/Note";
import NoteList from "../components/Note/NoteList/NoteList";
import NoteEditForm from "../components/Note/NoteEditForm/NoteEditForm";
import NotePage from "../components/Note/NotePage/NotePage";

export default {
  path: "/note",
  element: <Note />,
  children: [
    {
      index: true,
      element: <NoteList />,
      loader: () => fetchWrapper(_getSearch).catch(() => redirect('/auth'))
      .finally(() => session.start())
    },
    {
      path: "/note/page/:id",
      element: <NotePage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/note')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/note/create",
      element: <NoteEditForm />,
      loader: () => session.start(),
    },
    {
      path: "/note/edit/:id",
      element: <NoteEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/note')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/note/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getSlide(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/note/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}