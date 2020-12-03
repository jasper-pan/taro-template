/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "./http"

export const loginRequest = (postData) => {
  return HTTPREQUEST.post('/garbage.service/login', postData)
}
