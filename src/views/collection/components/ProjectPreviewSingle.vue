<script setup>
import router from '@/router'
import { ArrowRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
  id: [Number, String],
  imgUrl: String,
  routerName: String,
  onlineUrl: String
})

const openOnlineUrl = () => {
  if (props.onlineUrl) {
    ElMessageBox.confirm('即将访问外部链接，是否继续', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '取消',
      type: 'primary'
    })
      .then(() => {
        location.href = props.onlineUrl
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消跳转'
        })
      })
  } else {
    ElMessage({
      type: 'warning',
      message: '发生错误，请联系作者恢复'
    })
  }
}

const onVisit = () => {
  if (props.routerName) {
    router.push({
      name: props.routerName
    })
    return
  }

  openOnlineUrl()
}

const onExperence = () => {
  openOnlineUrl()
}
</script>

<template>
  <div class="main-container">
    <img @click="onVisit" :src="props.imgUrl" />
    <div class="project-name">
      <slot name="project-name">default-name</slot>
    </div>
    <div class="project-desc">
      <slot name="project-desc"> default-desc </slot>
    </div>
    <div class="button-group">
      <el-button type="primary" plain round size="large" @click="onVisit">
        {{ props.routerName ? '了解更多' : '访问作品' }}
        <el-icon><ArrowRight /></el-icon>
      </el-button>
      <el-button type="primary" round size="large" @click="onExperence">在线体验</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  width: 100%;
  padding-top: 30px;
  text-align: center;

  img {
    object-position: center;
    object-fit: cover;
    width: 95%;
    height: 400px;
    box-sizing: border-box;
    border-radius: 30px;
    margin-bottom: 30px;
    background-color: black;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(1.02);
      cursor: pointer;
    }
  }

  .project-name {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .project-desc {
    padding: 0 40px;
    height: 100px;
  }

  .el-button {
    font-family: 'NotoSerifSC';
  }
}
</style>
