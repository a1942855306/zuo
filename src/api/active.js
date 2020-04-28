import request from '@/utils/request'

// 获取文章
export const getActive = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params: params
  })
}

// 获取文章频道
export const getActivechannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export const deletActivechannels = (id) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${id}`
  })
}

// 发表文章
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

// 修改文章
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

// 获取单个文章
export const huoqu = (id) => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${id}`,
    Headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 修改评论状态
export const xgplzt = (articleId, allowComment) => {
  return request({
    method: 'PUT',
    url: '/mp/v1_0/comments/status',
    params: {
      // 对象的属性名不受代码规范限制
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
