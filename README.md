# StelleRainnRM

个人网站与作品集入口，基于 Vue 3 和 Vite 构建。这里承载个人主页、简历、项目合集、联系入口，以及一些独立专题页面和前端实验内容。

当前站点也是统一作品集网关的一部分：主站作为公开入口，子项目通过路径前缀接入，例如 `/rosa-bookshelf/`、`/shopping-mall/`、`/xiaotuxian-pc/`、`/bilibili-imitation/` 和 `/acir/`。

## 内容结构

- `/home`：主页与作品入口。
- `/resume`：个人简历与项目经历。
- `/collection`：项目合集。
- `/project/*`：各个项目详情页。
- `/rosa`、`/reform-create`、`/dawnbreak`、`/chasing-rain`：个人专题页面。
- `/contact`：联系入口。
- `/playground/*`：实验性质的前端原型页面。

主要内容数据集中放在 `src/staticData/`，页面视图放在 `src/views/`，通用组件放在 `src/components/`。

## 技术栈

- Vue 3 + Vite
- Vue Router
- Pinia
- Element Plus
- SCSS
- Docker + Nginx

## 本地开发

项目使用 pnpm。

```sh
pnpm install
pnpm dev
```

常用脚本：

```sh
pnpm build      # 构建生产静态产物
pnpm preview    # 本地预览生产构建
pnpm lint       # 运行 ESLint 并自动修复
pnpm format     # 格式化 src 目录
```

## 构建与部署

生产构建产物输出到 `dist/`：

```sh
pnpm build
```

容器部署使用多阶段 Dockerfile：先在 Node 环境中构建 Vite 静态资源，再交给 Nginx 托管。

```sh
docker compose build personal-website
docker compose push personal-website
```

统一入口网关配置在 `deploy/edge-nginx.conf`，项目自身的静态站点 Nginx 配置在 `nginx.conf`。更完整的云主机部署约定见：

- `appendix/deployment-standard.md`
- `appendix/cloud_migration_plan.md`

## 备注

- `vite.config.js` 当前使用根路径 `base: '/'`，由外层网关负责把子项目分流到各自容器。
- Vercel 部署保留了 SPA fallback 配置，见 `vercel.json`。
- 修改作品入口或展示文案时，优先检查 `src/staticData/home.js` 和 `src/staticData/collectionIndex.js`。
