<template>
  <div
    class="flex-col full-element main-container"
    unselectable="on"
    onselectstart="return false;"
  >
    <div class="nav-header">
      <nav-header></nav-header>
    </div>
    <div class="main-area flex-row">
      <div class="viewer-area flex-row">
        <div class="common-tool"></div>
        <div
          class="image-area full-element flex-row"
          style="position: relative; background: black"
        >
          <uibot-med-viewer-control
            :layoutName="layoutName"
            :modelContainer="modelContainer"
          ></uibot-med-viewer-control>
        </div>
      </div>
      <div class="panel-area"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ModelContainer } from 'uih-mcsf-appframework';
import { inject } from 'vue';
import NavHeader from '../components/NavHeader.vue';
const layoutName = 'layout1x1';
const modelContainer: ModelContainer = inject('modelContainer');
console.log(modelContainer);
</script>

<style lang="less" scoped>
.main-container {
  .nav-header {
    height: 70px;
  }
  .main-area {
    flex: 1;

    .viewer-area {
      flex: 1;

      .common-tool {
        order: 0;
      }

      .image-area {
        flex: 1;
        order: 1;
        position: relative;
      }
    }

    .panel-area {
      width: 375px;
      height: 100%;
      display: flex;
      flex-direction: column;

      .panel-info {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
