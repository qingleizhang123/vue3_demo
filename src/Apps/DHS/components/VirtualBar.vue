<template>
  <a-modal
    v-model:visible="isShowBar"
    centered
    wrapClassName="upload-bar-ant-modal"
    :title="null"
    :closable="false"
    :footer="null"
  >
    <div class="progress-bar">
      <div class="progress-bar-title">
        <span v-if="percentage < 100">
          数据正在导入({{ currentNumber }}/{{ totalNumber }})
        </span>
        <span v-else-if="failedNumber > 0">
          数据上传完成,成功{{
            totalNumber - failedNumber - notDicomNumber
          }},失败{{ failedNumber }},非医学影像文件{{ notDicomNumber }}未上传
        </span>
        <span v-else>患者数据上传完成</span>
      </div>
      <div class="progress-bar-outer">
        <div class="progress-bar-inner" :style="barWidth"></div>
      </div>
    </div>
    <div class="dialog-footer">
      <a-button type="primary" v-if="percentage < 100" @click="oncancel">
        取消
      </a-button>
      <a-button v-else @click="oncancel">关闭</a-button>
    </div>
    <div class="line">
      <div class="line-start" />
      <div class="line-middle" />
      <div class="line-end" />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
const props = defineProps<{
  isShowBar: boolean;
  resCode: string;
  currentNumber: number;
  failedNumber: number;
  totalNumber: number;
  notDicomNumber: number;
}>();
const isShowBar = ref(props.isShowBar).value;
const percentage = 99;
</script>

<style lang="less" scope>
.upload-bar-ant-modal {
  background: rgba(0, 0, 0, 0.8);
  .ant-modal-content {
    border: 1px solid transparent;
    border-image: linear-gradient(to right, #252a33, 100%, #252a33, 80%);
    background: rgba(48, 54, 64, 0.8);
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    width: 552px !important;
    height: 227px !important;
  }
  .ant-modal {
    .ant-modal-body {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      padding: 0;
      height: 100%;
    }
    .dialog-footer {
      height: 114px;
      position: relative;
      font-weight: bold;
    }
    .ant-btn {
      background: #434b59;
      border-radius: 4px;
      color: #ffffff;
      width: 180px;
      height: 50px;
      position: absolute;
      bottom: 35px;
      left: 186px;
      span {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
      }
    }
    .line {
      height: 2px;
      position: absolute;
      top: 111px;
      width: 100%;
      .line-start {
        display: inline-block;
        width: 80px;
        height: 2px;
        position: absolute;
        top: 0;
        left: 0;
        background-image: linear-gradient(
          to right,
          rgba(36, 41, 48, 0),
          rgba(36, 41, 48, 1)
        );
      }
      .line-middle {
        background-color: rgba(36, 41, 48, 1);
        display: inline-block;
        width: 392px;
        height: 2px;
        position: absolute;
        top: 0;
        left: 80px;
      }
      .line-end {
        display: inline-block;
        width: 80px;
        height: 2px;
        position: absolute;
        top: 0;
        right: 0px;
        background-image: linear-gradient(
          to right,
          rgba(36, 41, 48, 1),
          rgba(36, 41, 48, 0)
        );
      }
    }
  }
}
.progress-bar {
  text-align: center;
  padding-top: 32px;
  height: 111px;
  .progress-bar-outer {
    height: 10px;
    width: 392px;
    border-radius: 8px;
    background-color: #434b59;
    display: inline-block;
    margin-top: 12px;
    .progress-bar-inner {
      border-radius: 8px;
      height: 100%;
      transition: width 0.6s ease;
      text-align: right;
      line-height: 80%;
      background-image: linear-gradient(
        90deg,
        rgba(105, 216, 198, 0) 0%,
        #69d8c6 100%
      );
    }
  }
  .progress-bar-title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #ffffff;
    font-weight: 800;
    letter-spacing: 0px;
  }
}
</style>
