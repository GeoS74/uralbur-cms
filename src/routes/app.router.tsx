import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import fetchWrapper from "../libs/fetch.wrapper";
import config from "../config";
import Main from "../components/Main/Main";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import mainSliderRouter from "./main.slider.router";
import testimonialRouter from "./testimonial.router";
import priceRouter from "./price.router";
import templatePageRouter from "./template.page.router";
import contactRouter from "./contact.router";
import progressRouter from "./progress.router";
import solutionRouter from "./solution.router";
import teamRouter from "./team.router";
import noteRouter from "./note.router";
import catalogLevelRouter from "./catalog.level.router";
import catalogPositionRouter from "./catalog.position.router";
import { _getMe } from "../libs/auth.user";

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
  progressRouter,
  solutionRouter,
  teamRouter,
  noteRouter,
  catalogLevelRouter,
  catalogPositionRouter,
], {
  basename: config.node.prefix
})

export default <RouterProvider router={router} />
