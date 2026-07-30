<script setup>
import { ref, computed } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

import HeroBanner from '@/views/home/components/HeroBanner.vue'
import DawnBreakBanner from './components/DawnBreakBanner.vue'
import ResumeBanner from './components/ResumeBanner.vue'
import PrimeBanner from './components/PrimeBanner.vue'
import SubBanner from './components/SubBanner.vue'

import { projectsList, subBannerList } from '@/staticData/home'

const containerRef = ref(null)
// 计算滚动偏移
const windowHeight = ref(window.innerHeight)
const viewportOffset = computed(() => {
  return windowHeight.value * 0.5
})

const handleClick = (e) => {
  e.preventDefault()
}
</script>

<template>
  <el-container class="home-container">
    <div class="home-container-aside">
      <!-- 自定义滚动容器需要添加offset和e.preventDefault -->
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
        <el-anchor-link href="#banner5">
          <el-icon size="50"><ArrowDown /></el-icon>
        </el-anchor-link>
      </el-anchor>
    </div>
    <el-main class="home-container-main">
      <div class="anchor-ref" ref="containerRef" data-route-scroll-container>
        <section id="banner1" class="hero-banner">
          <!-- height 高度要和 hero-banner 一致 -->
          <el-carousel height="750px" :interval="5000" :pause-on-hover="true" arrow="hover">
            <el-carousel-item v-for="project in projectsList" :key="project.id">
              <!-- 父传子：背景图、板块id、标题组 -->
              <HeroBanner :projectInfos="project">
                <template #main-title>{{ project.name }}</template>
                <template #sub-title>{{ project.desc }}</template>
              </HeroBanner>
            </el-carousel-item>
          </el-carousel>
        </section>
        <section id="banner2" class="dawn-break-banner">
          <DawnBreakBanner></DawnBreakBanner>
        </section>
        <section id="banner3" class="resume-banner">
          <ResumeBanner></ResumeBanner>
        </section>
        <section id="banner4" class="prime-banner">
          <PrimeBanner></PrimeBanner>
        </section>
        <section id="banner5" class="sub-banner">
          <SubBanner v-for="(item, index) in subBannerList" :key="index" :itemInfo="item">
            <template #main-title>{{ item.mainTitle }}</template>
            <template #sub-title>{{ item.subTitle }}</template>
          </SubBanner>
        </section>
        <section id="footer">
          <footer class="home-footer">
            <p>Copyright © 2025 - 现在 时雨蔷薇（StelleRainn）. 保留所有权利。</p>
            <div class="filing-links">
              <a class="filing-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                桂ICP备2026014459号
              </a>
              <a
                class="filing-link public-security-link"
                href="https://beian.mps.gov.cn/#/query/webSearch?code=45012402000043"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="@/assets/public-security-record.png" alt="" width="18" height="20" />
                <span>桂公网安备45012402000043号</span>
              </a>
            </div>
          </footer>
        </section>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.home-container-aside {
  z-index: 999;
  position: fixed;
  left: 5px;
  top: 45vh;
  transform: translateY(-50%);

  display: flex;

  .el-anchor {
    background: none;

    .el-anchor__item {
      padding: 10px 0;
      &:nth-child(1) {
        animation: floating 1s linear infinite alternate forwards;
      }
      &:nth-child(2) {
        animation: floating 1s linear 0.4s infinite alternate forwards;
      }
      &:nth-child(3) {
        animation: floating 1s linear 0.6s infinite alternate forwards;
      }
      &:nth-child(4) {
        animation: floating 1s linear 0.8s infinite alternate forwards;
      }
      &:nth-child(5) {
        animation: floating 1s linear 1s infinite alternate forwards;
      }
    }
  }
}

@keyframes floating {
  to {
    transform: translateY(10px);
  }
}

.home-container-main {
  padding: 0;

  .anchor-ref {
    max-height: 100vh;
    overflow-y: auto; // 滚动条
  }

  .hero-banner {
    height: 750px;

    :deep(ul.el-carousel__indicators.el-carousel__indicators--horizontal) {
      bottom: 10px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 30px;
      padding: 5px 20px 10px;
      height: 32px;
      backdrop-filter: blur(1px);
    }
  }

  .resume-banner {
    margin-top: 10px;
    height: 700px;
  }

  .dawn-break-banner {
    margin-top: 10px;
    height: 700px;
  }

  .prime-banner {
    margin-top: 10px;
    height: 700px;
  }

  .sub-banner {
    margin: 10px;
    height: fit-content; // 子组件有确定的高度
    display: grid; // 首次使用网格布局
    grid-template-columns: repeat(2, 1fr); // 相当于 1fr 1fr，即存在两份网格元素，且按1:1平分剩余空间
    row-gap: 10px; // gutter 间隙控制
    column-gap: 10px;
  }

  .home-footer {
    min-height: 100px;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    text-align: center;
    line-height: 1.6;
    color: #606266;

    p {
      margin: 0;
    }

    .filing-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px 16px;
    }

    .filing-link {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;

      &:hover {
        color: #409eff;
      }
    }

    .public-security-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      img {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
