import Mock from 'mockjs'
import navList from './data/navList'
import swiperList from './data/swiperList'
import videosList from './data/videosList'
import recommendList from './data/recommendList'
import commentsList from './data/commentsList'
import videoDetailList from './data/videoDetailList'

interface RequestConfig {
  url: string
  body: any
  query: {
    page?: string
    pageSize?: string
    [key: string]: any
  }
  headers: Record<string, string>
}
// mock的配置
Mock.setup({
  // 随机延时50-1000毫秒
  timeout: '50-1000'
})

// 轮播图
Mock.mock(/\/swiperList/, 'get', () => {
  return {
    code: 0,
    result: swiperList
  }
})

// 频道菜单
Mock.mock(/\/navList/, 'get', () => {
  return {
    code: 0,
    result: navList
  }
})


Mock.mock(/\/videosList/, 'get', ({ url }) => {
  const query = new URLSearchParams(url.split('?')[1])// 获取url中的参数
  const page = parseInt(query.get('page') ?? '1')//
  const pageSize = parseInt(query.get('pageSize') ?? '10')
  const totalItems = videosList.length
  const start = ((page - 1) * pageSize) % totalItems
  let end = (start + pageSize) % totalItems

  // 处理跨越数组末尾的情况
  let data
  if (end < start) {
    data = [...videosList.slice(start), ...videosList.slice(0, end)]
  } else {
    data = videosList.slice(start, end)
  }

  return {
    code: 0,
    data: {
      data,
      total: Infinity, // 设置为无限大
      page,
      pageSize
    }
  }
})

Mock.mock(/\/recommendList/, 'get', () => {
  return {
    code: 0,
    result: recommendList
  }
})

Mock.mock(/\/commentsList/, 'get', () => {
  return {
    code: 0,
    result: {
      count: 454,
      items: commentsList
    }
  }
})

interface IMockConfig {
  body: string | null;
  type: string
  url: string
}
Mock.mock(/\/videoDetail/, 'get', ({ url }: IMockConfig) => {
  const querystr = url.split('?')[1]
  const queryObj = new URLSearchParams(querystr)
  const id = queryObj.get('id')
  return Mock.mock({
    code: 0,
    result: function () {
      return videoDetailList.find(item => item.id === id)
    }
  })
})
