<script setup>
import { ref } from 'vue'
const dropCounts = ref(0)
const dropData = ref('')
const drag = (e) => {
  e.dataTransfer.setData('text/plain', 'hello')
}

// const dragover = (e) => e.preventDefault()
const drop = (e) => {
  dropData.value = e.dataTransfer.getData('text')
  dropCounts.value += 1
}
</script>

<template>
  <h1 style="margin-top: 100px; text-align: center">
    最基础的 drag and drop，使用 draggable， dragstart、dragover、drop
  </h1>
  <div class="box">
    <div class="drag" draggable="true" @dragstart="drag">拖我</div>
    <div class="drop" @dragover="(e) => e.preventDefault()" @drop="drop">
      已接受数据 {{ dropData }}, 存放次数: {{ dropCounts }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  padding: 100px 0 0 30px;
}

.drag {
  width: 100px;
  height: 100px;
  background: orange;
  text-align: center;
  line-height: 100px;
  user-select: none;
  cursor: move;
}

.drop {
  width: 300px;
  height: 300px;
  background: lightblue;
  margin-top: 20px;
  text-align: center;
  line-height: 200px;
}
</style>
