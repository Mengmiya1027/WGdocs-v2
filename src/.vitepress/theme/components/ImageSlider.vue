<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from 'vue';

const props = defineProps<{
  auto: boolean;
  time: number;
  images: {
    id: number;
    text: string;
    link: string;
  }[];
  ltext: string;
  lcolor: string;
  rtext: string;
  rcolor: string;
}>();

const currentIndex = ref(0);
const currentImage = ref(props.images[currentIndex.value]);
let intervalId: ReturnType<typeof setInterval> | null = null;

// 重置自动轮播计时器
const resetAutoSlide = () => {
  stopAutoSlide();
  startAutoSlide();
};

// 检测图片指定位置的亮度
const checkImageBrightness = async (imageSrc: string, x: number, y: number, width: number, height: number) => {
  return new Promise<number>((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(0);
        return;
      }

      // 设置canvas大小与检测区域一致
      canvas.width = width;
      canvas.height = height;

      // 绘制图片的指定区域
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      // 获取像素数据
      const imageData = ctx.getImageData(0, 0, width, height).data;
      let brightnessSum = 0;
      const pixelCount = width * height;

      // 计算平均亮度 (使用 luminance 公式)
      for (let i = 0; i < imageData.length; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        brightnessSum += luminance;
      }

      const averageBrightness = brightnessSum / pixelCount;
      resolve(averageBrightness);
    };

    img.onerror = () => resolve(0);
  });
};

// 更新按钮样式
const updateButtonStyle = async () => {
  const img = document.querySelector('.slider-image') as HTMLImageElement;
  if (!img) return;

  const buttonSize = 48;

  // 检测左右按钮位置亮度
  const leftBrightness = await checkImageBrightness(
      currentImage.value.link,
      0,
      img.height / 2 - buttonSize / 2,
      buttonSize,
      buttonSize
  );

  const rightBrightness = await checkImageBrightness(
      currentImage.value.link,
      img.width - buttonSize,
      img.height / 2 - buttonSize / 2,
      buttonSize,
      buttonSize
  );

  // 计算平均亮度
  const averageBrightness = (leftBrightness + rightBrightness) / 2;
  const brightnessThreshold = 255 * 0.6;
  const isHighBright = averageBrightness > brightnessThreshold;

  // 左右按钮使用相同样式
  const leftButton = document.querySelector('.arrow-left') as HTMLElement;
  const rightButton = document.querySelector('.arrow-right') as HTMLElement;

  if (leftButton) {
    leftButton.dataset.bright = isHighBright ? 'high' : 'low';
  }
  if (rightButton) {
    rightButton.dataset.bright = isHighBright ? 'high' : 'low';
  }
};

const previewItems = ref<HTMLElement[]>([]);
const indicatorPosition = ref({ left: 0, width: 0 });

const updateIndicatorPosition = () => {
  const activeItem = previewItems.value[currentIndex.value];
  if (activeItem) {
    const itemWidth = activeItem.offsetWidth;
    const indicatorWidth = itemWidth * 0.5;
    indicatorPosition.value = {
      left: activeItem.offsetLeft + (itemWidth - indicatorWidth) / 2,
      width: indicatorWidth
    };
  }
};

// 修改现有的图片切换方法，添加位置更新
const prevImage = () => {
  // 循环逻辑：当前为第一张时，上一张指向最后一张
  currentIndex.value = currentIndex.value > 0
      ? currentIndex.value - 1
      : props.images.length - 1;

  currentImage.value = props.images[currentIndex.value];
  resetAutoSlide();
  nextTick(() => {
    updateButtonStyle();
    updateIndicatorPosition();
  });
};

const nextImage = () => {
  // 循环逻辑：当前为最后一张时，下一张指向第一张
  currentIndex.value = currentIndex.value < props.images.length - 1
      ? currentIndex.value + 1
      : 0;

  currentImage.value = props.images[currentIndex.value];
  resetAutoSlide();
  nextTick(() => {
    updateButtonStyle();
    updateIndicatorPosition();
  });
};

