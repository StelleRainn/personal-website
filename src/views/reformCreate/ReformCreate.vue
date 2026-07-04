<script setup></script>

<template>
  <div class="temp">
    <h1>崭新的黎明，近在咫尺。</h1>
  </div>
</template>

<style lang="scss" scoped>
.temp {
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #4bccef, #f47b2a);

  h1 {
    // 彩色文字
    background: linear-gradient(to right, #fa6e5c, #038db3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    padding-top: 40vh;
    text-align: center;
    font-size: 64px;
    letter-spacing: 1rem;
    z-index: 1;
  }
}
</style>
