import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})
request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    console.log(error)
  }
)
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response && error.response.status === 401) {
    window.localStorage.removeItem('user')
    router.push('/')
  }
  return Promise.reject(error)
})
export default request
