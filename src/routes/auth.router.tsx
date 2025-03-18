import { Outlet, redirect } from "react-router-dom"

import tokenManager from "../libs/token.manager"
// import Navigate from "../components/navigate/Navigate"
import { AuthForm } from "../components/AuthForm/AuthForm"
import { InfoCard } from "../components/AuthForm/InfoCard/InfoCard"
import serviceHost from "../libs/service.host"
import session from "../libs/token.manager"
import Head from "../components/Head/Head"

export default {
  path: "/auth",
  element: <>
    <Head 
      title="авторизация пользователя"
      description="авторизация пользователя"
    />
    {/* <Navigate /> */}
    <Outlet />
  </>,
  children: [
    {
      index: true,
      element: <AuthForm />,
    },
    {
      path: "/auth/signout",
      element: <></>,
      loader: () => {
        
        fetch(`${serviceHost("mauth")}/api/mauth/signout/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${tokenManager.getRefresh()}`
          }
        });

        session.close()
        return redirect("/auth");
      }
    },
    {
      path: "/auth/confirm/:token",
      element: <InfoCard mode="confirm"/>,
      loader: ({ params }: { params: unknown }) => {

        if (typeof params === 'object' && params !== null) {
          if ("token" in params) {
            return _requestAPI(`${serviceHost("mauth")}/api/mauth/confirm/${params.token}`);
          }
        }
      }
    },
    {
      path: "/auth/forgot/:token",
      element: <InfoCard mode="recovery"/>,
      loader: ({ params }: { params: unknown }) => {

        if (typeof params === 'object' && params !== null) {
          if ("token" in params) {
            return _requestAPI(`${serviceHost("mauth")}/api/mauth/forgot/${params.token}`);
          }
        }
      }
    },
  ]
}

function _requestAPI(url: string) {
  return fetch(url)
  .then(res => res.status)
  .catch(error => {
    console.log(error.message);
    return 500;
  })
}
