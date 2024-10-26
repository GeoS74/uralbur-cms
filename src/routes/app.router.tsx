import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"
import tokenManager from "../libs/token.manager"
import Main from "../components/Main/Main"
import authRouter from "./auth.router"
import userRouter from "./user.router"
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary"
import mainSliderRouter from "./main.slider.router"
import testimonialRouter from "./testimonial.router"
import priceRouter from "./price.router";
import templatePageRouter from "./template.page.router";
import contactRouter from "./contact.router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: () => fetchWrapper([_getMe])
      .catch(() => redirect('/auth')),
      errorElement: < ErrorBoundary />,
  },
  userRouter,
  authRouter,
  mainSliderRouter,
  testimonialRouter,
  priceRouter,
  templatePageRouter,
  contactRouter,
])

export default <RouterProvider router={router} />

function _getMe() {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

