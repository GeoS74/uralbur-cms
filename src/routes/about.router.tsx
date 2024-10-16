import tokenManager from "../libs/token.manager"
import session from "../libs/token.manager"
import serviceHost from "../libs/service.host"
import fetchWrapper from "../libs/fetch.wrapper"

import Head from "../components/Head/Head"
import About from "../components/About/About"

export default {
  path: "/about",
  children: [
    {
      path: "/about/company",
      element: <>
        <Head 
          title="О компании SIGNAL"
          description="О компании SIGNAL"
        />
        <About alias="company" />
      </>,
      loader: () => fetchWrapper(() => _getAbout("company"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/credential",
      element: <><></><>
        <Head 
          title="Реквизиты компании SIGNAL"
          description="Реквизиты компании SIGNAL"
        />
        <About alias="credential"/>
      </></>,
      loader: () => fetchWrapper(() => _getAbout("credential"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/garanty",
      element: <><></><></><>
        <Head 
          title="Условия гарантии SIGNAL"
          description="Условия гарантии SIGNAL"
        />
        <About alias="garanty"/>
      </></>,
      loader: () => fetchWrapper(() => _getAbout("garanty"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/contact",
      element: <><></><></><></><>
        <Head 
          title="Контакты компании SIGNAL"
          description="Контакты компании SIGNAL"
        />
        <About alias="contact"/>
      </></>,
      loader: () => fetchWrapper(() => _getAbout("contact"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/mainPage",
      element: <><></><></><></><></><><About alias="mainPage"/></></>,
      loader: () => fetchWrapper(() => _getAbout("mainPage"))
        .catch(() => [])
        .finally(() => session.start())
    },
    {
      path: "/about/delivery",
      element: <><></><></><></><></><></><>
        <Head 
          title="Доставка запчастей от компании SIGNAL"
          description="Доставка запчастей от компании SIGNAL"
        />
        <About alias="delivery"/>
      </></>,
      loader: () => fetchWrapper(() => _getAbout("delivery"))
        .catch(() => [])
        .finally(() => session.start())
    },
  ]
}

function _getAbout(alias: string) {
  return fetch(`${serviceHost("informator")}/api/informator/about/${alias}`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}