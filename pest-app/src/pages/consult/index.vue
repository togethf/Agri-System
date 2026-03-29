<template>
  <view class="consult-container">
    <!-- 聊天列表 -->
    <scroll-view scroll-y class="chat-scroll" :scroll-into-view="scrollToView">
      <view class="chat-list">
        <view
          v-for="(message, index) in chatMessages"
          :key="index"
          class="chat-item"
          :class="message.role"
        >
          <!-- 头像 -->
          <view class="avatar" :class="message.role">
            <text v-if="message.role === 'user'">👤</text>
            <text v-else>🤖</text>
          </view>

          <!-- 消息内容 -->
          <view class="message-content">
            <!-- 图片消息 -->
            <image
              v-if="message.type === 'image'"
              :src="message.content"
              mode="widthFix"
              class="message-image"
            ></image>

            <!-- 文本消息 -->
            <view v-if="message.type === 'text'" class="message-text">
              {{ message.content }}
            </view>

            <!-- 诊断报告 -->
            <view v-if="message.type === 'report'" class="diagnosis-report">
              <view class="report-header">
                <view class="report-title">
                  <text class="title-icon">📋</text>
                  <text>诊断报告</text>
                </view>
                <view class="report-id">No.{{ message.id }}</view>
              </view>

              <!-- 识别结果 -->
              <view class="report-section result-section">
                <view class="section-label">
                  <text class="label-icon">🔍</text>
                  <text>初步识别</text>
                </view>
                <view class="result-content">
                  <text class="result-main">{{ message.report.result }}</text>
                  <text class="result-sub">{{ message.report.pestName }}</text>
                </view>
              </view>

              <!-- 危害程度 -->
              <view class="report-section">
                <view class="section-label">
                  <text class="label-icon">⚠️</text>
                  <text>危害程度</text>
                </view>
                <view class="severity-bar">
                  <view class="severity-indicator" :class="message.report.severityClass">
                    <text>{{ message.report.severity }}</text>
                  </view>
                </view>
              </view>

              <!-- 形态特征 -->
              <view class="report-section">
                <view class="section-label">
                  <text class="label-icon">📖</text>
                  <text>形态特征</text>
                </view>
                <view class="feature-list">
                  <view v-for="(feature, idx) in message.report.features" :key="idx" class="feature-item">
                    <text class="feature-dot">•</text>
                    <text class="feature-text">{{ feature }}</text>
                  </view>
                </view>
              </view>

              <!-- 危害症状 -->
              <view class="report-section">
                <view class="section-label">
                  <text class="label-icon">🥀</text>
                  <text>危害症状</text>
                </view>
                <text class="damage-text">{{ message.report.damage }}</text>
              </view>

              <!-- 防治方案 -->
              <view class="report-section solution-section">
                <view class="section-label">
                  <text class="label-icon">💊</text>
                  <text>防治方案</text>
                </view>
                <view class="solution-list">
                  <view v-for="(solution, idx) in message.report.solution" :key="idx" class="solution-item">
                    <text class="solution-num">{{ idx + 1 }}</text>
                    <text class="solution-text">{{ solution }}</text>
                  </view>
                </view>
              </view>

              <!-- 复查建议 -->
              <view class="report-section timing-section">
                <view class="section-label">
                  <text class="label-icon">📅</text>
                  <text>复查建议</text>
                </view>
                <text class="timing-text">{{ message.report.timing }}</text>
              </view>
            </view>

            <!-- 时间戳 -->
            <text class="message-time">{{ message.time }}</text>
          </view>
        </view>

        <!-- 加载中 -->
        <view v-if="isLoading" class="chat-item ai">
          <view class="avatar ai">🤖</view>
          <view class="message-content">
            <view class="loading-text">
              <text class="loading-dot">AI 正在分析</text>
              <text class="loading-animation">...</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部输入框 -->
    <view class="input-section">
      <input
        v-model="inputMessage"
        class="message-input"
        placeholder="输入问题继续追问..."
        placeholder-class="input-placeholder"
        @confirm="handleSend"
      />
      <view class="send-btn" @click="handleSend">
        <text>发送</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      inputMessage: '',
      isLoading: false,
      scrollToView: '',
      messageCount: 0,
      // Mock 演示图片 - 使用真实害虫图片
      demoImage: '/static/images/pest-demo.png'
    }
  },
  onLoad(options) {
    // 如果有从上一页传来的图片
    if (options.image) {
      const imagePath = decodeURIComponent(options.image)
      this.addUserMessage(imagePath, 'image')

      // 模拟 AI 回复诊断报告
      setTimeout(() => {
        this.addAiReport()
      }, 800)
    } else {
      // 演示模式：自动显示 Mock 数据
      this.showDemo()
    }
  },
  onShow() {
    // 页面显示时滚动到底部
    if (this.chatMessages.length > 0) {
      this.scrollToBottom()
    }
  },
  methods: {
    // 显示演示数据
    showDemo() {
      // 添加模拟的用户上传图片
      this.addUserMessage(this.demoImage, 'image')

      // 模拟 AI 回复诊断报告
      setTimeout(() => {
        this.addAiReport()
      }, 1000)
    },
    // 添加用户消息
    addUserMessage(content, type = 'text') {
      this.messageCount++
      this.chatMessages.push({
        role: 'user',
        type: type,
        content: content,
        time: this.getCurrentTime(),
        id: this.messageCount
      })
      this.scrollToBottom()
    },

    // 添加 AI 消息
    addAiMessage(content, type = 'text') {
      this.messageCount++
      this.chatMessages.push({
        role: 'ai',
        type: type,
        content: content,
        time: this.getCurrentTime(),
        id: this.messageCount
      })
      this.scrollToBottom()
    },

    // 添加 AI 诊断报告
    addAiReport() {
      this.messageCount++
      this.chatMessages.push({
        role: 'ai',
        type: 'report',
        report: {
          result: '稻飞虱',
          pestName: '褐飞虱 / 白背飞虱',
          severity: '中度危害',
          severityClass: 'warning',
          features: [
            '成虫体长 3-5mm，褐色或灰褐色',
            '若虫体型较小，聚集危害',
            '主要危害水稻中下部茎秆'
          ],
          damage: '吸食稻株汁液，导致叶片发黄、植株矮小，严重时全株枯死',
          solution: [
            '化学防治：25% 噻虫嗪水分散粒剂 2000 倍液喷雾',
            '每亩用 80% 敌敌畏乳油 100ml 拌细土 15kg 撒施',
            '生物防治：保护稻田蜘蛛、黑肩绿盲蝽等天敌',
            '农业防治：及时排水晒田，减少虫源'
          ],
          timing: '建议 7-10 天后复查，根据虫情决定是否需要二次施药'
        },
        time: this.getCurrentTime(),
        id: this.messageCount
      })
      this.scrollToBottom()
    },

    // 发送消息
    handleSend() {
      if (!this.inputMessage.trim()) {
        return
      }

      const message = this.inputMessage.trim()
      this.inputMessage = ''

      // 添加用户消息
      this.addUserMessage(message, 'text')

      // 显示加载状态
      this.isLoading = true

      // 模拟 AI 回复
      setTimeout(() => {
        this.isLoading = false
        this.addAiMessage(this.generateResponse(message), 'text')
      }, 1500)
    },

    // 生成模拟回复
    generateResponse(question) {
      const responses = [
        '根据图片分析，这是典型的稻飞虱危害。建议您立即采取防治措施，每亩使用 25% 噻虫嗪 20-30 克兑水喷雾。',
        '这个药的推荐用量是每亩 20-30ml，兑水 30kg 均匀喷雾，建议在清晨或傍晚施药效果更佳。',
        '防治最佳时期是若虫盛发期，现在正是好时机。间隔 7-10 天再施药一次，连续 2-3 次即可有效控制。',
        '建议您结合农业防治：及时排水晒田，减少虫源；合理施肥，避免禾苗贪青徒长。',
        '如果虫害严重，可以采用毒土法：每亩用 80% 敌敌畏乳油 100ml 拌细土 15kg 撒施。'
      ]

      // 根据问题关键词返回相关回复
      if (question.includes('用量') || question.includes('多少')) {
        return responses[1]
      } else if (question.includes('什么时候') || question.includes('时期')) {
        return responses[2]
      } else if (question.includes('预防') || question.includes('防止')) {
        return responses[3]
      } else if (question.includes('严重') || question.includes('厉害')) {
        return responses[4]
      }

      return responses[Math.floor(Math.random() * responses.length)]
    },

    // 获取当前时间
    getCurrentTime() {
      const now = new Date()
      return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    },

    // 滚动到底部
    scrollToBottom() {
      this.$nextTick(() => {
        this.scrollToView = 'chat-' + this.messageCount
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.consult-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(180deg, #F8F9FA 0%, #E8F5E9 100%);
}

// 聊天滚动区域
.chat-scroll {
  flex: 1;
  padding: 24rpx;
  padding-bottom: 10rpx;
  box-sizing: border-box;
}

.chat-list {
  padding-right: 5rpx;

  .chat-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 32rpx;

    &.user {
      flex-direction: row-reverse;

      .message-content {
        align-items: flex-end;

        .message-text, .message-image {
          background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
          color: #fff;
          box-shadow: 0 4rpx 16rpx rgba(76, 175, 80, 0.25);
        }

        .message-time {
          text-align: right;
        }
      }
    }

    &.ai {
      .message-content {
        align-items: flex-start;
      }
    }

    .avatar {
      width: 88rpx;
      height: 88rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48rpx;
      flex-shrink: 0;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
      overflow: hidden;

      &.user {
        background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
        margin-left: 20rpx;
      }

      &.ai {
        background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
        margin-right: 20rpx;
      }

      text {
        line-height: 1;
      }
    }

    .message-content {
      max-width: 70%;
      display: flex;
      flex-direction: column;

      .message-image {
        width: 450rpx;
        border-radius: 20rpx;
        margin-bottom: 10rpx;
        overflow: hidden;
      }

      .message-text {
        padding: 24rpx 28rpx;
        border-radius: 20rpx;
        font-size: 30rpx;
        line-height: 1.7;
        margin-bottom: 10rpx;
      }

      .diagnosis-report {
        background: #fff;
        border-radius: 24rpx;
        padding: 0;
        margin-bottom: 10rpx;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
        border: 1rpx solid rgba(76, 175, 80, 0.15);
        overflow: hidden;

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24rpx 28rpx;
          background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
          border-bottom: 1rpx solid rgba(76, 175, 80, 0.2);

          .report-title {
            display: flex;
            align-items: center;
            gap: 10rpx;
            font-size: 32rpx;
            font-weight: 700;
            color: #2E7D32;

            .title-icon {
              font-size: 36rpx;
            }
          }

          .report-id {
            font-size: 22rpx;
            color: #666;
            background: rgba(255, 255, 255, 0.7);
            padding: 6rpx 16rpx;
            border-radius: 20rpx;
          }
        }

        .report-section {
          padding: 20rpx 28rpx;
          border-bottom: 1rpx solid #F0F0F0;

          &:last-child {
            border-bottom: none;
          }

          .section-label {
            display: flex;
            align-items: center;
            gap: 10rpx;
            margin-bottom: 16rpx;

            .label-icon {
              font-size: 28rpx;
            }

            text {
              font-size: 28rpx;
              font-weight: 600;
              color: #333;
            }
          }

          // 识别结果
          &.result-section {
            background: linear-gradient(135deg, #E3F2FD 0%, #E8F5E9 100%);

            .result-content {
              display: flex;
              flex-direction: column;
              gap: 8rpx;

              .result-main {
                font-size: 36rpx;
                font-weight: 700;
                color: #1976D2;
              }

              .result-sub {
                font-size: 26rpx;
                color: #666;
              }
            }
          }

          // 危害程度
          .severity-bar {
            .severity-indicator {
              display: inline-block;
              padding: 10rpx 24rpx;
              border-radius: 20rpx;
              font-size: 28rpx;
              font-weight: 600;

              &.warning {
                background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
                color: #F57C00;
              }

              &.danger {
                background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%);
                color: #F44336;
              }

              &.low {
                background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
                color: #4CAF50;
              }
            }
          }

          // 形态特征
          .feature-list {
            .feature-item {
              display: flex;
              align-items: flex-start;
              gap: 10rpx;
              margin-bottom: 12rpx;

              &:last-child {
                margin-bottom: 0;
              }

              .feature-dot {
                color: #4CAF50;
                font-size: 28rpx;
                flex-shrink: 0;
              }

              .feature-text {
                font-size: 28rpx;
                color: #666;
                line-height: 1.6;
                flex: 1;
              }
            }
          }

          // 危害症状
          .damage-text {
            font-size: 28rpx;
            color: #666;
            line-height: 1.7;
            padding: 16rpx;
            background: #FFF3E0;
            border-radius: 12rpx;
            border-left: 4rpx solid #FF9800;
          }

          // 防治方案
          &.solution-section {
            background: linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%);

            .solution-list {
              .solution-item {
                display: flex;
                align-items: flex-start;
                gap: 12rpx;
                margin-bottom: 16rpx;
                padding: 16rpx;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 12rpx;

                &:last-child {
                  margin-bottom: 0;
                }

                .solution-num {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 40rpx;
                  height: 40rpx;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
                  color: #fff;
                  font-size: 24rpx;
                  font-weight: 700;
                  flex-shrink: 0;
                }

                .solution-text {
                  font-size: 28rpx;
                  color: #333;
                  line-height: 1.7;
                  flex: 1;
                }
              }
            }
          }

          // 复查建议
          &.timing-section {
            background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);

            .timing-text {
              font-size: 28rpx;
              color: #666;
              line-height: 1.7;
              padding: 16rpx;
              background: rgba(255, 255, 255, 0.5);
              border-radius: 12rpx;
              border-left: 4rpx solid #9C27B0;
            }
          }
        }
      }

      .message-time {
        font-size: 22rpx;
        color: #999;
        margin-top: 8rpx;
        padding: 0 8rpx;
      }
    }
  }
}

