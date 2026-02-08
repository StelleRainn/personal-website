<script setup></script>

<template>
  <GeneralHeader></GeneralHeader>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped lang="scss"></style>
