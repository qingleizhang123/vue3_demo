<template>
  <a-modal
    v-model:visible="importModelVisible"
    title="导入"
    centered
    wrapClassName="upload-modal"
    :closable="true"
    :maskClosable="false"
    cancelText="取消"
    okText="导入"
    @cancel="onCancel"
  >
    <div class="local-import">
      <a-upload-dragger
        v-model:fileList="fileList"
        name="file"
        :directory="true"
        :multiple="true"
        @change="handleChange"
        @drop="handleDrop"
      >
        <p class="ant-upload-drag-icon">
          <img src="assets/images/addfile.svg" alt="icon" />
        </p>
        <p class="ant-upload-text">上传文件夹</p>
        <p class="ant-upload-hint">支持文件夹拖拽导入</p>
      </a-upload-dragger>
    </div>
    <VirtualBar
      ref="uploadBar"
      v-if="showBar"
      :isShowBar="showBar"
      :key="barKey"
      :stroke-height="16"
      :isFinished="isFinished"
      :resCode="resCode"
      :currentNumber="currentNumber"
      :failedNumber="failedNumber"
      :totalNumber="totalNumber"
      :notDicomNumber="notDicomNumber"
      :isShowProgess="isShowProgess"
      @cancelUpload="onCancelUpload"
    ></VirtualBar>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import VirtualBar from './VirtualBar.vue';
const importModelVisible = true;
const showBar = true;
const currentNumber = 100;
const totalNumber = 200;
const successNumber = 200;
const failedNumber = 0;
const notDicomNumber = 0;
const fileList = ref([]);
const handleChange = info => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const handleDrop = e => {
  console.log(e);
};
</script>
<style lang="less" scoped>
:deep(.ant-upload.ant-upload-drag) {
  background-color: #242930;
  border: none;
  .ant-upload-drag-icon > img {
    margin: auto;
  }
  .ant-upload-text,
  .ant-upload-hint {
    color: #9ca4b3;
  }
}
</style>
