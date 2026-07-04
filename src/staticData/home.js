import { ref } from 'vue'

import rosaCover from '@/assets/images/general/rosa-cover.png'
import dawnbreakCover from '@/assets/images/general/dawnbreak-cover.png'
import contactCover from '@/assets/images/general/contact-cover.png'
import playgroundCover from '@/assets/images/general/playground-cover.png'

import shoppingMallHeroBanner from '@/assets/images/shoppingMall/shoppingMall-hero-banner-uw.png'
import bookshelfHeroBanner from '@/assets/images/bookshelf/bookshelf-hero-banner-uw.png'
import bilibiliHeroBanner from '@/assets/images/bilibili/bilibili-hero-banner-uw.png'
import weraceHerobanner from '@/assets/images/werace/werace-hero-banner-uw.png'
import xtxHerobanner from '@/assets/images/xtx/xtx-hero-banner-uw.png'

export const projectsList = ref([
  {
    id: 1,
    routerName: 'bookshelf',
    bgUrl: bookshelfHeroBanner,
    name: '蔷薇丛的小书架',
    desc: '从组合式 API 到 Pinia 持久化， 广泛实践 Vue 3基础',
    onlineUrl: '/rosa-bookshelf/',
    textTheme: '#fff'
  },
  {
    id: 2,
    routerName: 'shopping-mall',
    bgUrl: shoppingMallHeroBanner,
    name: '智慧商城',
    desc: '基于 SPA 设计，广泛实践 Vue 2 基础',
    onlineUrl: '/shopping-mall/',
    textTheme: '#000'
  },
  {
    id: 3,
    routerName: 'xtx',
    bgUrl: xtxHerobanner,
    name: '小兔鲜儿',
    desc: '基础不牢，地动山摇 —— 纯 H5C3 实践项目',
    onlineUrl: '/xiaotuxian-pc/',
    textTheme: '#000'
  },
  {
    id: 4,
    routerName: 'werace',
    bgUrl: weraceHerobanner,
    name: 'WeRace',
    desc: '窥见全栈 —— 不只是课设：H5C3 + PHP + MySQL',
    onlineUrl: 'https://github.com/StelleRainn/WeRace',
    textTheme: '#fff'
  },
  {
    id: 5,
    routerName: 'bilibili',
    bgUrl: bilibiliHeroBanner,
    name: 'B站首页复刻',
    desc: '一位前端工程师的起点之作',
    onlineUrl: '/bilibili-imitation/',
    textTheme: '#000'
  }
])

export const subBannerList = ref([
  {
    mainTitle: '"蔷薇" - The IP',
    subTitle: '一如雨中蔷薇，在星光与水流之间，静静盛放。',
    bgUrl: rosaCover,
    routerName: 'rosa',
    visible: true
  },
  {
    mainTitle: '改创计划 S13: 破晓',
    subTitle: '"咫尺侵晨，所谓破晓，终将自由。"',
    bgUrl: dawnbreakCover,
    routerName: 'reform-create',
    visible: true
  },
  { mainTitle: '与我联系', subTitle: '你的意见，我听得见', bgUrl: contactCover, routerName: 'contact', visible: true },
  {
    mainTitle: '试验场',
    subTitle: '探索网站背后所采用的原型技术',
    bgUrl: playgroundCover,
    routerName: 'try-elanchor2',
    visible: true
  }
])