const startAutoSlide = () => {
  if (props.auto) {
    intervalId = setInterval(() => {
      nextImage();
    }, props.time);
  }
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

// 点击预览图片切换主展示图片
const selectImage = (index: number) => {
  currentIndex.value = index;
  currentImage.value = props.images[index];
  resetAutoSlide();
  nextTick(() => {
    updateButtonStyle();
    updateIndicatorPosition(); // 新增位置更新
  });
};

onMounted(() => {
  startAutoSlide();
  nextTick(() => {
    updateButtonStyle();
    updateIndicatorPosition();
  });
});

onUnmounted(() => {
  stopAutoSlide();
});

// 默认颜色
const defaultColor = '#3c3c43';
</script>

<template>
  <div class="image-slider-container">
    <div class="image-slider-bg" :style="{ 'background-image': `url(${currentImage.link})` }">
      <div class="image-slider-glass">
        <button @click="prevImage" class="arrow-btn arrow-left">
          <!-- 确保 SVG 中没有 fill="black" 等硬编码颜色 -->
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img :src="currentImage.link" :alt="currentImage.text" :class="{ 'slider-image': true, 'active': true }" />
        <button @click="nextImage" class="arrow-btn arrow-right">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <!-- 信息框，仅移动端可见 -->
    <!-- 信息框容器 -->
    <div class="textbox-container">
      <!-- 左信息框 -->
      <div class="left-textbox image-preview-container mobile-only">
        <!-- 背景图 -->
        <div class="image-preview-bg">
          <div
              :style="{
        'background-image': `url(${props.images[0].link})`,
        width: '100%'
      }"
              class="image-preview-bg-part"
          ></div>
        </div>
        <div class="image-preview-mask"></div>
        <div class="image-preview-wrapper">
        </div>
        <span class="side-text left" :style="{ color: lcolor || defaultColor }">{{ ltext }}</span>
      </div>
      <!-- 右信息框 -->
      <div class="right-textbox image-preview-container mobile-only">
        <!-- 背景图 -->
        <div class="image-preview-bg">
          <div
              :style="{
        'background-image': `url(${props.images[props.images.length - 1].link})`,
        width: '100%'
      }"
              class="image-preview-bg-part"
          ></div>
        </div>
        <div class="image-preview-mask"></div>
        <div class="image-preview-wrapper">
        </div>
        <span class="side-text right" :style="{ color: rcolor || defaultColor }">{{ rtext }}</span>
      </div>
    </div>
    <!-- 预览图片容器 -->
    <div class="image-preview-container">
      <div class="image-preview-bg">
        <div
            v-for="(image, index) in props.images"
            :key="image.id"
            :style="{
            'background-image': `url(${image.link})`,
            width: `${100 / props.images.length}%`
          }"
            class="image-preview-bg-part"
        ></div>
      </div>
      <div class="image-preview-mask"></div>
      <div class="image-preview-wrapper">
        <div
            v-for="(image, index) in props.images"
            :key="image.id"
            class="preview-item"
            ref="previewItems"
        >
          <img
              :src="image.link"
              :alt="image.text"
              @click="selectImage(index)"
              :class="{
              'image-preview': true,
              'preview-active': index === currentIndex
            }"
          />
        </div>
        <div
            class="active-indicator"
            :style="{
            left: `${indicatorPosition.left}px`,
            width: `${indicatorPosition.width}px`
          }"
        ></div>
      </div>
      <span class="side-text left desktop-only" :style="{ color: lcolor || defaultColor }">{{ ltext }}</span>
      <span class="side-text right desktop-only" :style="{ color: rcolor || defaultColor }">{{ rtext }}</span>
    </div>
  </div>
</template>

<style scoped>
.textbox-container {
  display: flex;
  gap: 10px;
  width: 100%;
}

.left-textbox,
.right-textbox {
  flex: 1;
}



.image-slider-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  position: relative;
}

