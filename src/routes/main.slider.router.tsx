import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import MainSlider from "../components/MainSlider/MainSlider";
import SlideList from "../components/MainSlider/SlideList/SlideList";
import SlideEditForm from "../components/MainSlider/SlideEditForm/SlideEditForm"
import SlidePage from "../components/MainSlider/SlidePage/SlidePage"

export default {
  path: "/mainpage/slider",
  element: <MainSlider />,
  children: [
    {
      index: true,
      element: <SlideList />,
      loader: () => fetchWrapper(_getSearch).catch(() => redirect('/auth'))
      .finally(() => session.start())
    },
    {
      path: "/mainpage/slider/page/:id",
      element: <SlidePage />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/mainpage/sliders')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
    {
      path: "/mainpage/slider/create",
      element: <SlideEditForm />,
      loader: () => session.start(),
    },
    {
      path: "/mainpage/slider/edit/:id",
      element: <SlideEditForm />,
      loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getSlide(params.id))
        .then(responseNotIsArray)
        .then(res => {
          if (res.status === 404) {
            return redirect('/mainpage/slider')
          }
          return res;
        })
        .catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/slider/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getSlide(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/slider/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}