<template>
  <div class="main-container">
    <button>导入</button>
    <ul>
      <li>规划调整</li>
      <li>空间注册</li>
      <li>导航模式</li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.main-container {
  height: 70px;
  font-size: 18px;
  button {
    border: 0px;
    width: 60px;
    margin: 10px;
    height: 50px;
    border-radius: 4px;
    background: #04856f;
    cursor: pointer;
  }
  ul,
  li {
    display: inline-block;
  }
  ul {
    border: 2px solid #3f3f4b;
  }
  li {
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 200px;
  }
  li:not(:last-child) {
    border-right: 2px solid #3f3f4b;
  }
}
</style>
