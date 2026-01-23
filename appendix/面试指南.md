# StelleRainn 个人门户网站

> 面试复习指南（v1.0）
>
> 目录跳转： [首页](#首页) · [简历](#简历) · [作品集](#作品集) · [逐雨之旅](#逐雨之旅) · [蔷薇](#蔷薇) · [改创计划](#改创计划) · [联系我](#联系我) · [开发试验场](#开发试验场) · [公告](#公告)

## 首页

### 导航锚点与滚动容器

#### 实现细节
- 功能描述：在首页左侧以垂直锚点导航的方式引导用户在同页不同板块间快速跳转，并基于自定义滚动容器实现精确定位与视口偏移。
- 技术实现方案：使用 Element Plus 的 `el-anchor`，绑定自定义容器 `containerRef`，通过 `offset` 计算视口高度的 50% 用作定位偏移，并在点击时 `e.preventDefault()` 保持自定义滚动控制。
- 关键代码片段（文件：`src/views/home/HomeIndex.vue`）：

```html
<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const containerRef = ref(null)
const windowHeight = ref(window.innerHeight)
const viewportOffset = computed(() => windowHeight.value * 0.5)

const handleClick = (e) => {
  e.preventDefault() // 阻止默认行为，交由自定义容器控制滚动
}
</script>

<template>
  <div class="home-container-aside">
    <!-- 将 el-anchor 绑定到自定义容器，并设置视口偏移量 -->
    <el-anchor
      :container="containerRef"
      direction="vertical"
      type="default"
      :offset="viewportOffset"
      @click="handleClick"
      :marker="false"
    >
      <el-anchor-link href="#banner1">
        <el-icon size="50"><ArrowDown /></el-icon>
      </el-anchor-link>
      <el-anchor-link href="#banner2">
        <el-icon size="50"><ArrowDown /></el-icon>
      </el-anchor-link>
      <el-anchor-link href="#banner3">
        <el-icon size="50"><ArrowDown /></el-icon>
      </el-anchor-link>
      <el-anchor-link href="#banner4">
        <el-icon size="50"><ArrowDown /></el-icon>
      </el-anchor-link>
    </el-anchor>
  </div>

  <el-main class="home-container-main">
    <!-- 提供自定义滚动容器引用，与锚点配合 -->
    <div class="anchor-ref" ref="containerRef">
      <section id="banner1" class="hero-banner"> ... </section>
      <section id="banner2" class="resume-banner"> ... </section>
      <section id="banner3" class="prime-banner"> ... </section>
      <section id="banner4" class="sub-banner"> ... </section>
    </div>
  </el-main>
</template>

<style scoped lang="scss">
.home-container-main {
  .anchor-ref { // 自定义滚动容器，供 el-anchor 计算定位
    max-height: 100vh;
    overflow-y: auto;
  }
}
</style>
```

- 使用的核心技术点：`Element Plus el-anchor`、自定义滚动容器与偏移、`Vue 3` 组合式 API、计算属性。
- 难点及解决方案：
  - 难点：`el-anchor` 在非 `window` 滚动容器下的定位与点击事件管理。
  - 解决：使用 `ref` 绑定容器并传入 `:container`；用 `:offset` 匹配视口中线；通过 `@click.prevent` 交给自定义滚动逻辑处理。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 头图轮播 Hero Banner

#### 实现细节
- 功能描述：展示作品集的头图轮播，支持自动播放与悬停控制，并通过插槽传递主副标题。
- 技术实现方案：使用 Element Plus `el-carousel` 与动态列表数据 `projectsList`，通过插槽给子组件 `HeroBanner` 注入标题内容。
- 关键代码片段（文件：`src/views/home/HomeIndex.vue`）：

```html
<template>
  <section id="banner1" class="hero-banner">
    <!-- 高度与样式在 scoped 样式中统一设置 -->
    <el-carousel height="750px" :interval="5000" :pause-on-hover="true" arrow="hover">
      <el-carousel-item v-for="project in projectsList" :key="project.id">
        <HeroBanner :projectInfos="project">
          <template #main-title>{{ project.name }}</template>
          <template #sub-title>{{ project.desc }}</template>
        </HeroBanner>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<style scoped lang="scss">
.hero-banner {
  height: 750px;
  // 穿透自定义指示器样式
  :deep(ul.el-carousel__indicators.el-carousel__indicators--horizontal) {
    bottom: 10px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 30px;
    padding: 5px 20px 10px;
    height: 32px;
    backdrop-filter: blur(1px);
  }
}
</style>
```

- 使用的核心技术点：`el-carousel`、插槽传参、`ref` 列表渲染、样式穿透 `:deep()`。
- 难点及解决方案：指示器样式覆写可能受作用域样式限制，使用 `:deep()` 定位到内部类进行自定义。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 板块网格（Resume/Prime/Sub）

#### 实现细节
- 功能描述：分别展示简历与精选内容板块，`SubBanner` 使用网格布局呈现多个子卡片。
- 技术实现方案：通过独立组件 `ResumeBanner`、`PrimeBanner`、`SubBanner` 组织页面结构；`SubBanner` 外层使用 CSS Grid 控制栅格和间距。
- 关键代码片段（文件：`src/views/home/HomeIndex.vue`）：

```html
<template>
  <section id="banner2" class="resume-banner">
    <ResumeBanner />
  </section>
  <section id="banner3" class="prime-banner">
    <PrimeBanner />
  </section>
  <section id="banner4" class="sub-banner">
    <SubBanner v-for="(item, index) in subBannerList" :key="index" :itemInfo="item">
      <template #main-title>{{ item.mainTitle }}</template>
      <template #sub-title>{{ item.subTitle }}</template>
    </SubBanner>
  </section>
</template>

<style scoped lang="scss">
.sub-banner {
  margin: 10px;
  height: fit-content;
  display: grid; // 网格布局
  grid-template-columns: repeat(2, 1fr); // 两列等分
  row-gap: 10px;
  column-gap: 10px;
}
</style>
```

- 使用的核心技术点：组件化插槽、CSS Grid、`ref` 列表。
- 难点及解决方案：在响应式宽度下保持卡片间距与等分，使用 `repeat(2, 1fr)` 与 `gap` 保持一致性。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 首页子组件

#### HeroBanner 组件
- 功能描述：横幅卡片以“背景层 + 内容层”分层展示，支持插槽传主副标题；点击跳转至项目详情，支持外链访问确认。
- 技术实现方案：通过 `props.projectInfos` 传入 `bgUrl/routerName/onlineUrl/textTheme`；内容层提供按钮，外链采用 `ElMessageBox.confirm` 与 `ElMessage` 提示。
- 关键代码片段（文件：`src/views/home/components/HeroBanner.vue`）：

```html
<script setup>
import router from '@/router'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({ projectInfos: Object })
const onGettingDetail = () => router.push({ name: props.projectInfos.routerName })
const onExperienceOnline = (e) => {
  e.stopPropagation()
  if (props.projectInfos.onlineUrl) {
    ElMessageBox.confirm('即将打开外部链接，是否继续？', '在线访问项目', { confirmButtonText: '是', cancelButtonText: '取消', type: 'primary' })
      .then(() => { location.href = props.projectInfos.onlineUrl })
      .catch(() => { ElMessage({ type: 'info', message: '跳转取消' }) })
  } else {
    ElMessage({ type: 'warning', message: '发生错误，请联系作者恢复' })
  }
}
</script>
<template>
  <div class="main-container">
    <div class="background-layer" :style="{ backgroundImage: props.projectInfos.bgUrl ? `url(${props.projectInfos.bgUrl})` : 'none' }"></div>
    <div class="content-layer" @click="onGettingDetail">
      <h1><slot name="main-title" /></h1>
      <h3><slot name="sub-title" /></h3>
      <div class="button-group">
        <el-button type="primary" round size="large">进一步了解</el-button>
        <el-button round plain size="large" @click="onExperienceOnline($event)">在线体验</el-button>
      </div>
    </div>
  </div>
</template>
```

- 使用的核心技术点：插槽、样式绑定、路由导航、`ElMessageBox/ElMessage`、事件冒泡控制。
- 难点及解决方案：在背景较复杂时保证文本可读性，内容层添加半透明遮罩；外链跳转采用确认弹框与阻止冒泡，避免误触。

#### ResumeBanner 组件
- 功能描述：彩色流光背景与粒子效果，进入视口后逐步动画显示“简/历/Résumé/查看简历”。
- 技术实现方案：`IntersectionObserver` 监听组件进入视口并设置 `isVisible`，绑定样式类触发多段 CSS 动画；点击跳转到简历页。
- 关键代码片段（文件：`src/views/home/components/ResumeBanner.vue`）：

```html
<script setup>
import router from '@/router'
import { ref, computed, onMounted } from 'vue'
const windowWidth = ref(window.innerWidth)
const isVisible = ref(false)
const containerRef = ref(null)
const viewportWidthPx50P = computed(() => `${windowWidth.value * 0.5}px`)
onMounted(() => {
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { isVisible.value = true; observer.disconnect() } }, { threshold: 0.5 })
  if (containerRef.value) observer.observe(containerRef.value)
})
const onVisiting = () => router.push({ name: 'resume' })
</script>
<template>
  <div ref="containerRef" class="main-container" @click="onVisiting">
    <div class="background-layer"></div>
    <div class="content-layer">
      <div class="left-font" :class="{ animate: isVisible }">简</div>
      <div class="flash-line" :class="{ animate: isVisible }"></div>
      <div class="right-font" :class="{ animate: isVisible }">历</div>
      <div class="main-title" :class="{ animate: isVisible }">Résumé</div>
      <div class="button-group" :class="{ animate: isVisible }"><el-button round size="large" type="primary">查看简历</el-button></div>
    </div>
  </div>
</template>
```

- 使用的核心技术点：`IntersectionObserver`、多关键帧动画、点击路由跳转。
- 难点及解决方案：避免重复监听与性能问题，进入视口后立即 `disconnect()`；动画使用 `cubic-bezier` 统一节奏。

#### PrimeBanner 组件
- 功能描述：视频背景 + 半透明遮罩 + 标题与副标题淡入，底部文字带“浮动”动画，点击进入“逐雨之旅”。
- 技术实现方案：HTML5 视频 `autoplay/loop/muted/playsinline`，加载完成后标记状态；遮罩层控制亮度；内容层居中排版与淡入动画。
- 关键代码片段（文件：`src/views/home/components/PrimeBanner.vue`）：

```html
<template>
  <div class="main-container" @click="onVisiting">
    <div class="background-layer">
      <video autoplay loop muted preload="auto" playsinline class="background-video">
        <source src="@/assets/videos/ChasingRain-released.mp4" type="video/mp4" />
      </video>
      <div class="video-overlay"></div>
    </div>
    <div class="content-layer">
      <div class="banner-content">
        <h1 class="main-title">逐雨之旅</h1>
        <p class="subtitle">于雨中阖眼，于雨中浮沉。</p>
        <div class="bottom-titles"><p>走</p><p>/</p><p>进</p><p>/</p><p>雨</p><p>/</p><p>中</p></div>
      </div>
    </div>
  </div>
</template>
```

- 使用的核心技术点：视频背景、遮罩层、文字淡入与浮动动画、路由跳转。
- 难点及解决方案：视频在移动端自动播放限制，设置 `muted + playsinline`；叠加遮罩保证文字可读性。

#### SubBanner 组件
- 功能描述：展示子模块入口卡片，悬停时背景放大与文字上浮；点击进入对应路由或提示“开发中”。
- 技术实现方案：`ref` 引用容器，使用鼠标事件切换类名以驱动 CSS 过渡；根据 `itemInfo.visible/routerName` 决定路由跳转或 `ElMessageBox.alert`。
- 关键代码片段（文件：`src/views/home/components/SubBanner.vue`）：

```html
<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import router from '@/router'
const props = defineProps({ itemInfo: Object })
const mainContainerRef = ref()
const handleClick = () => { if (props.itemInfo.visible) router.push({ name: props.itemInfo.routerName }); else ElMessageBox.alert('本模块仍在开发中', '提示', { confirmButtonText: '好' }) }
const onMouseEnter = () => { mainContainerRef.value?.querySelector('.background-layer').classList.add('scaler'); mainContainerRef.value?.querySelector('.text-group').classList.add('floater') }
const onMouseLeave = () => { mainContainerRef.value?.querySelector('.background-layer').classList.remove('scaler'); mainContainerRef.value?.querySelector('.text-group').classList.remove('floater') }
</script>
<template>
  <div class="prevent-overflow">
    <div class="main-container" ref="mainContainerRef" @click.stop="handleClick" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <div class="background-layer" :style="{ backgroundImage: props.itemInfo.bgUrl ? `url(${props.itemInfo.bgUrl})` : `none` }"></div>
      <div class="content-layer"><div class="text-group"><div class="main-title"><slot name="main-title"/></div><div class="sub-title"><slot name="sub-title"/></div></div></div>
    </div>
  </div>
  <!-- 悬停效果类：.scaler / .floater -->
</template>
```

- 使用的核心技术点：DOM 类切换、CSS 过渡、路由跳转与弹框提示。
- 难点及解决方案：避免边框盒模型导致图标缩小，图标使用外边距而非内边距；悬停效果通过 `transition` 保持顺滑。

---

## 简历

### 个人信息展示（Avatar 与栅格）

#### 实现细节
- 功能描述：展示个人头像与基本信息，采用左右分栏布局并提供视觉分隔线。
- 技术实现方案：使用 Element Plus 的 `el-row`/`el-col` 实现栅格布局；头像使用 `el-avatar`。
- 关键代码片段（文件：`src/views/resume/ResumeIndex.vue`）：

```html
<template>
  <div class="personal-info">
    <el-row>
      <el-col :span="8">
        <div class="avatar-area">
          <el-avatar :size="320" :src="avatar" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="details-area">
          <h3>徐友友</h3>
          <h5>软件工程系，前端开发</h5>
          <p>男，21岁 (2004)</p>
          <p>广东省，广州市 / 广东省，深圳市</p>
          <p>就读于<strong>广东外语外贸大学</strong>，软件工程学士学位</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.personal-info {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
  .el-col:first-child { // 左侧列添加分隔线
    border-right: 1px solid #b7acac;
    justify-content: center;
  }
}
</style>
```

- 使用的核心技术点：`el-row/el-col` 栅格、`el-avatar` 组件、作用域样式。
- 难点及解决方案：在模块化样式下实现跨列视觉分隔，使用伪选择器 `.el-col:first-child` 与内边距调整。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 技能列表（动态渲染）

#### 实现细节
- 功能描述：以列表形式展示技能类别及技能项，支持动态数据源映射。
- 技术实现方案：从 `staticData/resume` 导入 `skillsList`，使用 `v-for` 渲染名称与内容。
- 关键代码片段（文件：`src/views/resume/ResumeIndex.vue`）：

```html
<template>
  <div class="skills">
    <el-row>
      <el-col :span="8"><div class="title">技能/证书</div></el-col>
      <el-col :span="16">
        <div class="skills-list">
          <ul>
            <li v-for="skill in skillsList" :key="skill.name">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-contents">{{ skill.contents.join(', ') }}</div>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
```

- 使用的核心技术点：`v-for` 列表渲染、数据分层（静态数据与视图分离）。
- 难点及解决方案：内容结构化展示与排版统一，使用固定高度与边框圆角保证视觉一致性。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 项目经历（组件化卡片）

#### 实现细节
- 功能描述：以多卡片形式展示项目经历，包含标题、描述与详细内容组件。
- 技术实现方案：使用 `ProjectExpSingle` 子组件，外层按列表动态生成。
- 关键代码片段（文件：`src/views/resume/ResumeIndex.vue`）：

```html
<template>
  <div class="projects-experiences">
    <h1>项目经历</h1>
    <div class="projects-list">
      <ProjectExpSingle
        class="projects-list-item"
        v-for="(projectDetail, index) in projectDetails"
        :key="index"
        :projectDetail="projectDetail"
        :projectIndex="index"
      />
    </div>
  </div>
</template>
```

- 使用的核心技术点：组件化抽象、Props 传递、列表渲染。
- 难点及解决方案：在大量卡片中保持一致的间距与阴影表现，使用统一的圆角与 `box-shadow` 模板。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 项目经历子组件：ProjectExpSingle

#### 实现细节
- 功能描述：按序序号交替左右对齐的项目卡片，叠加半透明玻璃效果提升可读性，背景图从 `projectDetail.projectBgUrl` 传入。
- 技术实现方案：`props` 接收 `projectDetail/projectIndex`；`computed` 计算奇偶位决定对齐；`::before` 做遮罩；样式中使用 `v-bind('projectDetail.shadowColor')` 动态阴影色。
- 关键代码片段（文件：`src/views/resume/components/ProjectExpSingle.vue`）：

```html
<script setup>
import { computed } from 'vue'
const props = defineProps({ projectDetail: Object, projectIndex: Number || String })
const isLeft = computed(() => props.projectIndex % 2 === 0)
</script>
<template>
  <div class="main-container" :class="{ isRight: !isLeft }">
    <div class="background-layer" :style="{ backgroundImage: props.projectDetail.projectBgUrl ? `url(${props.projectDetail.projectBgUrl})` : `none` }"></div>
    <div class="content-layer">
      <div class="project-name">{{ props.projectDetail.projectName }}</div>
      <div class="project-desc"><ul><li v-for="desc in props.projectDetail.projectDesc" :key="desc">{{ desc }}</li></ul></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.main-container { box-shadow: 0 0 20px v-bind('projectDetail.shadowColor'); }
.content-layer::before { content: ''; position: absolute; inset: 0; background-color: rgba(222,222,222,.3); z-index: -1; border-radius: 30px; }
.isRight { justify-content: end; }
</style>
```

- 使用的核心技术点：`computed` 方向控制、作用域样式 `v-bind()`、遮罩与玻璃态效果。
- 难点及解决方案：背景图与文字冲突时的可读性，通过固定 Alpha 的遮罩与 `backdrop-filter: blur(10px)` 保证阅读体验；右对齐时注意覆盖定位。

---

## 作品集

### 页头导航卡片（项目入口）

#### 实现细节
- 功能描述：展示项目入口卡片，支持点击跳转到对应的项目详情页（路由子页面）。
- 技术实现方案：从 `staticData/collectionIndex` 导入 `headerContents`，点击 `li` 触发 `router.push({ name })` 进行导航。
- 关键代码片段（文件：`src/views/collection/CollectionIndex.vue`）：

```html
<script setup>
import router from '@/router'
import { headerContents } from '@/staticData/collectionIndex'
</script>

<template>
  <header class="collection-index-header">
    <ul>
      <li v-for="content in headerContents" :key="content.imgUrl" @click="router.push({ name: content.routerName })">
        <img :src="content.imgUrl" />
        <span>{{ content.name }}</span>
      </li>
    </ul>
  </header>
</template>
```

- 使用的核心技术点：路由命名导航、数据驱动渲染。
- 难点及解决方案：确保命名路由与静态数据一致，统一在 `router/index.js` 中维护。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 背景视频滚动驱动缩放（视觉沉浸）

#### 实现细节
- 功能描述：页面滚动驱动视频容器进行宽度收缩与圆角过渡，突出叙事氛围与层次感。
- 技术实现方案：使用 `scrollProgress` 计算滚动比例，`computed` 生成行内样式以控制宽度与圆角。
- 关键代码片段（文件：`src/views/collection/CollectionIndex.vue`）：

```html
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
const SCROLL_RANGE = 400
const SIDE_MARGIN_TARGET = 80
const MAX_SHRINK_PX = SIDE_MARGIN_TARGET * 2
const FINAL_RADIUS = 32

const scrollProgress = ref(0)
const videoStyle = computed(() => {
  const p = scrollProgress.value
  return {
    width: `calc(100vw - ${p * MAX_SHRINK_PX}px)`,
    height: '100%',
    borderRadius: `${p * FINAL_RADIUS}px`,
    overflow: 'hidden',
    margin: '0 auto',
    position: 'relative'
  }
})

const onScroll = () => {
  const y = window.scrollY || 0
  scrollProgress.value = Math.min(Math.max(y / SCROLL_RANGE, 0), 1)
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>
```

- 使用的核心技术点：`computed` 动态样式、滚动监听、性能优化（`passive: true`）。
- 难点及解决方案：滚动抖动与性能问题，通过被动监听与线性插值降低重排影响。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 作品画廊水平滚动与平滑滑动

#### 实现细节
- 功能描述：在宽屏下以横向栅格展示作品卡片，并提供前进/后退按钮实现平滑滚动过渡。
- 技术实现方案：使用 `ref` 获取列表容器，计算滚动边界；自定义 `requestAnimationFrame` 动画控制 `scrollLeft`。
- 关键代码片段（文件：`src/views/collection/CollectionIndex.vue`）：

```html
<script setup>
import { ref, nextTick } from 'vue'
const galleryListRef = ref(null)
const isAnimating = ref(false)
const canPrev = ref(false)
const canNext = ref(true)
const SCROLL_STEP = 320
const ANIM_DURATION = 450

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const updateLimits = () => {
  const el = galleryListRef.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  const left = el.scrollLeft
  canPrev.value = left > 0
  canNext.value = left < max - 1 // 减1避免浮点误差导致按钮迟迟不禁用
}

const scrollBySmooth = async (el, delta) => {
  if (!el) return
  const startLeft = el.scrollLeft
  const max = el.scrollWidth - el.clientWidth
  const target = Math.max(0, Math.min(startLeft + delta, max))
  const distance = target - startLeft
  if (distance === 0) return
  isAnimating.value = true
  const startTime = performance.now()

  return new Promise((resolve) => {
    const step = (now) => {
      const elapsed = now - startTime
      const t = Math.min(1, elapsed / ANIM_DURATION)
      const eased = easeInOutCubic(t)
      el.scrollLeft = startLeft + distance * eased
      if (t < 1) {
        requestAnimationFrame(step)
      } else {
        isAnimating.value = false
        updateLimits()
        resolve()
      }
    }
    requestAnimationFrame(step)
  })
}

onMounted(async () => {
  await nextTick()
  updateLimits()
})
</script>

<template>
  <div class="gallery">
    <ul ref="galleryListRef" @scroll="updateLimits">
      <li v-for="content in galleryListContents" :key="content.id"> ... </li>
    </ul>
  </div>
  <div class="gallery-control">
    <el-button type="info" circle :icon="ArrowLeftBold" size="large" :disabled="!canPrev || isAnimating" @click="onPrev" />
    <el-button type="info" circle :icon="ArrowRightBold" size="large" :disabled="!canNext || isAnimating" @click="onNext" />
  </div>
</template>
```

- 使用的核心技术点：横向栅格、`scrollLeft` 动画、节流与边界控制。
- 难点及解决方案：动画状态与边界状态同步，采用 `isAnimating` 锁与 `updateLimits` 统一刷新。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

## 通用复用组件

### GeneralHeader（通用导航头部）

#### 实现细节
- 功能描述：站点固定顶部导航，支持主路由与下拉菜单子路由跳转，统一玻璃态背景与风格化 `el-link`。
- 技术实现方案：`useRouter()` 获取路由实例；`navigateTo(path)` 统一跳转；通过 `backdrop-filter` 实现毛玻璃效果，清理 `focus/hover` 默认样式。
- 关键代码片段（文件：`src/components/GeneralHeader.vue`）：

```html
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const navigateTo = (path) => router.push(path)
</script>
<template>
  <header>
    <ul>
      <li><el-link :underline="false" @click="navigateTo('/')">首页</el-link></li>
      <li><el-link :underline="false" @click="navigateTo('/resume')">简历</el-link></li>
      <li>
        <el-dropdown>
          <span class="el-dropdown-link"><el-link :underline="false" @click="navigateTo('/collection')">作品集</el-link></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><el-link :underline="false" @click="navigateTo('/project/bookshelf')">蔷薇丛的小书架</el-link></el-dropdown-item>
              <el-dropdown-item><el-link :underline="false" @click="navigateTo('/project/shopping-mall')">智慧商城</el-link></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </header>
</template>
```

- 使用的核心技术点：命名路由跳转、下拉菜单、玻璃态 UI。
- 难点及解决方案：`el-dropdown` 焦点样式与边框清理，使用 `&:hover/&:focus/&:focus-visible` 清除默认轮廓。

### GeneralGallery（通用横向画廊）

#### 实现细节
- 功能描述：横向网格画廊，提供平滑前进/后退按钮与边界禁用控制。
- 技术实现方案：容器 `ref` 维护滚动状态，`requestAnimationFrame` + 自定义缓动函数控制 `scrollLeft`，滚动事件更新可前进/可后退状态。
- 关键代码片段（文件：`src/components/GeneralGallery.vue`）：

```html
<script setup>
import { ref, onMounted, nextTick } from 'vue'
const galleryContainerRef = ref(null)
const canPrev = ref(false), canNext = ref(true), isAnimating = ref(false)
const SCROLL_STEP = 320, ANIM_DURATION = 450
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const updateLimits = () => { const el = galleryContainerRef.value; if (!el) return; const max = el.scrollWidth - el.clientWidth; const left = el.scrollLeft; canPrev.value = left > 0; canNext.value = left < max - 1 }
const scrollBySmooth = async (el, delta) => { /* 省略：逐帧更新 scrollLeft */ }
onMounted(async () => { await nextTick(); updateLimits() })
</script>
<template>
  <div class="general-gallery">
    <div class="gallery-container" ref="galleryContainerRef" @scroll="updateLimits">
      <ul><li v-for="galleryItem in props.galleryItems" :key="galleryItem"><img :src="galleryItem.imgUrl" /><h3>{{ galleryItem.title }}</h3><p>{{ galleryItem.desc }}</p></li></ul>
    </div>
  </div>
</template>
```

- 使用的核心技术点：横向网格、滚动动画、状态边界控制。
- 难点及解决方案：浮点精度导致按钮禁用延迟，比较最大值时减 1 像素避免误差。

### GeneralIntroduction（通用主题化介绍）

#### 实现细节
- 功能描述：统一的技术/模块介绍组件，支持主题切换与富文本（`v-html`）内容展示。
- 技术实现方案：`themeSettings` 决定主题对象；样式使用 `v-bind('theme.xxx')` 动态绑定；对 `v-html` 内容使用 `:deep()` 穿透样式。
- 关键代码片段（文件：`src/components/GeneralIntroduction.vue`）：

```html
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ introItem: Object, themeSettings: String })
const themeList = ref([{ name: 'LightThemes1', label: 'rgb(255, 0, 34)', strongColor: '#000', normalColor: '#555' }, { name: 'DarkThemes1', label: 'cyan', strongColor: '#fff', normalColor: '#b5b5b5' }])
const theme = ref({})
onMounted(() => { theme.value = props.themeSettings === 'DarkThemes1' ? themeList.value[1] : themeList.value[0] })
</script>
<template>
  <div class="general-introduction">
    <div class="title"><div class="label" v-html="introItem.label"></div><div class="slogan" v-html="introItem.slogan"></div></div>
    <div class="desc" v-html="introItem.desc"></div>
  </div>
</template>
```

- 使用的核心技术点：主题切换、`v-bind()` 动态样式、`v-html` 与样式穿透。
- 难点及解决方案：富文本局部高亮与主题色一致，使用 `:deep(strong)` 指定强调色。

## 项目：蔷薇丛的小书架

### 欢迎区与特性列表滚动

#### 实现细节
- 功能描述：背景图叠加渐变遮罩，中央标题与介绍；特性列表垂直自动滚动，底部向下箭头提示。
- 技术实现方案：欢迎区使用两层结构（背景层+内容层）；特性列表 `ul` 应用 `@keyframes` 实现匀速上滚；`ArrowDown` 图标应用上下浮动动画。
- 关键代码片段（文件：`src/views/projects/Bookshelf.vue`）：

```html
<template>
  <section id="welcome">
    <div class="background-layer"></div>
    <div class="content-layer">
      <div class="intro"><h1 class="main-title">蔷薇丛的小书架</h1><div class="introduction">从组合式API到Pinia持久化，广泛实践Vue 3基础</div></div>
      <div class="featureList"><ul><li v-for="feature in featureList" :key="feature">{{ feature }}</li></ul></div>
      <div class="check-next"><el-icon><ArrowDown /></el-icon></div>
    </div>
  </section>
</template>
<style scoped lang="scss">
#welcome .background-layer { background: url('@/assets/images/bookshelf/vueBg.jpg') no-repeat bottom right/cover; }
#welcome .content-layer::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(#000, .9), rgba(#111, .2)); z-index: -1 }
.featureList ul { animation: scroll 14s linear 0s infinite normal backwards; }
@keyframes scroll { to { transform: translateY(calc(-1 * 40px * 10)); } }
.check-next .el-icon { animation: floatUpsideDown 1s linear 0s infinite alternate }
@keyframes floatUpsideDown { to { transform: translateY(-10px) } }
</style>
```

### 重点一览（GeneralGallery）

#### 实现细节
- 技术实现方案：复用 `GeneralGallery`，传入 `highlights` 列表，标题通过具名插槽。
- 关键代码片段（文件：`src/views/projects/Bookshelf.vue`）：

```html
<section id="highlights">
  <GeneralGallery :galleryItems="highlights" textColor="#fff">
    <template #galleryTitle>重点一览</template>
  </GeneralGallery>
</section>
```

### 技术介绍（GeneralIntroduction）

#### 实现细节
- 技术实现方案：遍历 `introItemList`，按主题 `DarkThemes1` 进行展示。
- 关键代码片段（文件：`src/views/projects/Bookshelf.vue`）：

```html
<div class="tech-introduction">
  <section v-for="introItem in introItemList" :key="introItem" :id="introItem.id">
    <GeneralIntroduction :introItem="introItem" themeSettings="DarkThemes1" />
  </section>
</div>
```

## 项目：智慧商城

### 欢迎区与特性列表滚动

#### 实现细节
- 功能描述：居右设备图背景与中央标题，特性列表垂直滚动；底部箭头提示继续阅读。
- 技术实现方案：背景层设置设备图；特性列表滚动速度与条数依据数据项配置；遮罩渐变与文字阴影保证可读性。
- 关键代码片段（文件：`src/views/projects/ShoppingMall.vue`）：

```html
<template>
  <section id="welcome">
    <div class="background-layer"></div>
    <div class="content-layer">
      <div class="intro"><h1 class="main-title">智慧商城</h1><div class="introduction">基于 SPA 设计，广泛实践 Vue 2 基础</div></div>
      <div class="featureList"><ul><li v-for="feature in featureList" :key="feature">{{ feature }}</li></ul></div>
      <div class="check-next"><el-icon><ArrowDown /></el-icon></div>
    </div>
  </section>
</template>
<style scoped lang="scss">
#welcome .background-layer { background: url('@/assets/images/shoppingMall/ipadpro.png') no-repeat center right/cover; }
.featureList ul { animation: scroll 10s linear 0s infinite normal backwards; }
@keyframes scroll { to { transform: translateY(calc(-1 * 40px * 8)); } }
</style>
```

### 重点一览与技术介绍

#### 实现细节
- 技术实现方案：复用 `GeneralGallery`（黑色文字主题）与 `GeneralIntroduction`（`LightThemes1`）。
- 关键代码片段（文件：`src/views/projects/ShoppingMall.vue`）：

```html
<section id="highlights">
  <GeneralGallery :galleryItems="highlights" textColor="#000">
    <template #galleryTitle>重点一览</template>
  </GeneralGallery>
</section>
<div class="tech-introduction">
  <section v-for="introItem in introItemList" :key="introItem" :id="introItem.id">
    <GeneralIntroduction :introItem="introItem" themeSettings="LightThemes1" />
  </section>
</div>
```

---

## 逐雨之旅

### 雨滴场景生成（沉浸式背景）

#### 实现细节
- 功能描述：通过随机化的雨滴元素与下落动画构建沉浸式雨幕效果。
- 技术实现方案：初始化 100 个雨滴对象，随机 `left/width/height/opacity/animationDuration/animationDelay`，由 CSS `@keyframes` 控制统一下落。
- 关键代码片段（文件：`src/views/chasingRain/ChasingRain.vue`）：

```html
<script setup>
import { ref, onMounted } from 'vue'

const rainDrops = ref([])
const generateRainDrops = () => {
  for (let id = 0; id < 100; id++) {
    rainDrops.value.push({
      id,
      style: {
        left: Math.random() * 100 + '%',
        width: Math.random() * 1 + 1 + 'px',
        height: Math.random() * 15 + 5 + 'px',
        opacity: Math.random() / 2,
        animationDuration: Math.random() * 1 + 1 + 's',
        animationDelay: Math.random() * 2 + 's'
      }
    })
  }
}

onMounted(() => generateRainDrops())
</script>

<style scoped lang="scss">
@keyframes rainfall {
  to { transform: translateY(100vh); }
}
.rain-drop { animation: rainfall linear infinite forwards; }
</style>
```

- 使用的核心技术点：随机样式生成、CSS 动画、组合式生命周期。
- 难点及解决方案：大量节点的动画性能，采用 `position: fixed` 与简单样式属性，避免复杂重排。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 滚动进度指示器

#### 实现细节
- 功能描述：左侧固定的纵向进度条实时反映滚动进度，增强阅读反馈。
- 技术实现方案：监听 `scroll` 事件，计算 `scrollTop / docHeight` 比例，更新内联样式高度。
- 关键代码片段（文件：`src/views/chasingRain/ChasingRain.vue`）：

```html
<script setup>
import { ref } from 'vue'
const scrollProgress = ref(0)
const handleScroll = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = (scrollTop / docHeight) * 100
}
</script>

<template>
  <div class="progress-indicator">
    <div class="progress-bar" :style="{ height: scrollProgress + '%' }"></div>
  </div>
</template>
```

- 使用的核心技术点：滚动计算、样式绑定。
- 难点及解决方案：滚动监听的资源占用，结合其它动画统一在同一个监听器中处理并使用最小化计算。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

### 滚动出现动画（Scroll Reveal）

#### 实现细节
- 功能描述：板块在进入视口时渐显与上移过渡，增强叙事节奏。
- 技术实现方案：在 `scroll` 中通过 `getBoundingClientRect()` 检测可见性，惰性添加 `revealed` 类触发 CSS 过渡。
- 关键代码片段（文件：`src/views/chasingRain/ChasingRain.vue`）：

```html
<script setup>
import { ref } from 'vue'
const observedElements = ref(new Set())
const checkScrollAnimation = () => {
  const elements = document.querySelectorAll('.scroll-reveal')
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
    if (isVisible && !observedElements.value.has(el)) {
      el.classList.add('revealed') // 首次可视后标记
      observedElements.value.add(el)
    }
  })
}
</script>

<style scoped lang="scss">
.scroll-reveal { opacity: 0; transform: translateY(50px); transition: all .8s cubic-bezier(.25,.46,.45,.94); }
.scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
</style>
```

- 使用的核心技术点：DOM 可视性判断、类切换与过渡动画。
- 难点及解决方案：避免重复处理与闪烁，使用 `Set` 记录已处理元素。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 蔷薇

### 渐变背景与文字（美术占位）

#### 实现细节
- 功能描述：以渐变背景与渐变文字营造主题氛围，目前为占位页面。
- 技术实现方案：通过线性渐变与 `background-clip: text` 实现彩色文字效果。
- 关键代码片段（文件：`src/views/rosa/Rosa.vue`）：

```html
<style scoped lang="scss">
.temp {
  .background-layer { background: linear-gradient(45deg, #81b8ef, #f2cfcf); }
  h1 {
    background: linear-gradient(to right, #ff42a4, #22cfff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
```

- 使用的核心技术点：CSS 渐变、文本裁剪。
- 难点及解决方案：跨浏览器兼容，使用 `-webkit-` 前缀支持 Safari。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 改创计划

### 渐变背景与文字（美术占位）

#### 实现细节
- 功能描述：以渐变背景与渐变文字形成主题页占位，体现项目整体视觉语言一致性。
- 技术实现方案：渐变背景层 + 渐变文字 + 居中排版。
- 关键代码片段（文件：`src/views/reformCreate/ReformCreate.vue`）：

```html
<style scoped lang="scss">
.temp {
  .background-layer { background: linear-gradient(135deg, #4bccef, #f47b2a); }
  h1 {
    background: linear-gradient(to right, #fa6e5c, #038db3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
```

- 使用的核心技术点：CSS 渐变、文本裁剪。
- 难点及解决方案：保持与其它占位页的风格一致，复用渐变语言与排版模板。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 联系我

### GitHub 跳转与邮箱信息

#### 实现细节
- 功能描述：提供 GitHub 主页跳转与邮箱联系方式，支持点击图片触发跳转与悬停动效。
- 技术实现方案：函数式跳转 `location.href` + Element Plus `el-link`；背景与元素悬停过渡统一风格化。
- 关键代码片段（文件：`src/views/contact/Contact.vue`）：

```html
<script setup>
const onVisit = () => {
  location.href = 'https://github.com/StelleRainn' // 跳转至 GitHub 主页
}
</script>

<template>
  <div class="temp">
    <img src="@/assets/images/shoppingMall/github-logo.png" alt="" @click="onVisit" />
    <el-link href="https://github.com/StelleRainn" type="default" underline="never">StelleRainn Rosa Mizukawa</el-link>
    <p>Can also mail to: 3298257615@qq.com or super123keng@gmail.com</p>
  </div>
</template>
```

- 使用的核心技术点：直连跳转、`el-link` 使用、动效统一。
- 难点及解决方案：避免按钮与图片在不同交互下样式不一致，使用统一的过渡与悬停样式。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 开发试验场

### 路由与页面入口（试验集合）

#### 实现细节
- 功能描述：集中维护各项原型与技术试验页（如锚点、连续渐变、逐雨原型等）。
- 技术实现方案：使用路由子路径组织试验页面，按需异步加载以减少首屏体积。
- 关键代码片段（文件：`src/router/index.js`）：

```js
{
  path: '/playground',
  children: [
    { path: 'try-elanchor', component: () => import('@/views/playground/single/TryElAnchor.vue') },
    { path: 'try-elanchor2', name: 'try-elanchor2', component: () => import('@/views/playground/single/TryElAnchor2.vue') },
    { path: 'chasing-rain-beta-1', component: () => import('@/views/playground/single/ChasingRainBeta1.vue') },
    { path: 'chasing-rain-beta-2', component: () => import('@/views/playground/single/ChasingRainBeta2.vue') },
    { path: 'continual-gradient', component: () => import('@/views/playground/single/ContinualGradient.vue') }
  ]
}
```

- 使用的核心技术点：路由懒加载、路由分组管理。
- 难点及解决方案：同类试验的命名规范与导航一致性，通过统一的路由前缀与命名。

#### 锚点组件实验（参考）
- 可参考 [首页-导航锚点与滚动容器](#导航锚点与滚动容器) 的实现，将 `el-anchor` 绑定到试验页的特定容器进行效果验证。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 公告

### 公告列表与样式布局

#### 实现细节
- 功能描述：以时间排序展示网站公告与上线节点说明。
- 技术实现方案：使用简单栅格与段落排版；背景渐变层与大标题强化信息层级。
- 关键代码片段（文件：`src/views/notification/notification.vue`）：

```html
<template>
  <div class="content">
    <h1 style="text-align: center">公告</h1>
    <div class="notifications">
      <p class="notice-time"><strong>2025-11-09 13:50 正式版上线通知：</strong></p>
      <p class="notice-main">Version 1.0.0 正式上线！...</p>
    </div>
    <div class="notifications">
      <p class="notice-time"><strong>2025-10-31 19:20 预上线通知：</strong></p>
      <p class="notice-main">发布 RC版本，除“逐雨之旅”文本内容...</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 100px 30px 0 30px;
  h1 { font-size: 72px; letter-spacing: 3rem; }
  .notifications { padding: 15px 0; }
}
</style>
```

- 使用的核心技术点：信息层级与版式、渐变背景层。
- 难点及解决方案：长文本的可读性，使用适当的行距与分组。

#### 返回顶部
- [返回目录](#stellerainn-个人门户网站)

---

## 备注与实践要点（可用于面试问答）

### 通用技术要点
- 路由懒加载与滚动控制：`router.beforeEach/afterEach` 结合 `ElLoading` 提升路由切换体验（文件：`src/router/index.js`）。
- Vite 别名与自动导入：`vite.config.js` 配置 `alias '@'` 与 `unplugin-auto-import/unplugin-vue-components`，简化 Element Plus 使用（文件：`vite.config.js`）。
- 全局样式与工程化：`main.js` 引入 Element Plus 样式与项目通用样式（文件：`src/main.js`）。
- 状态管理示例：`Pinia` 示例店铺（文件：`src/stores/counter.js`）。

### 参考片段（路由加载动画）

```js
// 文件：src/router/index.js
import { ElLoading } from 'element-plus'
let loadingInstance = null
router.beforeEach((to, from, next) => {
  loadingInstance = ElLoading.service({ fullscreen: true }) // 进入路由时开启全屏 Loading
  next()
})
router.afterEach(() => {
  if (loadingInstance) {
    loadingInstance.close() // 路由完成后关闭 Loading
  }
})
```

---

> 注：文档采用标准 Markdown 语法，所有代码块标注语言类型；标题层级统一为“项目（H1）- 页面（H2）- 板块（H3）- 实现（H4）”。
> 相关资源路径以项目根目录为基准，均可直接在 IDE 中跳转检索。