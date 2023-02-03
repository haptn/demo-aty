import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 60000,   // 60s (1 min)
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Access-Control-Allow-Origin': '*'
  },
})

// Set default headers
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
// axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.common['Cache-Control'] = 'max-age=0'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

/**
 * get request headers
 * @param {boolean} isAuth
 * @returns
 */
const getHeaders = (isAuth = false) => {
  const headers = {
    Authorization: '',
  }
  // const state = store.getState()
  if (isAuth) {
    // headers.Authorization = `Bearer ${state.auth.token}`
    headers.Authorization = 'OK'
  }
  return headers
}

// define error handle
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response
    // handle error code
    switch (data.error_code) {
      default:
        break
    }
    return response.data
  },
  (error) => {
    const { response } = error
    // if response error was defined by server
    return response && response.data ? response : Promise.reject(error)
  }
)

export default {
  /**
   * get request
   * @param {string} endpoint
   * @param {*} params All parameter need to pass for server
   * @param {boolean} isAuth
   */
  get: (endpoint, params = {}, isAuth = false) => {
    return axiosInstance.get(endpoint, {
      params,
      // ...{ headers: getHeaders(isAuth) },
      // paramsSerializer: (params) => {
      //   return qs.stringify(params, { arrayFormat: 'repeat' })
      // },
    })
  },

  /**
   * post request
   * @param {string} endpoint
   * @param {*} data All parameter need to pass for server
   * @param {boolean} isAuth
   */
  post: (endpoint, data, isAuth = false) => {
    return axiosInstance.post(endpoint, data, {
      headers: getHeaders(isAuth)
    })
  },

  /**
   * put
   * @param {string} endpoint
   * @param {*} data All parameter need to pass for server
   * @param {boolean} isAuth
   */
  put: (endpoint, data, isAuth = false) => {
    return axiosInstance.put(endpoint, data, {
      headers: getHeaders(isAuth),
    })
  },

  /**
   * patch
   * @param {string} endpoint
   * @param {*} data All parameter need to pass for server
   * @param {boolean} isAuth
   */
  patch: (endpoint, data, isAuth = false) => {
    return axiosInstance.patch(endpoint, data, {
      headers: getHeaders(isAuth),
    })
  },

  /**
   * delete request
   * @param {string} endpoint
   * @param {*} data All parameter need to pass for server
   * @param {boolean} isAuth
   */
  delete: (endpoint, data, isAuth = false) => {
    return axiosInstance.delete(endpoint, {
      headers: { ...getHeaders(isAuth) },
      data,
    })
  },

  /**
   * upload file
   * @param {string} endpoint
   * @param {*} agrs All parameter need to pass for server
   * @param {string} method
   * @param {boolean} isAuth
   * @param {boolean} formDataParsed
   */
  uploadFile: (
    endpoint,
    agrs = {},
    method = 'post',
    isAuth,
    formDataParsed = false
  ) => {
    const headers = getHeaders(isAuth)
    let formData = agrs
    if (!formDataParsed) {
      formData = new FormData()
      Object.keys(agrs).forEach((item) => {
        formData.append(item, agrs[item])
      })
    }
    return axiosInstance[method](endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data', ...headers },
    })
  },
}