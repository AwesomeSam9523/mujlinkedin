/* eslint-disable */
import axios from 'axios';
import * as Vue from 'vue';
let token = localStorage.getItem("token")
const url = 'http://localhost:3000';
import { useToast } from 'vue-toastification'
const toast = useToast()

export class APIService {
  constructor() {
    const service = axios.create({
      headers: { csrf: "token", Authorization: "Bearer " + token },
      withCredentials: "include"
    })
    this.service = service
  }

  handleSuccess(response) {
    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  }

  async handleError(res, path, payload, type) {
    // if (res?.response?.data?.code)
    //   Vue.prototype.$notify({
    //     group: "alert",
    //     type: "error",
    //     text: messages[res.response.data.code]
    //   })
    // if (res?.response?.status === 401 && window.location.pathname !== "/login") {
    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }

    if (res?.response?.data?.message) {
      toast.error(res.response.data.message);
    }

    return Promise.reject(res)
  }

  get(path, payload) {
    token = localStorage.getItem("token");
    return this.service
      .get(`${url}${path}`, { ...payload, headers: { Authorization: "Bearer " + token } })
      .then(res => this.handleSuccess(res))
      .catch(e => this.handleError(e, path, payload, "get"))
  }

  post(path, payload) {
    token = localStorage.getItem("token");
    return this.service
      .request({
        method: "POST",
        url: `${url}${path}`,
        responseType: "json",
        data: payload,
        headers: { Authorization: "Bearer " + token }
      })
      .then(res => this.handleSuccess(res))
      .catch(res => this.handleError(res, path, payload, "post"))
  }
}

export default new APIService();
