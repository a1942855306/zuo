import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // data 用来设置 POST 请求体
  })
}

// 修改用户头像
export const update = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    Headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

// 修改用户基本信息
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}
