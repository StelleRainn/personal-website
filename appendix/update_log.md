# 修改日志

## 2026-07-04 作品子项目统一容器化接入

- 合并部署日志体系：删除临时新增的 `appendix/log.md`，后续部署、域名、网关与普通内容更新均简要记录在 `appendix/update_log.md`。
- 扩展统一入口网关：新增 `/rosa-bookshelf/`、`/shopping-mall/`、`/xiaotuxian-pc/`、`/bilibili-imitation/` 四个作品路径，分别代理到同名前端容器。
- 将首页与作品合集中的可在线体验链接改为同源路径，避免从 Vercel 或 GitHub Pages 跳出；公网 IP 与未来域名都可复用同一批链接。
- 更新 `appendix/deployment-standard.md`，补充四个作品子项目的镜像、路径、构建推送、ECS 拉取上线规范。
- 子项目 Docker 构建统一使用 Nginx 托管前端产物；Vue 项目构建阶段使用 npmmirror registry，`shopping-mall` 因旧 Vue2 依赖树在容器内采用 `npm ci --legacy-peer-deps`。
- 补充 ECS 首次接入四个子项目时的 `/opt` 下 `git clone` 命令，后续日常更新仍保持 `git pull`、`docker compose pull`、`docker compose up -d`。

## 2026-07-04 部署标准手册与域名接入规划

- 新增 `appendix/deployment-standard.md`，整理个人网站、ACIR 与后续作品的统一容器化部署规范。
- 部署、域名、网关与容器化相关变更统一记录在 `appendix/update_log.md`。
- 记录已购买域名 `stellerainn.com` 后的第一阶段接入策略：主域名与 `www` 指向 ECS 公网 IP，ACIR 暂继续通过 `/acir/dashboard` 路径访问，子域名入口留到后续再做。
- 将 `deploy/edge-nginx.conf` 的主站 `server_name` 从示例域名更新为 `stellerainn.com www.stellerainn.com _`，保留公网 IP 默认入口。
- 依据阿里云官方文档补充域名实名认证、DNS A 记录、ICP备案、备案号悬挂与 HTTPS 后置处理的操作顺序。

## 2026-07-02 路由滚动复位去动效实验与复盘

- 尝试移除 `src/styles/common.scss` 中挂在 `html` 根节点上的 `scroll-behavior: smooth`，目标是避免普通路由跳转时 Vue Router 的顶部复位被浏览器渲染成可见滚动动画，造成新页面底部内容先露出的“剧透”感。
- 保留 `router/index.js` 中现有的滚动策略：普通路由跳转使用 `{ top: 0, left: 0, behavior: 'auto' }` 立即回到顶部；浏览器前进/后退继续使用 `savedPosition`；非 `/dawnbreak` 的 hash 锚点跳转仍单独使用 `behavior: 'smooth'`。
- 机器验证结果：`./node_modules/.bin/vite build`、定向 ESLint、Prettier check 与 `git diff --check` 通过；本地 `5173` 实测从 `/project/bookshelf` 滚动到 `window.scrollY=10000` 后，通过站内菜单跳转 `/project/shopping-mall`，多次采样均保持 `scrollY=0`，首屏直接展示“智慧商城”顶部内容。
- 人工复测结论：去掉全局 `scroll-behavior: smooth` 后，页面切换时出现更明显的闪帧与不自然的一闪而过画面，整体观感不如保留全局平滑滚动。因此当前保留 `html { scroll-behavior: smooth; }`，将本次尝试作为实验记录。
- 后续方向：优先尝试重构长页面的滚动结构，让作品详情等长内容使用类似首页的内部滚动容器，减少不同路由共用 `window.scrollY` 时的滚动位置污染；必要时再配合路由过渡期间的隐藏式复位。

## 2026-07-02 路由切换过渡与滚动复位

- 参考 ACIR 前端 `/Users/rainn/Projects/a-clock-inside-the-rose/front-end/src/layout/MainLayout.vue` 的 `fade-transform` 实现，在 `App.vue` 中为路由切换接入同款轻量节奏：`opacity 0.3s ease` + `translateY(20px/-20px)`，避免页面切换像硬刷新。
- 为兼容个人站部分多根页面，新增本地 `RoutePageShell` 单根包装层，让 `<transition name="fade-transform" mode="out-in">` 可以继续与 `keep-alive` 配合使用，避免 Vue 的 “non-element root node cannot be animated” 警告。
- 移除 `router/index.js` 中每次导航都会出现的全屏 `ElLoading`，改由 `fade-transform` 动画承接页面切换反馈。
- 优化滚动恢复策略：浏览器原生 `scrollRestoration` 改为 `manual`，Vue Router 对普通跳转回到顶部，对浏览器前进/后退保留 `savedPosition`，对非 `/dawnbreak` hash 继续支持锚点滚动。
- 为首页内部滚动容器增加 `data-route-scroll-container` 标记；窗口滚动交给 Vue Router 的 `scrollBehavior` 处理，`App.vue` 只复位已标记的内部滚动容器，从而保留浏览器前进/后退的 `savedPosition` 空间。
- 验证结果：`./node_modules/.bin/vite build`、定向 ESLint 与 Prettier check 通过；本地 `5173` 实测首页内部滚动至 `scrollTop=1600` 后切简历、再回首页时复位为 `0`；作品集 `windowY=900` 后切简历时新页面 `windowY=0`，且导航过程无 `.el-loading-mask`。

