import request from '@/utils/request'

export const getActive = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: params
  })
}

export const getActivechannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

export const deletActivechannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}

export const fabiaoactive = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft
    },
    data
  })
}

export const xiugai = (id, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${id}`,
    params: {
      draft
    },
    data,
    Headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const huoqu = (id) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${id}`,
    Headers: {
      'Content-Type': 'application/json'
    }
  })
}
