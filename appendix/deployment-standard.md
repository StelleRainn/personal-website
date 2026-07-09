# Portfolio Deployment Standard

> 日期：2026-07-09
> 适用范围：个人网站、A Clock Inside The Rose，以及后续作为作品集子项目接入的前端或全栈项目。
> 当前主入口：`http://stellerainn.com/`
> 备用公网入口：`http://39.101.77.156/`
> 已备案域名：`stellerainn.com`
> ICP 备案号：`桂ICP备2026014459号`，审核通过日期：2026-07-08

## 1. 总原则

个人网站是作品集的第一入口，子项目是作品集内的可访问作品。部署模型按职责拆分：

- 每个项目仓库负责自己的构建、镜像、运行依赖和项目级文档。
- 统一入口网关负责公网端口、域名、路径分流、HTTPS 和跨项目访问关系。
- ECS 上只让入口网关暴露公网 `80`/`443`，其他容器通过 Docker network 通信。
- 新项目优先以容器接入，不再优先选择 GitHub Pages、Vercel、手动上传静态产物等分散方式。

当前架构：

```text
公网 IP / stellerainn.com
  |
  v
portfolio-gateway (Nginx)
  |-- /                  -> personal-website:80
  |-- /rosa-bookshelf/   -> rosa-bookshelf:80
  |-- /shopping-mall/    -> shopping-mall:80
  |-- /xiaotuxian-pc/    -> xiaotuxian-pc:80
  |-- /bilibili-imitation/ -> bilibili-imitation:80
  |-- /acir/             -> acir-frontend:80
  |-- /api/              -> acir-frontend:80 -> acir-backend:8080
  |-- /backgrounds/      -> acir-frontend:80
```

## 2. 仓库职责

### 2.1 个人网站仓库

路径：

```text
/Users/rainn/Projects/personal-website
```

职责：

- 维护个人总站与作品集入口。
- 维护个人站前端镜像。
- 暂时维护统一入口网关 `portfolio-gateway`。
- 维护主部署文档和公网入口变更记录。

关键文件：

```text
Dockerfile
nginx.conf
docker-compose.yml
deploy/edge-nginx.conf
appendix/cloud_migration_plan.md
appendix/deployment-standard.md
appendix/update_log.md
```

### 2.2 ACIR 仓库

路径：

```text
/Users/rainn/Projects/a-clock-inside-the-rose
```

职责：

- 维护 ACIR 前端、后端、MySQL 的镜像与编排。
- 保持 ACIR 作为独立全栈项目可单独构建、发布和排障。
- 如果修改 ACIR 的 Docker、Nginx、Vite base、后端配置或数据库初始化逻辑，需要同步记录到该仓库的 `appendix/optimization_log.md`。

## 3. 镜像命名规范

统一使用阿里云个人镜像仓库命名空间：

```text
crpi-wwifswyqz8bp8ddb.cn-wulanchabu.personal.cr.aliyuncs.com/stellerainn/<project>:<role-or-version>
```

当前镜像：

```text
stellerainn/personal-website:frontend-latest
stellerainn/rosa-bookshelf:frontend-latest
stellerainn/shopping-mall:frontend-latest
stellerainn/xiaotuxian-pc:frontend-latest
stellerainn/bilibili-imitation:frontend-latest
stellerainn/acir-2026:frontend-latest
stellerainn/acir-2026:backend-latest
```

规则：

- 静态前端也构建为镜像，由 Nginx 托管构建产物。
- 全栈项目至少拆为 frontend、backend、database 或外部托管数据库。
- Node 构建阶段优先使用 `https://registry.npmmirror.com`，降低国内网络下依赖下载失败概率。
- `latest` 可用于个人项目的滚动部署；出现多人协作、回滚要求或正式发布时，补充日期或语义化版本标签。

## 4. Docker 网络规范

公共入口网络：

```bash
docker network create portfolio-public
```

要求：

