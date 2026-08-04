import { ref } from 'vue'

export const notificationHero = ref({
  eyebrow: 'Update Log',
  title: '公告',
  summary: '这里记录个人网站近期的重要更新、体验优化与部署调整。'
})

export const updateLog = ref([
  {
    date: '2026-08-04',
    sections: [
      {
        title: 'HTTPS 接入准备',
        items: [
          '入口网关已完成 443、TLS 与域名 HTTP 自动跳转配置。',
          '新增 Certbot 首次签发和自动续期流程，证书私钥仅保存在 ECS。',
          '公网 IP 继续保留 HTTP 排障入口，各作品路径与 ACIR 共用同一套 HTTPS 路由。'
        ],
        files: [
          'docker-compose.yml',
          'deploy/edge-nginx.conf',
          'deploy/edge-nginx.bootstrap.conf',
          'deploy/portfolio-routes.conf',
          'deploy/certbot/*',
          'appendix/deployment-standard.md',
          'appendix/update_log.md'
        ]
      }
    ]
  },
  {
    date: '2026-07-30',
    sections: [
      {
        title: '公安联网备案正式接入',
        items: [
          '公安联网备案已审核通过，备案号为桂公网安备45012402000043号。',
          '首页底部新增公安备案图标与查询链接，与 ICP 备案信息并列展示。',
          '站点合规备案流程已完成，下一阶段转入 HTTPS 证书接入。'
        ],
        files: [
          'src/views/home/HomeIndex.vue',
          'src/assets/public-security-record.png',
          'appendix/public_security/*',
          'appendix/deployment-standard.md',
          'appendix/update_log.md'
        ]
      }
    ]
  },
  {
    date: '2026-07-09',
    sections: [
      {
        title: '域名与 ICP 备案正式接入',
        items: [
          'stellerainn.com 与 www.stellerainn.com 已通过 A 记录解析到 ECS 公网入口。',
          '工信部 ICP 备案已于 2026-07-08 审核通过，首页底部新增备案号链接。',
          '同步迁移 pnpm 构建脚本授权配置，适配 pnpm 11 的工作区配置读取方式。',
          '后续维护重点转为公安联网备案与 HTTPS 证书接入。'
        ],
        files: [
          'src/views/home/HomeIndex.vue',
          'src/staticData/notification.js',
          'Dockerfile',
          'package.json',
          'pnpm-workspace.yaml',
          'appendix/deployment-standard.md',
          'appendix/update_log.md'
        ]
      }
    ]
  },
  {
    date: '2026-07-04',
    sections: [
      {
        title: '路由滚动体验重构',
        items: [
          '新增路由级长页面滚动外壳，通过 route.meta.scrollShell 选择性启用，避免不同页面之间继承 window.scrollY。',
          '/resume 与五个作品详情页已接入该外壳，页面切换时会自然回到新页面顶部。',
          '/home、/collection、/chasing-rain、/dawnbreak 等已有特殊滚动逻辑的页面保持原状。'
        ],
        files: ['src/App.vue', 'src/router/index.js', 'src/views/resume/ResumeIndex.vue', 'src/views/projects/*']
      },
      {
        title: '页面背景与主题修复',
        items: [
          '修复作品详情页接入滚动外壳后，暗色主题内容区背景只覆盖首屏的问题。',
          '修复 /rosa、/reform-create、/notification、/404 在滚动外壳下渐变背景被浅灰底色盖住的问题。'
        ],
        files: [
          'src/views/projects/*',
          'src/views/rosa/Rosa.vue',
          'src/views/reformCreate/ReformCreate.vue',
          'src/views/notification/notification.vue',
          'src/views/notFound/NotFound.vue'
        ]
      },
      {
        title: '公告页内容维护',
        items: [
          '将 /notification 改造成公告时间线页面，内容与 update_log 的简化版本对齐。',
          '公告页标题、说明与更新条目统一拆入 staticData，后续维护只需要更新数据文件。'
        ],
        files: ['src/views/notification/notification.vue', 'src/staticData/notification.js', 'appendix/update_log.md']
      },
      {
        title: '部署与维护手册整理',
        items: [
          '整理个人网站、ACIR 与作品子项目的统一容器化部署规范。',
          '扩展统一入口网关，新增多个作品路径，并将作品合集中的在线体验链接改为同源路径。',
          '记录 stellerainn.com 的第一阶段接入规划，以及 DNS、备案、HTTPS 等后续处理顺序。'
        ],
        files: [
          'appendix/deployment-standard.md',
          'appendix/update_log.md',
          'deploy/edge-nginx.conf',
          '作品合集相关数据文件'
        ]
      }
    ]
  },
  {
    date: '2026-07-02',
    sections: [
      {
        title: '路由切换动画',
        items: [
          '为站内导航增加轻量淡入与位移动画，降低页面切换的生硬刷新感。',
          '移除原本每次导航都会出现的全屏加载遮罩，改由页面过渡动画承担反馈。'
        ],
        files: ['src/App.vue', 'src/router/index.js']
      },
      {
        title: '滚动复位方案复盘',
        items: [
          '尝试过移除全局平滑滚动，但人工复测发现闪帧更明显，最终保留全局 scroll-behavior: smooth。',
          '后续改为从页面结构上解决问题：让长页面使用内部滚动容器，减少窗口滚动位置污染。'
        ],
        files: ['src/styles/common.scss', 'src/router/index.js']
      }
    ]
  },
  {
    date: '2026-07-01',
    sections: [
      {
        title: '“黎明已至”导航界面样板',
        items: [
          '升级首页 “黎明已至” Banner 的底部动效，加入圆形字徽、旋转光晕与分段入场。',
          '新增 /dawnbreak 页面样板：左侧故事抽屉、章节列表、全屏主视图与章节 hash 同步。',
          '移动端补充抽屉默认收起逻辑，并优化顶部导航在窄屏下的横向滚动表现。'
        ],
        files: [
          'src/views/home/components/DawnBreakBanner.vue',
          'src/views/dawnbreak/DawnBreak.vue',
          'src/router/index.js',
          'src/components/GeneralHeader.vue'
        ]
      }
    ]
  },
  {
    date: '2026-06-30',
    sections: [
      {
        title: '首页“黎明已至”Banner',
        items: [
          '在首页 HeroBanner 与 ResumeBanner 之间新增 “黎明已至” 大 Banner。',
          '更新首页锚点与 section 顺序，使新增 Banner 位于第二屏。'
        ],
        files: [
          'src/views/home/HomeIndex.vue',
          'src/views/home/components/DawnBreakBanner.vue',
          'src/assets/images/general/dawn-break-banner.png'
        ]
      }
    ]
  },
  {
    date: '2026-06-23',
    sections: [
      {
        title: 'ACIR 静态资源代理修复',
        items: [
          '修复 /acir/assets/* 被入口网关错误代理为 ACIR index.html 的问题。',
          '为 ACIR HTML 与带哈希的静态资源区分缓存策略，降低缓存旧资源导致白屏的概率。'
        ],
        files: ['deploy/edge-nginx.conf']
      }
    ]
  },
  {
    date: '2026-06-15',
    sections: [
      {
        title: 'IP-only 临时入口适配',
        items: [
          '在统一入口 Nginx 中增加 /acir/ 路径代理，使暂未启用正式域名时仍可通过公网 IP 访问 ACIR。',
          '将个人站作品集中的 ACIR 在线入口调整为 /acir/dashboard。'
        ],
        files: ['deploy/edge-nginx.conf', '作品合集相关数据文件']
      }
    ]
  },
  {
    date: '2026-06-08',
    sections: [
      {
        title: '云主机多站点入口迁移',
        items: [
          '确立个人网站作为主入口、毕业设计作为作品子集的云主机部署方案。',
          '为个人网站补充 Docker 多阶段构建与 Nginx 静态托管配置，并新增统一入口网关配置。',
          '将毕业设计加入个人网站作品合集，作为可访问的在线项目入口。'
        ],
        files: [
          'Dockerfile',
          'nginx.conf',
          'deploy/edge-nginx.conf',
          'appendix/cloud_migration_plan.md',
          '作品合集相关数据文件'
        ]
      }
    ]
  }
])
