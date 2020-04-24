import request from '@/utils/request'

export const getActive = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: params
  })
}