- `portfolio-gateway`、个人网站前端、各子项目前端加入 `portfolio-public`。
- 后端、数据库默认不加入 `portfolio-public`，除非确有跨项目服务调用需求。
- 项目内部网络由各项目自己维护，例如 ACIR 的前端、后端、MySQL 继续保留项目内部网络。

容器公网端口策略：

- 只有 `portfolio-gateway` 绑定宿主机 `80`，未来再绑定 `443`。
- 子项目容器使用 `expose`，不直接使用宿主机 `ports`。
- 如果临时排障必须开放端口，排障后要恢复为仅内网暴露。

## 5. 当前访问规范

公网 IP 阶段：

```text
http://39.101.77.156/                 -> 个人总站
http://39.101.77.156/rosa-bookshelf/  -> 蔷薇丛的小书架
http://39.101.77.156/shopping-mall/   -> 智慧商城
http://39.101.77.156/xiaotuxian-pc/   -> 小兔鲜儿
http://39.101.77.156/bilibili-imitation/ -> B 站首页复刻
http://39.101.77.156/acir/dashboard   -> ACIR
```

域名接入后的第一阶段：

```text
http://stellerainn.com/               -> 个人总站
http://www.stellerainn.com/           -> 个人总站
http://stellerainn.com/rosa-bookshelf/ -> 蔷薇丛的小书架
http://stellerainn.com/shopping-mall/ -> 智慧商城
http://stellerainn.com/xiaotuxian-pc/ -> 小兔鲜儿
http://stellerainn.com/bilibili-imitation/ -> B 站首页复刻
http://stellerainn.com/acir/dashboard -> ACIR
```

暂不把 `acir.stellerainn.com` 作为第一阶段入口。原因是 ACIR 当前前端按 `VITE_PUBLIC_BASE_URL=/acir/` 构建，路径入口已经验证通过；子域名入口更适合在后续将 ACIR 前端基准路径切回 `/` 后再启用。

## 6. 前端 base path 规范

凡是接入统一网关路径前缀的 Vite/Vue 项目，都必须显式支持 base path：

```text
VITE_PUBLIC_BASE_URL=/project-name/
```

项目要求：

- Vite `base` 读取环境变量。
- Vue Router history base 与构建 base 保持一致。
- 静态资源不能硬编码为根路径，除非入口网关已明确代理该路径。
- 刷新深层路由必须返回项目自身的 `index.html`。

ACIR 当前规则：

```text
VITE_PUBLIC_BASE_URL=/acir/
```

因此 ACIR 的稳定访问路径是 `/acir/dashboard`。

当前子项目路径：

```text
rosa-bookshelf   -> VITE_PUBLIC_BASE_URL=/rosa-bookshelf/
shopping-mall    -> VUE_APP_PUBLIC_BASE_URL=/shopping-mall/
xiaotuxian-pc    -> 纯静态，无构建 base
bilibili-imitation -> 纯静态，无构建 base
```

## 7. 构建、推送、上线流程

### 7.0 代码源与镜像源

当前维护时要同时确认两条链路：

```text
代码链路：本地仓库 -> GitHub -> Gitee 同步 -> ECS git pull
镜像链路：本地 docker compose build -> 阿里云镜像仓库 push -> ECS docker compose pull
```

注意：

- 本机开发仍以 GitHub remote 为主要提交目标。
- ECS 当前实际拉取的是 Gitee 代码源，因此本地推送 GitHub 后，还需要在 Gitee 完成同步。
- ECS 上执行 `git pull` 前，先确认 Gitee 已经同步到本地最新 commit。
- 如果公网页面仍出现旧链接、旧文案或旧 Nginx 路由，优先检查 Gitee 是否同步、ECS 是否拉到最新 commit、对应镜像是否已重新 pull/up。
- 镜像仓库与代码仓库互相独立：代码最新不代表容器镜像最新，镜像最新也不代表 ECS 上的 gateway 配置最新。

