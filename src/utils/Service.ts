import { Message } from 'element-ui'
import axios, { AxiosResponse } from 'axios'
import i18n from '@/lang'
export interface Response<T = unknown> {
  message: string
  status: number
  data?: T
}

export type ResponseInstance<T extends Response> = Promise<AxiosResponse<T>>

export const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-type': 'application/json'
  }
})

service.interceptors.response.use(
  (response: AxiosResponse<Response>) => {
    // Some example codes here:
    // status == 0: success
    const res = response?.data
    if (!res || res.status !== 0) {
      Message({
        message: res?.message || (i18n.t('errors.error') as string),
        type: 'error'
      })

      return Promise.reject(res)
    } else {
      return response
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default service
