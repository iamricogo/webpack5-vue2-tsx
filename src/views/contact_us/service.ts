import service, { Response, ResponseInstance } from '@/utils/Service'

export interface SubmitData {
  name: string
  email: string
  mobile_number: string
  comment: string
}

export type SubmitResponse = Response

/**
 * 响应体需要定义data参数类型的话可通过泛型传入
 */
// export type DemoResponse = Response<{
//   total: number
//   list: Record<string, unknown>[]
// }>

class ContactUsService {
  static submit(data: SubmitData): ResponseInstance<SubmitResponse> {
    return service.post('/abc', data)
  }
}

export default ContactUsService
