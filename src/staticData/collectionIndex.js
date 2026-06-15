import { ref } from 'vue'

import bilibiliLogo from '@/assets/images/logos/bilibili-down.png'
import rosaLogo from '@/assets/images/logos/rosa-down.png'
import vantLogo from '@/assets/images/logos/vant-down.png'
import weraceLogo from '@/assets/images/logos/u9-down.png'
import xtxLogo from '@/assets/images/logos/xtx-down.png'

import bookshelfGalleryBg from '@/assets/images/bookshelf/bookshelfGalleryBg.png'
import shoppingMallGalleryBg from '@/assets/images/shoppingMall/shoppingMallGalleryBg.png'
import xtxGalleryBg from '@/assets/images/xtx/xtxGalleryBg.png'
import weraceGalleryBg from '@/assets/images/werace/weraceGalleryBg.png'
import bilibiliGalleryBg from '@/assets/images/bilibili/bilibiliGalleryBg.png'
import acirGalleryBg from '@/assets/images/general/dawnbreak-cover.png'

export const headerContents = ref([
  { imgUrl: rosaLogo, name: '蔷薇丛的小书架', routerName: 'bookshelf' },
  { imgUrl: vantLogo, name: '智慧商城', routerName: 'shopping-mall' },
  { imgUrl: xtxLogo, name: '小兔鲜儿', routerName: 'xtx' },
  { imgUrl: weraceLogo, name: 'WeRace', routerName: 'werace' },
  { imgUrl: bilibiliLogo, name: 'B站首页复刻', routerName: 'bilibili' }
])

export const galleryListContents = ref([
  {
    id: 1,
    routerName: 'bookshelf',
    imgUrl: bookshelfGalleryBg,
    name: '蔷薇丛的小书架',
    desc: '从组合式 API 到 Pinia 持久化， 广泛实践 Vue 3基础',
    onlineUrl: 'https://bookshlef-vue3-demo.vercel.app/'
  },
  {
    id: 2,
    routerName: 'shopping-mall',
    imgUrl: shoppingMallGalleryBg,
    name: '智慧商城',
    desc: '基于 SPA 设计，广泛实践 Vue 2 基础',
    onlineUrl: 'https://shoppingmall-seven.vercel.app/'
  },
  {
    id: 3,
    routerName: 'xtx',
    imgUrl: xtxGalleryBg,
    name: '小兔鲜儿',
    desc: '基础不牢，地动山摇 —— 纯 H5C3 实践项目',
    onlineUrl: 'https://stellerainn.github.io/xiaotuxian-pc/'
  },
  {
    id: 4,
    routerName: 'werace',
    imgUrl: weraceGalleryBg,
    name: 'WeRace',
    desc: '窥见全栈 —— 不只是课设：H5C3 + PHP + MySQL',
    onlineUrl: 'https://github.com/StelleRainn/WeRace'
  },
  {
    id: 5,
    routerName: 'bilibili',
    imgUrl: bilibiliGalleryBg,
    name: 'B站首页复刻',
    desc: '一位前端工程师的起点之作',
    onlineUrl: 'https://stellerainn.github.io/bilibili-imitation/'
  },
  {
    id: 6,
    imgUrl: acirGalleryBg,
    name: 'A Clock Inside The Rose',
    desc: 'Vue 3 + Spring Boot + MySQL 的全栈效率中心与毕业设计作品',
    onlineUrl: 'http://39.101.77.156/dashboard'
  }
])
