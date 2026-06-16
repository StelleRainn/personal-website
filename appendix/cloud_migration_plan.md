# 个人网站云主机迁移实施文档

> 日期：2026-06-08  
> 目标：将个人网站迁移到阿里云主机作为第一入口，同时保留毕业设计 A Clock Inside The Rose 的可访问性。

## 1. 定位与目标

个人网站继续作为公开门面与作品集门户，毕业设计作为作品集中的一个重点全栈子作品存在。部署层采用一个公网入口统一接管 HTTP/HTTPS 流量，再按域名分发到不同容器。

目标访问关系：

```text
portfolio.example.com / www.example.com  -> personal-website
rose.example.com                         -> A Clock Inside The Rose
```

如果暂时没有域名，入口 Nginx 的默认站点会把未匹配的 Host 指向个人网站；毕业设计仍建议通过子域名访问，避免把 Vue history 路由和 API 前缀放到同一个 IP 路径下互相影响。

当前尚未购买域名时，采用临时 IP-only 路径入口：

```text
http://39.101.77.156/                 -> personal-website
http://39.101.77.156/acir/dashboard   -> A Clock Inside The Rose
```

该方案要求毕业设计前端以 `VITE_PUBLIC_BASE_URL=/acir/` 构建。未来购买域名后，建议重新将毕业设计前端构建基准切回 `/`，并使用 `rose.your-domain.cn` 访问。

## 2. 目标架构

```text
公网 80/443
  |
  v
portfolio-gateway (Nginx)
  |-- personal-website:80
  |-- acir-frontend:80
        |-- /api -> acir-backend:8080
                 -> acir-mysql:3306
```

容器网络分为两层：

- `portfolio-public`：公共入口网络，仅让网关看到各前端容器。
- `acir-network`：毕业设计内部网络，仅供 ACIR 前端、后端、MySQL 通信。

## 3. 本次代码改动

### 个人网站

- 新增 `Dockerfile`：使用 Node 构建 Vite 静态产物，再用 Nginx 托管。
- 新增 `.dockerignore`：减少构建上下文。
- 新增 `nginx.conf`：支持 Vue Router history 模式刷新。
- 新增 `docker-compose.yml`：定义个人站容器和统一入口网关。
- 新增 `deploy/edge-nginx.conf`：按域名反向代理到个人网站与毕业设计。
- 更新作品集数据：把毕业设计加入作品合集，作为外部在线作品入口。

### 毕业设计

- 调整 `docker-compose.yml`：移除数据库、后端、前端对宿主机的直接端口映射。
- 将 `acir-frontend` 接入 `portfolio-public`，由统一入口网关代理访问。
- 保留 `acir-network`，确保 `/api` 仍由毕业设计前端 Nginx 转发到后端。

## 4. 云主机部署步骤

### 4.1 首次准备公共网络

```bash
docker network create portfolio-public
```

如果网络已存在，该命令会提示冲突，可忽略。

### 4.2 构建并推送个人网站镜像

在本机个人网站目录执行：

```bash
docker compose build personal-website
docker compose push personal-website
```

如果阿里云镜像仓库尚未创建 `personal-website` 仓库，需要先在控制台创建，或调整 `docker-compose.yml` 中的 `image` 地址。

### 4.3 更新毕业设计服务

在云主机毕业设计目录执行：

```bash
git pull
docker compose pull
docker compose up -d
```

此时毕业设计不再直接占用宿主机 80 端口，而是等待入口网关转发。

### 4.4 启动个人网站与入口网关

在云主机个人网站目录执行：

```bash
git pull
docker compose pull personal-website
docker compose up -d
```

入口网关会监听宿主机 80 端口：

- 默认 Host 进入个人网站。
- `/acir/` 临时进入毕业设计，适用于只有公网 IP、没有域名的阶段。
- `/api/` 临时转发给毕业设计，适配 ACIR 当前 axios baseURL。
- `rose.example.com` 或 `acir.example.com` 进入毕业设计。

上线前需要将 `deploy/edge-nginx.conf` 中的示例域名替换为真实域名。

## 5. 域名与 HTTPS

建议域名规划：

```text
www.your-domain.cn     个人网站
rose.your-domain.cn    毕业设计
```

HTTPS 可以后续通过以下任一方案补齐：

- 在入口 Nginx 外接 Certbot，挂载证书后开启 443 server。
- 将入口网关替换为 Caddy，由 Caddy 自动签发和续期证书。
- 使用阿里云 CDN / 全站加速作为 HTTPS 边缘层，源站仍为 ECS。

## 6. 回滚方案

如果入口网关部署失败，可以临时恢复毕业设计前端的宿主机端口映射：

```yaml
ports:
  - "80:80"
```

然后重启毕业设计服务：

```bash
docker compose up -d
```

个人网站的镜像与配置不会影响 ACIR 数据库持久化目录 `mysql-data/`。不要删除该目录，除非明确希望重置云端数据库。

## 7. 后续优化

- 将 MySQL 密码迁移到 `.env` 或云端密钥管理中。
- 为个人网站增加正式的毕业设计详情页，而不是只作为外部链接。
- 增加 GitHub Actions 或本地脚本，自动执行 build、push、远端 pull/up。
- 在备案和域名稳定后开启 HTTPS。
