<template>
  <div class="main-container full-element">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" src="./DhsApp.ts"></script>

<style scoped lang="less">
.main-container {
  background-color: #14171d;
  color: #ffffff;
}
.message-tips {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
