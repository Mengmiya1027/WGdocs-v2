<!-- emit + 事件监听，适用于父子组件简单通信 -->

<template>
  <ClientOnly>
    <!-- 使用 Teleport 将模态框传送到 body 下，脱离播放器的定位上下文 -->
    <Teleport to="body">
      <div class="audio-info-modal" v-if="showModal">
        <!-- 半透明遮罩层 -->
        <div class="modal-overlay" @click="closeModal"></div>

        <!-- 圆角窗口 -->
        <div class="modal-container">
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="closeModal" aria-label="关闭">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- 标题 -->
          <h2 class="modal-title">音频列表</h2>

          <!-- 音频列表 -->
          <div class="audio-list">
            <div
                class="audio-item"
                v-for="(audio, index) in audioList"
                :key="index"
                :class="{ 'alternate-bg': index % 2 === 1 }"
                :style="index === playingIndex ? { border: '5px solid #FFCD7BFF' } : {}"
            >
              <!-- 封面图 -->
              <div class="audio-cover">
                <img
                    :src="audio.tlink"
                    :alt="audio.title"
                    :style="index === playingIndex ? { height: '110px' } : {}"
                    class="cover-img"
                >
              </div>

              <!-- 信息区域 -->
              <div class="audio-info">
                <h3 class="audio-title">{{ audio.title }}</h3>
                <p class="audio-author">
                  <span>歌手：</span>{{ audio.author }}
                </p>
                <!-- 主题色展示 -->
                <div class="color-indicator">
                  <span>主题色：</span>
                  <div
                      class="color-swatch"
                      :style="{ backgroundColor: audio.maincolor || '#3c3c43' }"
                  ></div>
                  <span class="color-code">{{ audio.maincolor || '#3c3c43' }}</span>
                </div>
                <!-- 播放按钮 -->
                <button
                    class="play-button"
                    @click="handlePlayClick(index)"
                    :disabled="index === playingIndex"
                    aria-label="播放"
                >
                  <svg width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- 播放中状态 -->
                    <path
                        v-if="index === playingIndex"
                        d="M162.9 923.3c-27.9 0-50.7-22.8-50.7-50.7V559c0-27.9 22.8-50.7 50.7-50.7 27.9 0 50.7 22.8 50.7 50.7v313.6c0 27.9-22.8 50.7-50.7 50.7zM394.2 923.3c-27.9 0-50.7-22.8-50.7-50.7V144c0-27.9 22.8-50.7 50.7-50.7 27.9 0 50.7 22.8 50.7 50.7v728.6c0 27.9-22.9 50.7-50.7 50.7zM625.4 923.3c-27.9 0-50.7-22.8-50.7-50.7V436.3c0-27.9 22.8-50.7 50.7-50.7 27.9 0 50.7 22.8 50.7 50.7v436.4c0 27.8-22.8 50.6-50.7 50.6zM856.7 923.3c-27.9 0-50.7-22.8-50.7-50.7V260.5c0-27.9 22.8-50.7 50.7-50.7 27.9 0 50.7 22.8 50.7 50.7v612.2c0 27.8-22.8 50.6-50.7 50.6z"
                        fill="currentColor"
                    />
                    <!-- 未播放状态 -->
                    <path
                        v-else
                        d="M324.085 95.787l500.422 300.664c82.373 50.453 79.284 136.946-1.030 186.37v0l-506.6 304.784c-41.187 23.683-87.522 37.068-131.798 9.267-36.037-22.653-46.335-58.691-46.335-97.819v-616.774c0-39.127 13.386-75.166 48.395-97.819 45.305-27.801 94.731-14.416 136.946 11.327v0z"
                        fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// 父组件传递的当前播放索引
const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  }
});

// 播放索引
const playingIndex = ref(null);

// 控制模态框显示状态
const showModal = ref(true);

// 音频列表数据
const audioList = ref([]);

// 传出参数声明
const emit = defineEmits(['close','switch-index']);

// 关闭模态框
const closeModal = () => {
  showModal.value = false;
  emit('close');
};

// 播放按钮点击处理
const handlePlayClick = (index) => {
  emit('switch-index', index);
};


// 加载音频数据
onMounted(async () => {
  playingIndex.value = props.currentIndex;
  try {
    // VitePress 中加载静态资源需使用 import.meta.url
    const response = await fetch(new URL('/public/assets/data/bg-music.json', import.meta.url));
    if (!response.ok) {
      throw new Error('加载音频数据失败');
    }
    const data = await response.json();
    audioList.value = data;
  } catch (error) {
    console.error('音频数据加载错误:', error);
  }
});