### 7.1 本机构建并推送个人网站

```bash
cd /Users/rainn/Projects/personal-website
git status -sb
git push origin main
# 在 Gitee 控制台或镜像仓库同步功能中同步 personal-website
docker compose build personal-website
docker compose push personal-website
```

### 7.2 本机构建并推送 ACIR

```bash
cd /Users/rainn/Projects/a-clock-inside-the-rose
git status -sb
git push origin main
# 如果 ECS 对应项目从 Gitee 拉取，也需要先完成 Gitee 同步
docker compose build
docker compose push
```

### 7.3 本机构建并推送作品子项目

四个前端子项目都使用同一流程：

```bash
cd /Users/rainn/Projects/<project>
git status -sb
git push origin main
docker compose build
docker compose push
```

当前 `<project>` 包括：

```text
rosa-bookshelf
shopping-mall
xiaotuxian-pc
bilibili-imitation
```

### 7.4 ECS 更新单个作品子项目

首次接入时，先在 ECS 放置项目目录：

```bash
cd /opt
git clone https://github.com/StelleRainn/rosa-bookshelf.git
git clone https://github.com/StelleRainn/shopping-mall.git
git clone https://github.com/StelleRainn/xiaotuxian-pc.git
git clone https://github.com/StelleRainn/bilibili-imitation.git
```

日常更新使用统一流程：

```bash
cd /opt/<project>
git remote -v
git pull
docker compose pull
docker compose up -d
```

### 7.5 ECS 更新 ACIR

```bash
cd /opt/a-clock-inside-the-rose
git remote -v
git pull
docker compose pull
docker compose up -d
```

### 7.6 ECS 更新个人网站与入口网关

```bash
cd /opt/personal-website
git remote -v
git pull
docker compose pull personal-website
docker compose up -d
```

如果只改了 `deploy/edge-nginx.conf`，不需要重新拉业务镜像：

```bash
cd /opt/personal-website
git pull
docker compose up -d --force-recreate --no-deps portfolio-gateway
docker exec portfolio-gateway nginx -t
```

## 8. 域名 stellerainn.com 接入步骤

### 8.1 先确认域名实名认证

在阿里云域名控制台确认 `stellerainn.com` 已完成实名认证。若尚未认证，先创建或选择已认证的信息模板，并关联到域名。

如果后续要做 ICP 备案，域名持有人信息需要与备案主体信息一致。实名认证完成或过户后，通常还需要等待实名信息同步到管局系统，再提交备案更稳妥。

### 8.2 DNS 解析记录

在阿里云「云解析 DNS / 公网权威解析」中为 `stellerainn.com` 添加：

```text
记录类型  主机记录  记录值         TTL
A         @         39.101.77.156  600
A         www       39.101.77.156  600
```

说明：

- `@` 表示主域名 `stellerainn.com`。
- `www` 表示 `www.stellerainn.com`。
- 记录值必须使用 ECS 公网 IP，不要使用 `127.0.0.1` 或 Docker 内网 IP。
- DNS 不能指定端口；浏览器访问 HTTP 默认到 `80`，HTTPS 默认到 `443`，端口转发由入口网关负责。

解析验证：

```bash
dig stellerainn.com +short
dig www.stellerainn.com +short
```

返回 `39.101.77.156` 即表示解析方向正确。DNS 生效受 TTL、本地缓存和运营商缓存影响，通常需要等待数分钟。

当前状态：

- `stellerainn.com` 已添加 A 记录，指向 `39.101.77.156`。
- `www.stellerainn.com` 已添加 A 记录，指向 `39.101.77.156`。
- 本机命令与浏览器访问均已验证通过。

### 8.3 网关域名配置

解析完成后，入口网关建议使用：

```nginx
server_name stellerainn.com www.stellerainn.com _;
```

