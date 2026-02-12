<script setup>
import { ref, useTemplateRef } from 'vue'
let startX = ref(0)
let startY = ref(0)

// 获取 DOM 元素
const dndArea = useTemplateRef('dndArea')
const dndCircle = useTemplateRef('dndCircle')

const dragAndDrop = (e) => {
  // clientX 获取 mouseEvent 事件发生时鼠标在视口的【水平坐标】
  // offsetLeft 获取（非截断类型的）DOM 元素的左上角对于 offseParent 的水平像素数；offsetParent 即最近的【定位元素】或 table 与 body
  // startX 的公式表明：鼠标在可拖拽 DOM 元素内部的【横坐标】；拖曳后，计算【鼠标水平坐标】减去【横坐标】即可得最新的 left 值（左边框）
  // 垂直方向同理
  startX.value = e.clientX - dndCircle.value.offsetLeft
  startY.value = e.clientY - dndCircle.value.offsetTop

  // 将 onmousemove 事件挂载在整个浏览器 DOM 上（即 document）
  // 如果挂载在 .dndCircle 上，可能会因为鼠标移动过快而脱离元素，导致事件消失，停止移动
  // 目前方法就能够不断计算并更新 .dndCircle 的坐标，让 .dndCircle 追着鼠标走
  document.onmousemove = (e) => {
    let terminalLeft = e.clientX - startX.value
    let terminalTop = e.clientY - startY.value
    let terminalRight = terminalLeft + dndCircle.value.offsetWidth
    let terminalBottom = terminalTop + dndCircle.value.offsetHeight
    let maxDistR = dndArea.value.offsetWidth
    let maxDistB = dndArea.value.offsetHeight

    console.log(
      '落点：左上右下',
      terminalLeft,
      terminalTop,
      terminalRight,
      terminalBottom,
      '最大可移动右边距/底边距',
      maxDistR,
      maxDistB
    )

    dndCircle.value.style.left = terminalLeft + 'px'
    dndCircle.value.style.top = terminalTop + 'px'

    if (terminalLeft <= 0) {
      dndCircle.value.style.left = 0 + 'px'
    }
    if (terminalTop <= 0) {
      dndCircle.value.style.top = 0 + 'px'
    }
    if (terminalRight >= maxDistR) {
      dndCircle.value.style.left = maxDistR - dndCircle.value.offsetWidth + 'px'
    }
    if (terminalBottom >= maxDistB) {
      dndCircle.value.style.top = maxDistB - dndCircle.value.offsetHeight + 'px'
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
</script>

<template>
  <h1 style="margin-top: 100px; text-align: center">通过边界计算与鼠标事件，限制拖拽范围</h1>
  <div class="dndArea" ref="dndArea">
    <div class="dndCircle" @mousedown="dragAndDrop" ref="dndCircle"></div>
  </div>
</template>

<style lang="scss" scoped>
.dndArea {
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid salmon;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
  // transform: translateY(50%);
}

.dndCircle {
  // 添加 定位 避免无法拖拽
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px 50px;
  background-color: rgba($color: #5aaff8, $alpha: 1);
}
</style>