.image-slider-bg {
  position: relative;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 1rem;
  overflow: hidden;
  filter: brightness(1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); /* 添加背景图阴影 */
  /* 添加过渡效果 */
  transition: background-image 0.5s ease-in-out;
}

.image-slider-glass {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.slider-image {
  max-width: calc(100% - 120px);
  height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  max-height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.slider-image.active {
  opacity: 1;
}

.arrow-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

/* 暗色背景上的按钮 */
.arrow-btn[data-bright="low"] {
  background: rgba(128, 128, 128, 0.4);
  color: #e0e0e0; /* 浅灰色图标 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 半透明白色边框 */
  box-shadow:
      inset 0 0 8px rgba(255, 255, 255, 0.3), /* 内部发光 */
      0 4px 12px rgba(0, 0, 0, 0.1); /* 外部阴影 */
}

/* 亮色背景上的按钮 */
.arrow-btn[data-bright="high"] {
  background: rgba(220, 220, 220, 0.6); /* 浅灰色背景 */
  color: #444; /* 深灰色图标 */
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.arrow-btn:hover {
  transform: scale(1.1);
}

.arrow-btn[data-bright="low"]:hover {
  background: rgba(128, 128, 128, 0.6);
  border-color: rgba(255, 255, 255, 0.7);
}

.arrow-btn[data-bright="high"]:hover {
  background: rgba(220, 220, 220, 0.8);
}

.arrow-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
}

.arrow-left svg {
  transform: translateX(-1px);
}

.arrow-right svg {
  transform: translateX(1px);
}

/* 预览图片容器样式 */
.image-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 1rem;
}

/* 预览背景样式 */
.image-preview-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 0.5rem;
}

.image-preview-bg-part {
  background-size: cover;
  background-position: center;
  height: 100%;
}

.image-preview-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* 预览图片包裹器样式 */
.image-preview-wrapper {
  display: flex;
  gap: 8px; /* 设置图片之间的缝隙 */
  padding: 8px; /* 给包裹器添加内边距 */
  z-index: 1;
  justify-content: center;
}

/* 预览图片样式 */
.image-preview {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

/* 添加激活状态缩放 */
.preview-item .image-preview {
  transform: scale(1);
}

.preview-item .image-preview.preview-active {
  transform: scale(1.05);
}

.image-preview:hover {
  transform: scale(1.1);
}

.side-text {
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.side-text.left {
  left: 15px;
}

.side-text.right {
  right: 15px;
}

.preview-item {
  position: relative;
  transition: transform 0.3s ease; /* 添加容器过渡 */
}

/* 小横条 */
/* 修改激活指示器样式 */
.active-indicator {
  position: absolute;
  bottom: 1.5px;
  height: 3px;
  background-color: #43a1ff;
  border-radius: 3px;
  transition: all 0.3s ease; /* 添加过渡动画 */
  /* 宽度调整在上面updateIndicatorPosition函数部分 */
}

/* 添加容器相对定位 */
.image-preview-wrapper {
  position: relative;
  display: flex;
  gap: 8px;
  padding: 8px;
  z-index: 1;
  justify-content: center;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}

@media (max-width: 767px) {
  .desktop-only {
    display: none;
  }
  .slider-image {
    max-width: 100%; /* 让图片在移动端忽略两侧按钮空间，充满容器 */
  }
  .image-slider-glass {
    justify-content: center; /* 让子元素水平居中 */
    align-items: center; /* 让子元素垂直居中 */
  }
  .arrow-btn {
    position: absolute; /* 让按钮脱离文档流 */
    top: 50%; /* 垂直居中 */
    transform: translateY(-50%); /* 精确垂直居中 */
  }

  .arrow-btn:hover,
  .arrow-btn:active,
  .arrow-btn:focus {
    transform: translateY(-50%) scale(1); /* 确保无缩放和位移 */
  }

  .arrow-left {
    left: 1rem; /* 左边按钮距离左侧的距离 */
  }
  .arrow-right {
    right: 1rem; /* 右边按钮距离右侧的距离 */
  }
}

.mobile-only {
  padding: 10px;
}

</style>