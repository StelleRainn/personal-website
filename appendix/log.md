# 修改日志

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
