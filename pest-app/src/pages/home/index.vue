<template>
  <view class="home-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="app-icon">🐛</view>
        <view class="app-title">
          <text class="title-main">AI 虫情</text>
          <text class="title-sub">智能问诊系统</text>
        </view>
      </view>
      <view class="header-date">{{ currentDate }}</view>
    </view>

    <!-- 数据看板 -->
    <view class="data-board">
      <view class="board-header">
        <text class="board-icon">📊</text>
        <text class="board-title">今日虫情简报</text>
      </view>
      <view class="data-cards">
        <view class="data-card primary">
          <view class="card-icon">🔢</view>
          <text class="data-value">{{ todayCount }}</text>
          <text class="data-label">今日识别虫害 (只)</text>
        </view>
        <view class="data-card warning">
          <view class="card-icon">⚠️</view>
          <text class="data-value">{{ warningLevel }}</text>
          <text class="data-label">高发预警</text>
        </view>
      </view>
      <view class="data-trend">
        <text class="trend-item">📈 较昨日 <text class="trend-up">+12%</text></text>
        <text class="trend-item">🌡️ 平均温度 28°C</text>
        <text class="trend-item">💧 湿度 75%</text>
      </view>
    </view>

    <!-- 设备列表 -->
    <view class="device-section">
      <view class="section-header">
        <view class="section-title">
          <text class="title-icon">📡</text>
          <text>田间设备</text>
        </view>
        <text class="device-count">共 {{ deviceList.length }} 台</text>
      </view>
      <view class="device-list">
        <view v-for="device in deviceList" :key="device.id" class="device-item">
          <view class="device-icon">
            <view class="icon-bg">📷</view>
          </view>
          <view class="device-main">
            <view class="device-info">
              <text class="device-name">{{ device.name }}</text>
              <view class="device-status">
                <view class="status-dot" :class="device.online ? 'online' : 'offline'"></view>
                <text class="status-text">{{ device.online ? '在线' : '离线' }}</text>
              </view>
            </view>
            <view class="device-detail">
              <text class="detail-label">最新采集</text>
              <text class="capture-time">{{ device.lastCaptureTime }}</text>
            </view>
          </view>
          <view class="device-action">
            <view class="action-arrow">›</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentDate: '',
      todayCount: 0,
      warningLevel: '无',
      deviceList: []
    }
  },
  onLoad() {
    this.loadDate()
    this.loadData()
  },
  onPullDownRefresh() {
    this.loadDate()
    this.loadData()
    setTimeout(() => {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    loadDate() {
      const now = new Date()
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
      this.currentDate = now.toLocaleDateString('zh-CN', options)
    },
    loadData() {
      // Mock 数据
      this.todayCount = 38
      this.warningLevel = '稻飞虱'
      this.deviceList = [
        { id: 1, name: 'A 区 - 01 号监测点', online: true, lastCaptureTime: '10:30' },
        { id: 2, name: 'A 区 - 02 号监测点', online: true, lastCaptureTime: '10:28' },
        { id: 3, name: 'A 区 - 03 号监测点', online: true, lastCaptureTime: '10:26' },
        { id: 4, name: 'A 区 - 04 号监测点', online: true, lastCaptureTime: '10:25' },
        { id: 5, name: 'B 区 - 01 号监测点', online: true, lastCaptureTime: '10:24' },
        { id: 6, name: 'B 区 - 02 号监测点', online: true, lastCaptureTime: '10:22' },
        { id: 7, name: 'B 区 - 03 号监测点', online: true, lastCaptureTime: '10:20' },
        { id: 8, name: 'B 区 - 04 号监测点', online: true, lastCaptureTime: '10:18' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #F8F9FA 0%, #E8F5E9 100%);
  padding-bottom: 40rpx;
}

// 顶部导航栏
.header {
  background: linear-gradient(135deg, #2E7D32 0%, #4CAF50 50%, #66BB6A 100%);
  padding: 40rpx 30rpx 60rpx;
  position: relative;

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;

    .app-icon {
      font-size: 64rpx;
      margin-right: 20rpx;
    }

    .app-title {
      display: flex;
      flex-direction: column;

      .title-main {
        font-size: 40rpx;
        font-weight: 700;
        color: #fff;
        line-height: 1.2;
      }

      .title-sub {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.85);
        margin-top: 4rpx;
      }
    }
  }

  .header-date {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.9);
  }
}

// 数据看板
.data-board {
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 0 30rpx 30rpx;
  margin-top: -30rpx;
  box-shadow: 0 -8rpx 24rpx rgba(0, 0, 0, 0.08);

  .board-header {
    display: flex;
    align-items: center;
    padding: 30rpx 0 20rpx;
    border-bottom: 1rpx solid #F0F0F0;

    .board-icon {
      font-size: 36rpx;
      margin-right: 12rpx;
    }

    .board-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }
  }

  .data-cards {
    display: flex;
    gap: 24rpx;
    padding: 24rpx 0;

    .data-card {
      flex: 1;
      border-radius: 24rpx;
      padding: 32rpx 20rpx;
      text-align: center;
      position: relative;
      overflow: hidden;

      &.primary {
        background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);

        .data-value {
          color: #1976D2;
        }
      }

      &.warning {
        background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);

        .data-value {
          color: #F57C00;
        }
      }

      .card-icon {
        font-size: 32rpx;
        margin-bottom: 8rpx;
      }

      .data-value {
        font-size: 56rpx;
        font-weight: 700;
        display: block;
        line-height: 1.1;
      }

      .data-label {
        font-size: 24rpx;
        color: #666;
        margin-top: 12rpx;
        display: block;
      }
    }
  }

  .data-trend {
    display: flex;
    justify-content: space-around;
    padding: 24rpx;
    background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%);
    border-radius: 20rpx;
    margin-top: 20rpx;

    .trend-item {
      font-size: 26rpx;
      color: #666;

      .trend-up {
        color: #F44336;
        font-weight: 600;
      }
    }
  }
}

