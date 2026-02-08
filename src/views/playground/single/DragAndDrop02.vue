<script setup>
import { ref, useTemplateRef } from 'vue'
let startX = ref(0)
let startY = ref(0)

// 获取 DOM 元素
const box = useTemplateRef('box')

const dragAndDrop = (e) => {
  // clientX 获取 mouseEvent 事件发生时鼠标在视口的【水平坐标】
  // offsetLeft 获取（非截断类型的）DOM 元素的左上角对于 offseParent 的水平像素数
  // offsetParent 即最近的定位元素或 table 与 body（ offsetTop 亦依赖此）
  // 从而 (startX, startY) 获取到了鼠标落下时的定位
  startX.value = e.clientX - box.value.offsetLeft
  startY.value = e.clientY - box.value.offsetTop

  // 将 onmousemove 事件挂载在整个浏览器 DOM 上（即 document）
  // 如果挂载在 .box 上，可能会因为鼠标移动过快而脱离元素，导致事件消失，停止移动
  // 目前方法就能够不断计算并更新 .box 的坐标，让 .box 追着鼠标走
  document.onmousemove = (e) => {
    box.value.style.left = e.clientX - startX.value + 'px'
    box.value.style.top = e.clientY - startY.value + 'px'
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>

<template>
  <div class="box" @mousedown="dragAndDrop" ref="box"></div>
</template>

<style lang="scss" scoped>
.box {
  // 添加 定位 避免无法拖拽
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px 50px;
  background-color: rgba($color: #5aaff8, $alpha: 1);
}
</style>