当前 `deploy/edge-nginx.conf` 的主站 `server_name` 已配置为 `stellerainn.com www.stellerainn.com _`。其中 `_` 继续保留为默认站点，因此公网 IP 访问仍会落到个人网站。

本地配置提交并同步到 ECS 后执行：

```bash
cd /opt/personal-website
git remote -v
git pull
docker compose up -d --force-recreate --no-deps portfolio-gateway
docker exec portfolio-gateway nginx -t
```

### 8.4 ICP 备案状态

当前 ECS 位于中国内地节点时，通过域名对外提供网站服务需要完成 ICP 备案。`stellerainn.com` 已于 2026-07-08 通过工信部 ICP 备案审核。

```text
备案/许可证编号：桂ICP备2026014459号
审核通过日期：2026-07-08
```

个人站首页底部需要展示该备案号，并链接到工信部备案查询网站：

```text
https://beian.miit.gov.cn/
```

历史备案路径：

```text
域名实名认证
  -> 确认 ECS 满足备案条件
  -> 阿里云 ICP 备案控制台提交主体与网站信息
  -> 阿里云初审
  -> 工信部短信核验
  -> 管局审核
  -> 备案成功后网站底部悬挂 ICP 备案号
  -> 30 日内完成公安联网备案并补充公安备案号
```

个人网站备案时，站点定位建议保持简单：

```text
网站类型：个人非经营性网站
网站用途：个人主页、作品集、学习与项目展示
```

不要把它描述成商业服务、在线交易、论坛社区、新闻媒体或需要前置审批的业务。

### 8.5 后续合规与 HTTPS

ICP备案通过后，后续还有两个事项：

1. 在网站开通后 30 日内完成公安联网备案。
2. 在域名访问稳定后接入 HTTPS。

HTTPS 可选方案：

- Nginx + Certbot：保留当前 gateway，新增证书挂载和 `443` server。
- Caddy：未来将 gateway 替换为 Caddy，自动申请和续期证书。
- 阿里云 SSL/CDN：将 HTTPS 放到阿里云边缘产品，ECS 仍作为源站。

当前阶段推荐推进：

```text
公安联网备案 -> HTTPS 证书接入 -> HTTP 自动跳转 HTTPS
```

## 9. 新项目接入清单

每个新作品接入前，需要确认：

- 项目可以在本机稳定构建 Docker 镜像。
- 镜像已推送到统一阿里云镜像仓库。
- 前端支持部署到 `/project-name/` 路径前缀。
- 项目服务加入 `portfolio-public` 网络。
- 入口网关新增独立 `location /project-name/`。
- 个人网站作品集新增对应入口。
- 项目已有 `appendix` 时，在项目自己的日志记录 Docker 与部署变更。
- 个人网站 `appendix/update_log.md` 记录入口层与统一规范变更。

网关路径示例：