watch(
    () => props.currentIndex,  // 监听父组件传递的currentIndex
    (newIndex) => {
      playingIndex.value = newIndex;  // 更新子组件播放索引
    },
    { immediate: true }  // 立即执行一次（可选，确保初始值正确）
);

</script>

<style scoped>
/* 遮罩层样式 */
/* 遮罩层样式强化 - 确保全屏覆盖 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0; /* 新增：强制覆盖左右 */
  bottom: 0; /* 新增：强制覆盖上下 */
  width: 100vw; /* 用视口单位确保全屏 */
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  z-index: 9999; /* 提高层级，确保覆盖播放器 */
  overflow: hidden; /* 防止父容器滚动影响 */
}

/* 模态框容器 - 强化视口定位 */
.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 650px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 22px;
  box-shadow: 0 8px 30px rgba(255, 235, 205, 0.3), 0 0 0 1px rgba(255, 235, 205, 0.2);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 235, 205, 0.3);
  z-index: 10000; /* 高于遮罩层 */
  /* 新增：脱离父容器堆叠上下文影响 */
  contain: layout paint;
  will-change: transform;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 20px;
  right: 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 235, 205, 0.3);
  cursor: pointer;
  color: #666;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  transition: all 0.2s;
  padding: 0;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(255, 235, 205, 0.2);
}

.close-btn:hover {
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 12px rgba(255, 235, 205, 0.3);
}

/* 标题样式 */
.modal-title {
  padding: 24px 24px 16px;
  margin: 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 235, 205, 0.2);
}

/* 列表容器 */
.audio-list {
  max-height: calc(90vh - 120px);
  overflow-y: auto;
  padding: 20px;
  flex: 1;
}

/* 列表项样式 - 所有卡片都有默认阴影，移除悬停效果 */
.audio-item {
  display: flex;
  align-items: center;
  padding: 2px;
  border: 0 solid transparent;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  /* 增加高度计算参考 */
  min-height: 80px;
  position: relative;
  padding-right: 60px; /* 为按钮预留空间 */
  transition: all 0.3s ease-in-out;
}

/* 交替背景色 - #FFEBCD 与 #fff 相间 */
.audio-item.alternate-bg {
  background-color: #FFEBCD;
}

/* 封面图容器 */
.audio-cover {
  flex-shrink: 0;
  margin-right: 20px;
  /* 让封面图容器高度与父元素一致 */
  height: 100%;
  display: flex;
  align-items: center;
}

/* 封面图样式 等比拉伸 */
.cover-img {
  height: 120px;
  width: auto;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid rgba(255, 235, 205, 0.3);
  transition: all 0.3s ease;
}

/* 信息区域样式 */
.audio-info {
  flex: 1;
  min-width: 0;
}

.audio-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.audio-author {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 16px;
}

.audio-author span {
  color: #999;
}

/* 主题色指示器 */
.color-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.color-code {
  color: #888;
  font-family: monospace;
}

.play-button {
  /* 绝对定位实现右侧垂直居中 */
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);

  /* 基础样式 */
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

/* 播放中状态样式 */
.play-button:disabled {
  color: #ffaf2a;
  cursor: default;
  background-color: rgba(255, 205, 123, 0.1);
}

/* 未播放状态悬停效果 */
.play-button:not(:disabled):hover {
  color: #333;
  background-color: rgba(0, 0, 0, 0.05);
}

/* 滚动条样式优化 - 替换紫色为 #FFEBCD 相关色调 */
.audio-list::-webkit-scrollbar {
  width: 8px;
}

.audio-list::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.audio-list::-webkit-scrollbar-thumb {
  background: rgb(255, 222, 173);
  border-radius: 4px;
}

.audio-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 222, 173, 0.85);
}

.audio-list::-webkit-scrollbar-thumb:active {
  background: rgb(255, 205, 123);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .modal-container {
    width: 95%;
    height: 95%;
    max-height: none;
  }

  .modal-title {
    font-size: 24px;
    padding: 20px 20px 16px;
  }

  .audio-list {
    padding: 16px;
    max-height: calc(90vh - 10px);
  }

  .audio-item {
    padding: 12px;
    min-height: 64px;
  }

  .audio-title {
    font-size: 16px;
  }

  .color-code {
    display: none;
  }
}

@media (max-width: 450px) {
  .play-button {
    right: 30px;
  }
}

@media (max-width: 400px) {
  .play-button {
    right: 10px;
  }
}

@media (max-width: 430px) {
  .audio-author {
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 370px) {
  .cover-img {
    height: 90px;
  }
  .cover-img[style*="height: 110px"] {
    height: 85px !important;
  }
}
</style>