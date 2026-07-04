<script setup>
const onVisit = () => {
  location.href = 'https://github.com/StelleRainn'
}
</script>

<template>
  <div class="temp">
    <img src="@/assets/images/shoppingMall/github-logo.png" alt="" @click="onVisit" />
    <el-link href="https://github.com/StelleRainn" type="default" underline="never">时雨蔷薇 · StelleRainn</el-link>
    <p>Can also mail to: 3298257615@qq.com or super123keng@gmail.com</p>
  </div>
</template>

<style lang="scss" scoped>
.temp {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #81b8ef, #f2cfcf);

  img {
    width: 400px;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 1);
    transition: all 0.3s ease-in-out;
  }

  .el-link {
    margin-top: 20px;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
  }

  img:hover,
  .el-link:hover {
    transform: translateY(-5px);
    cursor: pointer;
  }

  p {
    font-size: 13px;
    margin-top: 10px;
    color: rgba($color: #5e5e5e, $alpha: 1);
  }
}
</style>
