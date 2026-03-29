<template>
  <view class="camera-container">
    <!-- 顶部标题区 -->
    <view class="header-section">
      <view class="header-icon">📸</view>
      <text class="header-title">拍照识别</text>
      <text class="header-subtitle">拍摄或选择图片，AI 自动识别虫害/病害</text>
    </view>

    <!-- 操作按钮区域 -->
    <view class="action-section">
      <view class="action-btn primary" @click="handleTakePhoto">
        <view class="btn-content">
          <view class="btn-icon-wrapper">
            <view class="icon-bg">📷</view>
          </view>
          <text class="btn-text">拍照采集</text>
          <text class="btn-desc">实时拍摄虫害照片</text>
        </view>
      </view>

      <view class="action-btn secondary" @click="handleChooseImage">
        <view class="btn-content">
          <view class="btn-icon-wrapper">
            <view class="icon-bg">🖼️</view>
          </view>
          <text class="btn-text">从相册选择</text>
          <text class="btn-desc">选择已有图片</text>
        </view>
      </view>

      <!-- H5 演示模式提示 -->
      <view class="demo-tip">
        <text>💡 H5 演示模式：点击以上按钮将使用模拟图片</text>
      </view>
    </view>

    <!-- 图片预览 -->
    <view v-if="selectedImage" class="preview-section">
      <view class="preview-header">
        <text class="preview-title">✨ 已选择图片</text>
      </view>
      <view class="image-wrapper">
        <image :src="selectedImage" mode="aspectFill" class="preview-image"></image>
      </view>
      <button class="submit-btn" @click="handleSubmit">
        <text class="submit-icon">🔍</text>
        <text>提交并开始问诊</text>
      </button>
    </view>

    <!-- 使用说明 -->
    <view class="tips-section">
      <view class="tips-header">
        <text class="tips-icon">💡</text>
        <text class="tips-title">拍摄小贴士</text>
      </view>
      <view class="tips-grid">
        <view class="tip-card">
          <text class="tip-card-icon">☀️</text>
          <text class="tip-card-text">光线充足</text>
        </view>
        <view class="tip-card">
          <text class="tip-card-icon">🔍</text>
          <text class="tip-card-text">清晰特写</text>
        </view>
        <view class="tip-card">
          <text class="tip-card-icon">📱</text>
          <text class="tip-card-text">保持稳定</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: '',
      // Mock 虫害图片 - 使用真实害虫图片
      mockImages: [
        '/static/images/pest-demo.png'
      ]
    }
  },
  methods: {
    // 拍照采集 - H5 演示模式使用 Mock 图片
    handleTakePhoto() {
      uni.showLoading({ title: '模拟拍摄中...' })

      // 模拟拍摄延迟
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.mockImages.length)
        this.selectedImage = this.mockImages[randomIndex]
        uni.hideLoading()

        uni.showToast({
          title: '拍摄成功',
          icon: 'success'
        })
      }, 800)
    },

    // 从相册选择 - H5 演示模式使用 Mock 图片
    handleChooseImage() {
      uni.showLoading({ title: '选择中...' })

      // 模拟选择延迟
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.mockImages.length)
        this.selectedImage = this.mockImages[randomIndex]
        uni.hideLoading()

        uni.showToast({
          title: '选择成功',
          icon: 'success'
        })
      }, 500)
    },

    // 提交并跳转到 AI 问诊页面
    handleSubmit() {
      if (!this.selectedImage) {
        uni.showToast({
          title: '请先选择图片',
          icon: 'none'
        })
        return
      }

      // 存储图片到全局状态
      uni.$global.uploadedImages = uni.$global.uploadedImages || []
      uni.$global.uploadedImages.push(this.selectedImage)

      // 跳转到 AI 问诊页面
      uni.navigateTo({
        url: '/pages/consult/index?image=' + encodeURIComponent(this.selectedImage)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.camera-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%);
  padding: 0 0 40rpx;
}

// 顶部标题区
.header-section {
  background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%);
  padding: 60rpx 30rpx 80rpx;
  text-align: center;
  border-radius: 0 0 40rpx 40rpx;

  .header-icon {
    font-size: 80rpx;
    margin-bottom: 20rpx;
  }

  .header-title {
    font-size: 44rpx;
    font-weight: 700;
    color: #fff;
    display: block;
    margin-bottom: 12rpx;
  }

  .header-subtitle {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.6;
  }
}

// 操作按钮区域
.action-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  padding: 0 30rpx;
  margin-top: -50rpx;
  position: relative;
  z-index: 1;

  .action-btn {
    background: #fff;
    border-radius: 28rpx;
    padding: 36rpx;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.12);
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    }

    &.primary {
      .icon-bg {
        background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
      }

      .btn-text {
        color: #1976D2;
      }
    }

    &.secondary {
      .icon-bg {
        background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
      }

      .btn-text {
        color: #F57C00;
      }
    }

    .btn-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .btn-icon-wrapper {
      margin-bottom: 20rpx;

      .icon-bg {
        width: 120rpx;
        height: 120rpx;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 56rpx;
        box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
      }
    }

    .btn-text {
      font-size: 34rpx;
      font-weight: 700;
      margin-bottom: 8rpx;
    }

    .btn-desc {
      font-size: 26rpx;
      color: #999;
    }
  }

  .demo-tip {
    background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
    border-radius: 16rpx;
    padding: 20rpx 24rpx;
    text-align: center;

    text {
      font-size: 26rpx;
      color: #F57C00;
    }
  }
}

// 预览区域
.preview-section {
  padding: 30rpx;
  margin-top: 20rpx;

  .preview-header {
    margin-bottom: 20rpx;
    text-align: center;

    .preview-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .image-wrapper {
    background: #fff;
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
    margin-bottom: 24rpx;

    .preview-image {
      width: 100%;
      height: 500rpx;
    }
  }

  .submit-btn {
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
    color: #fff;
    border: none;
    border-radius: 20rpx;
    padding: 32rpx;
    font-size: 32rpx;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12rpx;
    box-shadow: 0 8rpx 24rpx rgba(76, 175, 80, 0.35);

    &:active {
      opacity: 0.9;
      transform: scale(0.98);
    }

    .submit-icon {
      font-size: 36rpx;
    }
  }
}

// 提示区域
.tips-section {
  padding: 30rpx;
  margin-top: 20rpx;

  .tips-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .tips-icon {
      font-size: 32rpx;
      margin-right: 12rpx;
    }

    .tips-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .tips-grid {
    display: flex;
    gap: 20rpx;

    .tip-card {
      flex: 1;
      background: #fff;
      border-radius: 20rpx;
      padding: 24rpx 16rpx;
      text-align: center;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);

      .tip-card-icon {
        font-size: 40rpx;
        display: block;
        margin-bottom: 12rpx;
      }

      .tip-card-text {
        font-size: 26rpx;
        color: #666;
        font-weight: 500;
      }
    }
  }
}
</style>