// 加载动画
.loading-text {
  background: #fff;
  padding: 24rpx 32rpx;
  border-radius: 20rpx;
  font-size: 30rpx;
  color: #666;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

  .loading-animation {
    animation: dots 1.5s infinite;
    margin-left: 4rpx;
  }
}

@keyframes dots {
  0%, 20% { content: '.'; opacity: 0.4; }
  40% { content: '..'; opacity: 0.7; }
  60%, 100% { content: '...'; opacity: 1; }
}

// 底部输入区域
.input-section {
  display: flex;
  align-items: center;
  padding: 24rpx;
  background: #fff;
  border-top: 1rpx solid #eee;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.06);
  padding-bottom: max(24rpx, env(safe-area-inset-bottom));

  .message-input {
    flex: 1;
    min-height: 80rpx;
    background: #F5F5F5;
    border-radius: 40rpx;
    padding: 16rpx 32rpx;
    font-size: 30rpx;
    margin-right: 16rpx;
    border: 1rpx solid transparent;
    transition: all 0.2s;

    &:focus {
      background: #fff;
      border-color: #4CAF50;
      box-shadow: 0 0 0 4rpx rgba(76, 175, 80, 0.1);
    }
  }

  .input-placeholder {
    color: #999;
  }

  .send-btn {
    background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
    color: #fff;
    padding: 20rpx 40rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
    font-weight: 600;
    box-shadow: 0 4rpx 16rpx rgba(76, 175, 80, 0.3);

    &:active {
      opacity: 0.85;
      transform: scale(0.95);
    }
  }
}
</style>