```nginx
location = /project-name {
    return 302 /project-name/;
}

location /project-name/ {
    set $project_upstream http://project-frontend:80;
    rewrite ^/project-name/(.*)$ /$1 break;
    proxy_pass $project_upstream;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

如果项目包含带 hash 的静态资源目录，建议为资源路径单独配置长期缓存，为 HTML 路由配置 `no-cache`。

## 10. 验证命令

本机验证 Docker Compose：

```bash
docker compose config
```

ECS 检查容器：

```bash
docker ps
docker network inspect portfolio-public
```

检查入口网关配置：

```bash
docker exec portfolio-gateway nginx -t
docker exec portfolio-gateway nginx -T | grep -E 'rosa-bookshelf|shopping-mall|xiaotuxian|bilibili|acir'
```

检查个人总站：

```bash
curl -I http://39.101.77.156/
curl -I -H 'Host: stellerainn.com' http://39.101.77.156/
```

检查 ACIR：

```bash
curl -I http://39.101.77.156/acir/dashboard
curl -I http://39.101.77.156/acir/assets/index-vzEoAJm6.js
```

ACIR JS 资源应该返回：

```text
Content-Type: application/javascript
```

如果返回 `text/html`，说明路径代理又把资源请求误转成了 `index.html`，需要优先检查 `deploy/edge-nginx.conf` 中 `/acir/assets/` 的 rewrite 与 proxy_pass。

检查子项目入口：

```bash
curl -I http://39.101.77.156/rosa-bookshelf/
curl -I http://39.101.77.156/shopping-mall/
curl -I http://39.101.77.156/xiaotuxian-pc/
curl -I http://39.101.77.156/bilibili-imitation/
```

如果上述路径返回的仍是个人站 HTML 或作品按钮仍跳旧 URL，按顺序检查：

```text
1. 本地是否已 commit 并 push 到 GitHub
2. Gitee 是否已同步到该 commit
3. ECS 对应目录 git pull 后是否到最新 commit
4. 本地是否已 docker compose build && docker compose push
5. ECS 是否已 docker compose pull && docker compose up -d
6. 入口网关是否已重建并通过 nginx -t
```

## 11. 回滚原则

优先回滚入口网关，不动数据库：

```bash
cd /opt/personal-website
git log --oneline -5
git revert <bad-commit>
docker compose up -d --force-recreate --no-deps portfolio-gateway
```

不要删除 ACIR 的 MySQL 数据卷或数据目录，除非明确要重置云端数据。

如果网关不可用但 ACIR 需要临时恢复，可以在 ACIR compose 中短暂恢复前端宿主机端口映射；排障结束后再收回到统一网关模式。

## 12. 参考资料

- 阿里云云解析 DNS：为网站配置 A 记录将域名指向服务器 IP
  https://help.aliyun.com/zh/dns/pubz-add-website-parsing
- 阿里云云解析 DNS：添加解析记录
  https://help.aliyun.com/zh/dns/pubz-add-parsing-record
- 阿里云网站备案全流程
  https://help.aliyun.com/zh/dws/icp-filing
- 阿里云备案流程 FAQ
  https://help.aliyun.com/zh/icp-filing/basic-icp-service/support/for-the-record-process-faq
- 阿里云网站添加备案号 FAQ
  https://help.aliyun.com/zh/icp-filing/basic-icp-service/support/website-to-add-the-record-number-faq

## 13. 日常维护速查

### 13.1 只改个人站内容或作品链接

本机：

```bash
cd /Users/rainn/Projects/personal-website
git status -sb
git add <changed-files>
git commit -m "<message>"
git push origin main
# 同步 Gitee personal-website
docker compose build personal-website
docker compose push personal-website
```

ECS：

```bash
cd /opt/personal-website
git pull
docker compose pull personal-website
docker compose up -d --force-recreate --no-deps personal-website
```

### 13.2 只改入口网关

本机：

```bash
cd /Users/rainn/Projects/personal-website
git add deploy/edge-nginx.conf appendix/update_log.md
git commit -m "<message>"
git push origin main
# 同步 Gitee personal-website
```

ECS：

```bash
cd /opt/personal-website
git pull
docker compose up -d --force-recreate --no-deps portfolio-gateway
docker exec portfolio-gateway nginx -t
```

### 13.3 只改某个作品子项目

本机：

```bash
cd /Users/rainn/Projects/<project>
git status -sb
git add <changed-files>
git commit -m "<message>"
git push origin main
# 如果 ECS 从 Gitee 拉取该项目，也同步 Gitee
docker compose build
docker compose push
```

ECS：

```bash
cd /opt/<project>
git pull
docker compose pull
docker compose up -d
```

### 13.4 改 ACIR

本机：

```bash
cd /Users/rainn/Projects/a-clock-inside-the-rose
git status -sb
git add <changed-files>
git commit -m "<message>"
git push origin main
# 按 ECS 代码源同步 Gitee
docker compose build
docker compose push
```

ECS：

```bash
cd /opt/a-clock-inside-the-rose
git pull
docker compose pull
docker compose up -d
```
