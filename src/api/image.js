import request from '@/utils/request'
// 上传图片
export const sctp = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    Headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 获取图片
export const hqtp = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    Headers: {
      'Content-Type': 'application/json'
    },
    params
  })
}

// 收藏图片
export const putsctp = (imgid, collect) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imgid}`,
    Headers: {
      'Content-Type': 'application/json'
    },
    data: {
      collect
    }
  })
}

// 删除图片
export const deleteImage = (imageId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageId}`
  })
}
