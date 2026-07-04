# 修改日志

## 2026-07-04

### 路由滚动体验重构

- 新增路由级长页面滚动外壳，通过 `route.meta.scrollShell` 选择性启用，让长页面滚动停留在页面内部容器中，避免不同页面之间继承 `window.scrollY`。
- `/resume` 与五个作品详情页已接入该外壳，页面切换时会自然回到新页面顶部；`/home`、`/collection`、`/chasing-rain`、`/dawnbreak` 等已有特殊滚动逻辑的页面保持原状。
- 后续普通页面也已接入该外壳，包括 `/rosa`、`/reform-create`、`/contact`、`/notification`、`/404`。
- 改动文件：`src/App.vue`、`src/router/index.js`、`src/views/resume/ResumeIndex.vue`、`src/views/projects/*`

### 页面背景与主题修复

- 修复作品详情页接入滚动外壳后，暗色主题的内容区背景只覆盖首屏的问题；项目页根容器改为随内容高度延展。
- 修复 `/rosa`、`/reform-create`、`/notification`、`/404` 在滚动外壳下渐变背景被浅灰底色盖住的问题；背景改为直接挂在页面根容器上。
- 改动文件：`src/views/projects/*`、`src/views/rosa/Rosa.vue`、`src/views/reformCreate/ReformCreate.vue`、`src/views/notification/notification.vue`、`src/views/notFound/NotFound.vue`

### 公告页内容维护

- 将 `/notification` 改造成公告时间线页面，内容与 `update_log` 的简化版本对齐。
- 公告页标题、说明与更新条目统一拆入 `staticData`，后续维护只需要更新数据文件。
- 改动文件：`src/views/notification/notification.vue`、`src/staticData/notification.js`、`appendix/update_log.md`

### 部署与维护手册整理

- 整理个人网站、ACIR 与作品子项目的统一容器化部署规范，明确本地、GitHub、Gitee、ECS 与阿里云镜像仓库之间的更新链路。
- 扩展统一入口网关，新增 `/rosa-bookshelf/`、`/shopping-mall/`、`/xiaotuxian-pc/`、`/bilibili-imitation/` 四个作品路径；作品合集中的在线体验链接改为同源路径。
- 记录域名 `stellerainn.com` 的第一阶段接入规划，以及 DNS、备案、HTTPS 等后续处理顺序。
- 改动文件：`appendix/deployment-standard.md`、`appendix/update_log.md`、`deploy/edge-nginx.conf`、作品合集相关数据文件

## 2026-07-02

### 路由切换动画

- 参考 ACIR 前端的 `fade-transform` 方案，为站内导航增加轻量淡入与位移动画，降低页面切换的生硬刷新感。
- 移除原本每次导航都会出现的全屏加载遮罩，改由页面过渡动画承担反馈。
- 改动文件：`src/App.vue`、`src/router/index.js`

### 滚动复位方案复盘

- 尝试过移除全局 `html { scroll-behavior: smooth; }` 来避免可见回滚，但人工复测发现闪帧更明显，最终保留全局平滑滚动。
- 后续改为从页面结构上解决问题：让长页面使用内部滚动容器，减少不同路由共用窗口滚动位置带来的污染。
- 改动文件：`src/styles/common.scss`、`src/router/index.js`

## 2026-07-01

### “黎明已至”导航界面样板

- 升级首页 “黎明已至” Banner 的底部动效，从逐字浮动改为更具仪式感的圆形字徽、旋转光晕与分段入场。
- 新增 `/dawnbreak` 页面样板：左侧故事抽屉、章节列表、全屏主视图、滚轮/方向键/触屏切换章节，并同步 URL hash。
- 移动端补充抽屉默认收起逻辑，同时优化顶部导航在窄屏下的横向滚动与不换行表现。
- 改动文件：`src/views/home/components/DawnBreakBanner.vue`、`src/views/dawnbreak/DawnBreak.vue`、`src/router/index.js`、`src/components/GeneralHeader.vue`

## 2026-06-30

### 首页“黎明已至”Banner

- 在首页 `HeroBanner` 与 `ResumeBanner` 之间新增 “黎明已至” 大 Banner，背景使用 `dawn-break-banner`。
- 更新首页锚点与 section 顺序，使新增 Banner 位于第二屏，原简历与其他 Banner 顺延。
- 改动文件：`src/views/home/HomeIndex.vue`、`src/views/home/components/DawnBreakBanner.vue`、`src/assets/images/general/dawn-break-banner.png`

## 2026-06-23

### ACIR 静态资源代理修复

- 修复 `/acir/assets/*` 被入口网关错误代理为 ACIR `index.html` 的问题，确保静态资源按真实路径转发。
- 为 ACIR HTML 与带哈希的静态资源区分缓存策略，降低浏览器缓存旧资源导致白屏的概率。
- 改动文件：`deploy/edge-nginx.conf`

## 2026-06-15

### IP-only 临时入口适配

- 在统一入口 Nginx 中增加 `/acir/` 路径代理，使暂未启用正式域名时仍可通过公网 IP 访问 ACIR。
- 将个人站作品集中的 ACIR 在线入口调整为 `/acir/dashboard`。
- 改动文件：`deploy/edge-nginx.conf`、作品合集相关数据文件

## 2026-06-08

### 云主机多站点入口迁移

- 确立个人网站作为主入口、毕业设计作为作品子集的云主机部署方案。
- 为个人网站补充 Docker 多阶段构建与 Nginx 静态托管配置，并新增统一入口网关配置。
- 将毕业设计加入个人网站作品合集，作为可访问的在线项目入口。
- 改动文件：`Dockerfile`、`nginx.conf`、`deploy/edge-nginx.conf`、`appendix/cloud_migration_plan.md`、作品合集相关数据文件
