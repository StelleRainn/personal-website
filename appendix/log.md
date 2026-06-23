# 修改日志

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
