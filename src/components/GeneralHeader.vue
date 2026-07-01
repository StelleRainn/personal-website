<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <header>
    <ul>
      <li><el-link :underline="false" @click="navigateTo('/')">首页</el-link></li>
      <li><el-link :underline="false" @click="navigateTo('/resume')">简历</el-link></li>
      <li>
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-link :underline="false" @click="navigateTo('/collection')">作品集</el-link>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/project/bookshelf')">蔷薇丛的小书架</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/project/shopping-mall')">智慧商城</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/project/xtx')">小兔鲜儿</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/project/werace')">WeRace</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/project/bilibili')">B站首页复刻</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li><el-link :underline="false" @click="navigateTo('/chasing-rain')">逐雨之旅</el-link><span></span></li>
      <li><el-link :underline="false" @click="navigateTo('/rosa')">蔷薇</el-link></li>
      <li><el-link :underline="false" @click="navigateTo('/reform-create')">改创计划</el-link></li>
      <li><el-link :underline="false" @click="navigateTo('/contact')">联系我</el-link></li>
      <li>
        <el-dropdown>
          <span class="el-dropdown-link"> 开发试验场 </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/try-elanchor1')">锚点</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/try-elanchor2')">锚点2</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/chasing-rain-beta-1')">逐雨</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/chasing-rain-beta-2')">逐雨之旅2</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/continual-gradient')">连续渐变</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/drag-and-drop-01')">拖拽 1</el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-link :underline="false" @click="navigateTo('/playground/drag-and-drop-02')">拖拽 2</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li><el-link :underline="false" @click="navigateTo('/notification')">公告</el-link></li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
header {
  // 内容样式
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  // 毛玻璃背景效果
  background: rgba(0, 0, 0, 0.5); // 半透明深色背景
  backdrop-filter: blur(10px) saturate(180%); // 关键：背景模糊和饱和度
  -webkit-backdrop-filter: blur(20px) saturate(180%); // Safari兼容
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  ul {
    height: 100%;
    width: 56%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      padding: 0 8px;
      display: flex;
      flex-direction: column;
      align-items: center;

      // 覆盖原 el-link 样式
      .el-link {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
        letter-spacing: 0.3rem;
      }

      .el-dropdown-link {
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
        font-size: 13px;
        letter-spacing: 0.3rem;
        outline: none !important;
        border: none !important;

        // 移除默认样式（会加边框）
        &:hover {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }

        &:focus {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }

        &:focus-visible {
          outline: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    }
  }
}

@media (max-width: 760px) {
  header {
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: hidden;

    ul {
      width: max-content;
      min-width: 100%;
      justify-content: flex-start;

      li {
        flex: 0 0 auto;

        .el-link,
        .el-dropdown-link {
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
