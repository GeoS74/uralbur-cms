import { redirect, LoaderFunctionArgs } from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import { responseNotIsArray } from "../middleware/response.validator";
import session from "../libs/token.manager";

import Testimonial from "../components/Testimonial/Testimonial";
import TestimonialList from "../components/Testimonial/TestimonialList/TestimonialList";
import TestimonialEditForm from "../components/Testimonial/TestimonialEditForm/TestimonialEditForm"
import TestimonialPage from "../components/Testimonial/TestimonialPage/TestimonialPage"

export default {
  path: "/testimonial",
  element: <Testimonial />,
  children: [
    {
      index: true,
      element: <TestimonialList />,
      loader: () => fetchWrapper(_getSearch).catch(() => redirect('/auth'))
        .finally(() => session.start())
    },
      {
        path: "/testimonial/page/:id",
        element: <TestimonialPage />,
        loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getTestimonial(params.id))
          .then(responseNotIsArray)
          .then(res => {
            if (res.status === 404) {
              return redirect('/testimonial')
            }
            return res;
          })
          .catch(() => redirect('/auth'))
          .finally(() => session.start())
      },
      {
        path: "/testimonial/create",
        element: <TestimonialEditForm />,
        loader: () => session.start(),
      },
      {
        path: "/testimonial/edit/:id",
        element: <TestimonialEditForm />,
        loader: ({ params }: LoaderFunctionArgs) => fetchWrapper(() => _getTestimonial(params.id))
          .then(responseNotIsArray)
          .then(res => {
            if (res.status === 404) {
              return redirect('/testimonial')
            }
            return res;
          })
          .catch(() => redirect('/auth'))
          .finally(() => session.start())
      },
  ]
}

function _getSearch() {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/testimonial/public/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

function _getTestimonial(id?: string) {
  return fetch(`${serviceHost("mcontent")}/api/mcontent/testimonial/${id || ''}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}