## 2026-07-01 “黎明已至”导航界面样板

- 升级首页 `DawnBreakBanner` 的底部“走向黎明”动效：从逐字浮动改为圆形字徽、旋转光晕、呼吸光线与分段入场动画，避免与 `PrimeBanner` 的“走进雨中”重复。
- 为 `DawnBreakBanner` 接入点击跳转，新增 `/dawnbreak` 路由与 `src/views/dawnbreak/DawnBreak.vue`。
- 新增“黎明已至”样板页：左侧可收纳故事抽屉、章节列表点击切换、主视图全屏展示文字与背景，滚轮/方向键/移动端滑动切换章节，并同步 URL hash：`#main`、`#embers`、`#rose`、`#horizon`。
- 样板页暂用素材库中的 dawn、dawnbreak、rosa、playground 图片作为章节背景，后续可替换为正式故事素材。
- 移动端补充：`/dawnbreak` 在窄屏默认收起抽屉；同时为全站顶部导航增加窄屏横向滚动与不换行保护，避免导航文字竖排压住页面。
- 验证结果：`./node_modules/.bin/vite build`、定向 ESLint、Prettier check 与 `git diff --check` 通过；本地 `5173` 页面实测 Banner 点击进入 `/dawnbreak#main`、滚轮切至 `#embers`、向上回到 `#main`、抽屉收起/展开状态正常，并完成 390px 移动视口截图检查。

## 2026-06-30 首页“黎明已至”Banner

- 在首页 `HeroBanner` 与 `ResumeBanner` 之间新增独立的“黎明已至”大 Banner，背景使用 `src/assets/images/general/dawn-break-banner.png`。
- 新增 `DawnBreakBanner` 组件，采用 dawn 背景图、晨光遮罩、文字淡入和底部“走 / 向 / 黎 / 明”浮动动效，呼应 `PrimeBanner` 的“走进雨中”表达。
- 更新首页 section 与侧边锚点顺序，使新增 Banner 位于第二屏，原 Resume、Prime、Sub Banner 顺延。
- 点击跳转暂未接入；副主题文案当前为临时文案：“长夜将尽，晨光正从地平线醒来。”
- 验证结果：`./node_modules/.bin/vite build`、定向 ESLint、Prettier check 与 `git diff --check` 通过；当前沙箱监听本地端口时返回 `listen EPERM`，因此未能启动 Vite dev server。

## 2026-06-08 云主机多站点入口迁移

- 创建 `appendix/cloud_migration_plan.md`，明确个人网站作为门面、毕业设计作为作品子集的云主机部署方案。
- 为个人网站新增 Docker 多阶段构建与 Nginx 静态托管配置。
- 新增统一入口网关配置，准备通过域名分流个人网站与毕业设计。
- 将毕业设计加入个人网站作品合集，先使用当前公网地址作为在线入口。
- 同步调整毕业设计工程的 Docker 编排，使其前端接入公共入口网络，并收紧数据库与后端的宿主机端口暴露。
- 验证结果：`pnpm build` 通过，定向 ESLint 通过，个人站与毕业设计的 `docker compose config` 均可解析。
- Docker 补充验证：个人站 `nginx.conf` 与统一入口 `deploy/edge-nginx.conf` 均通过容器内 `nginx -t`；`docker compose build personal-website` 成功构建 `linux/amd64` 镜像。
- 容器冒烟验证：临时运行个人站镜像到本机 `18080` 端口，`/home` 与 `/collection` 均返回 `200 OK`，Vue Router history 模式刷新 fallback 正常。
- 构建观察：Docker 构建时 npm registry 下载速度较慢，后续可考虑在 Dockerfile 中配置更稳定的 registry 以缩短构建时间。

## 2026-06-15 IP-only 临时入口适配

- 在统一入口 Nginx 中增加 `/acir/` 路径代理，使暂未购买域名时可以通过 `http://39.101.77.156/acir/dashboard` 访问毕业设计。
- 将 `/api/` 与 `/backgrounds/` 临时转发给 ACIR 前端容器，适配 ACIR 当前接口基准路径与 public 背景资源路径。
- 更新个人站作品集中的 ACIR 在线入口，从根路径 `/dashboard` 调整为 `/acir/dashboard`。

## 2026-06-23 ACIR 静态资源代理修复

- 修复 `/acir/assets/*` 被入口网关错误代理为 ACIR `index.html` 的问题。原因是变量形式的 `proxy_pass` 携带尾部 `/` 时，上游 URI 被固定替换为根路径。
- 在 `/acir/` location 中先通过 `rewrite` 移除路径前缀，再使用不携带 URI 的变量 `proxy_pass`，确保 `/acir/assets/app.js` 正确转发为 ACIR 容器内的 `/assets/app.js`。
- 浏览器复检确认公网页面已正常挂载 Vue，页面 DOM 与视觉内容完整，控制台无错误。此前白屏浏览器可能缓存了错误响应但资源文件名没有变化。
- 增加缓存策略：ACIR HTML 路由使用 `no-cache`，带内容哈希的 `/acir/assets/*` 使用一年期 immutable 缓存，避免 HTML 与静态资源采用相同的启发式缓存行为。
