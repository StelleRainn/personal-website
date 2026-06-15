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