// 设备列表
.device-section {
  padding: 30rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;

    .section-title {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 600;
      color: #333;

      .title-icon {
        margin-right: 10rpx;
        font-size: 36rpx;
      }
    }

    .device-count {
      font-size: 26rpx;
      color: #999;
    }
  }

  .device-list {
    .device-item {
      background: #fff;
      border-radius: 20rpx;
      padding: 28rpx;
      margin-bottom: 20rpx;
      display: flex;
      align-items: center;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
      }

      .device-icon {
        margin-right: 24rpx;

        .icon-bg {
          width: 88rpx;
          height: 88rpx;
          border-radius: 20rpx;
          background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40rpx;
        }
      }

      .device-main {
        flex: 1;

        .device-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12rpx;

          .device-name {
            font-size: 30rpx;
            font-weight: 600;
            color: #333;
          }

          .device-status {
            display: flex;
            align-items: center;
            gap: 8rpx;

            .status-dot {
              width: 16rpx;
              height: 16rpx;
              border-radius: 50%;

              &.online {
                background: #4CAF50;
                box-shadow: 0 0 12rpx rgba(76, 175, 80, 0.4);
              }

              &.offline {
                background: #BDBDBD;
              }
            }

            .status-text {
              font-size: 26rpx;
              color: #666;
            }
          }
        }

        .device-detail {
          display: flex;
          align-items: center;
          gap: 12rpx;

          .detail-label {
            font-size: 24rpx;
            color: #999;
          }

          .capture-time {
            font-size: 26rpx;
            color: #333;
            font-weight: 500;
          }
        }
      }

      .device-action {
        .action-arrow {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          background: #F5F5F5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40rpx;
          color: #999;
        }
      }
    }
  }
}
</style>
