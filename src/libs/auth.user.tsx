import serviceHost from "../libs/service.host";
import tokenManager from "../libs/token.manager";

export const _getMe =  () => {
  return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}