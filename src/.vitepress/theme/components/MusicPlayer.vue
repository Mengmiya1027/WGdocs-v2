<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  title: string,
  author: string,
  tlink: string, // 封面图片链接
  flink: string  // 音乐文件链接
}>()

// 状态管理：链接有效性
const isCoverValid = ref<boolean | null>(null)    // 封面是否有效
const isAudioValid = ref<boolean | null>(null)    // 音频是否有效

// 检查封面图片链接有效性
onMounted(() => {
  // 检查封面图片
  const coverImg = new Image()
  coverImg.src = props.tlink
  coverImg.onload = () => { isCoverValid.value = true }
  coverImg.onerror = () => { isCoverValid.value = false }

  // 检查音频文件
  const audio = new Audio()
  audio.src = props.flink
  // 音频加载元数据成功 = 链接有效
  audio.addEventListener('loadedmetadata', () => { isAudioValid.value = true })
  // 音频加载错误 = 链接无效
  audio.addEventListener('error', () => { isAudioValid.value = false })
})
</script>

<template>
  <div class="music-player">
    <!-- 背景图容器（无内边距，仅用于显示背景图） -->
    <div class="bg-wrapper" :style="{ 'background-image': `url(${tlink})` }">
      <!-- 毛玻璃容器（带内边距，包含所有内容） -->
      <div class="player-container">
        <!-- 左侧封面区域（正方形） -->
        <div class="album-cover">
          <template v-if="isCoverValid === true">
            <img :src="tlink" alt="专辑封面" class="cover-img" />
          </template>
          <template v-if="isCoverValid === false">
            <div class="invalid-cover">⚠️ 封面链接无效</div>
          </template>
        </div>

        <!-- 右侧信息与控制区 -->
        <div class="music-info">
          <h3 class="music-title">{{ title }}</h3>
          <p class="music-artist">{{ author }}</p>

          <!-- 音频控制区 -->
          <div class="audio-control">
            <template v-if="isAudioValid === true">
              <audio controls :src="flink" preload="metadata"></audio>
            </template>
            <template v-if="isAudioValid === false">
              <div class="invalid-audio">⚠️ 音频链接无效</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.music-player {
  width: 100%;
  aspect-ratio: 3/1;
  padding: 10px;
  box-sizing: border-box; /* 确保内边距不影响整体尺寸 */
}

.player-container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 15px; /* 内边距只影响内容，不影响背景图 */
  box-sizing: border-box;
  /* 强化毛玻璃效果 */
  backdrop-filter: blur(3px); /* 提高模糊度 */
  background-color: rgba(255, 255, 255, 0.1); /* 半透明白色遮罩 */
  /* 保留其他样式 */
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
}

/* 鼠标悬停阴影效果 */
.player-container:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}

/* 左侧封面区域 */
.album-cover {
  width: calc(100%-20px); /* 卡片高度减去上下内边距的两倍 */
  height: calc(100%-20px);/* 提示：编辑器报错是因为它猎奇，本处不能加空格，否则封面尺寸会出现问题 */
  overflow: hidden;
  border-radius: 8px; /* 设置封面圆角 */
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.invalid-cover {
  color: #ff4d4f; /* 错误提示红色 */
  font-size: 16px;
  text-align: center;
  padding: 20px;
}

/* 右侧信息区域 */
.music-info {
  width: calc(100% - 200px); /* 固定左侧正方形封面宽度后，右侧自动填充 */
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  gap: 12px; /* 缩小间距，避免内容过长 */
  text-align: center; /* 文字本身居中对齐 */
}

.music-title {
  font-size: clamp(1rem, 3vw, 1.5rem); /* 标题自适应字体大小 */
  font-weight: bold;
  margin: 0;
  text-align: center;
}

.music-artist {
  font-size: clamp(0.8rem, 2vw, 1rem); /* 歌手自适应字体大小 */
  color: #666;
  margin: 0;
  text-align: center;
}

.audio-control {
  margin-top: auto; /* 推到容器底部 */
}

.invalid-audio {
  color: #ff4d4f;
  text-align: center;
  padding: 10px;
  font-size: 14px;
}

/* 新增背景图容器样式（无内边距） */
.bg-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100% auto; /* 宽度强制与卡片一致，高度按比例自适应 */
  background-position: center; /* 图片居中显示 */
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden; /* 超出卡片高度的部分会被切掉 */
}

</style>