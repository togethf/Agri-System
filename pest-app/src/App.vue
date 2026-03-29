<template>
  <view>
    <slot />
  </view>
</template>

<script>
export default {
  onLaunch() {
    console.log('AI 虫情智能问诊 App 启动')
    // 初始化全局状态
    uni.$global = {
      // 存储上传的图片路径
      uploadedImages: [],
      // 存储聊天历史
      chatHistory: []
    }
  },
  onShow() {
    console.log('App 显示')
  },
  onHide() {
    console.log('App 隐藏')
  }
}
</script>

<style lang="scss">
/* 全局样式 */
page {
  background-color: #F5F5F5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

/* 通用工具类 */
.container {
  padding: 20rpx;
}

.card {
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.btn-primary {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: #fff;
  border: none;
  border-radius: 12rpx;
  padding: 24rpx 48rpx;
  font-size: 32rpx;
  font-weight: 600;
}

.btn-primary:active {
  opacity: 0.8;
}
</style>
