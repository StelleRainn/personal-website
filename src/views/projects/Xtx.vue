<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref } from 'vue'

import GeneralGallery from '@/components/GeneralGallery.vue'
import GeneralIntroduction from '@/components/GeneralIntroduction.vue'

import { highlights, featureList, introItemList } from '@/staticData/projects/xtx'

const featureListRef = ref(null)
</script>

<template>
  <div class="main-container">
    <section id="welcome">
      <div class="background-layer"></div>
      <div class="content-layer">
        <div class="intro">
          <h1 class="main-title">小兔鲜儿</h1>
          <div class="introduction">基础不牢，地动山摇 —— 纯 H5C3 实践项目</div>
        </div>
        <div class="featureList" ref="featureListRef">
          <ul>
            <li v-for="feature in featureList" :key="feature">{{ feature }}</li>
          </ul>
        </div>
        <div class="check-next">
          <el-icon><ArrowDown /></el-icon>
        </div>
      </div>
    </section>
    <section id="highlights">
      <GeneralGallery :galleryItems="highlights" textColor="#000">
        <template #galleryTitle>重点一览</template>
      </GeneralGallery>
    </section>
    <div class="tech-introduction">
      <section v-for="introItem in introItemList" :key="introItem" :id="introItem.id">
        <GeneralIntroduction :introItem="introItem" themeSettings="LightThemes1"></GeneralIntroduction>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  width: 100%;
  background: #fff !important;
}
#welcome {
  height: 100vh;
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  color: #fff;

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/images/xtx/macbookpro.jpg') no-repeat bottom right/cover;
    // background: linear-gradient(45deg, #4afbd5, #fbff21);
  }

  .content-layer {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

    .intro {
      padding-top: 150px;
      margin-bottom: 150px;
      text-align: center;

      .main-title {
        font-size: 80px;
        letter-spacing: 1rem;
        margin-bottom: 10px;
      }
    }

    .featureList {
      text-align: center;
      height: 90px; // 展示窗口
      overflow: hidden; // 禁止用户滑动，以免动画展示效果出错

      ul {
        animation: scroll 14s linear 0s infinite normal backwards;
      }

      li {
        font-family: 'NotoSerifItalic';
        font-size: 25px;
        line-height: 40px;
      }
    }

    .check-next {
      position: absolute;
      width: 100%;
      height: fit-content;
      bottom: 20px;
      left: 0;
      font-size: 40px;
      text-align: center;

      .el-icon {
        animation: floatUpsideDown 1s linear 0s infinite alternate;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(135deg, rgba(#000, 1), rgba(#111, 0.1));
    }
  }
}

// highlights 及之后的内容不设置样式，由复用组件内部决定

@keyframes scroll {
  to {
    // 严格与 li 中的行高匹配，数量要与数组中的真数据匹配
    transform: translateY(calc(-1 * 40px * 9));
  }
}

@keyframes floatUpsideDown {
  to {
    transform: translateY(-10px);
  }
}
</style>
