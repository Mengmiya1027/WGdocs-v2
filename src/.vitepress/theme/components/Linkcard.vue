<script setup lang="ts">
import { ref, onMounted, withDefaults, computed } from 'vue'

// 定义信息卡片属性，包含title、背景图片和链接参数
const props = withDefaults(defineProps<{
  bgImage: string  // 背景图片链接
  title: string    // 标题文本
  link: string     // 链接地址
  tcolor?: string  // 标题颜色
}>(), {
  tcolor: '#333'  // 默认标题颜色
})

// 状态管理：背景图链接有效性
const isBgValid = ref<boolean | null>(null)
// 状态管理：是否为当前页面链接
const isCurrentPage = ref(false)

// 检查背景图片链接有效性和当前页面链接
onMounted(() => {
  // 检查背景图
  const bgImg = new Image()
  bgImg.src = props.bgImage
  bgImg.onload = () => { isBgValid.value = true }
  bgImg.onerror = () => { isBgValid.value = false }

  // 检查是否为当前页面链接
  checkIfCurrentPage()
})

// 提取域名（忽略www.前缀）
const extractDomain = (url: string) => {
  try {
    // 如果url没有协议，添加http://以便URL构造函数解析
    const fullUrl = url.startsWith('http') ? url : `http://${url}`
    const parsedUrl = new URL(fullUrl)
    let domain = parsedUrl.hostname
    // 移除www.前缀
    if (domain.startsWith('www.')) {
      domain = domain.slice(4)
    }
    return domain
  } catch (error) {
    console.error('解析URL失败:', error)
    return url
  }
}

// 检查是否为当前页面链接
const checkIfCurrentPage = () => {
  if (!props.link) {
    isCurrentPage.value = false
    return
  }

  const currentDomain = extractDomain(window.location.href)
  const linkDomain = extractDomain(props.link)

  isCurrentPage.value = currentDomain === linkDomain
}

// 计算按钮链接（确保有协议）
const buttonLink = computed(() => {
  if (!props.link) return '#'
  return props.link.startsWith('http') ? props.link : `https://${props.link}`
})
</script>

<template>
  <div class="info-card">
    <!-- 背景图容器 -->
    <div class="bg-wrapper" :style="{ 'background-image': `url(${bgImage})` }">
      <!-- 毛玻璃容器 -->
      <div class="card-container">
        <!-- 标题 - 左上角 -->
        <h3 class="card-title" :style="{ color: tcolor }">{{ title }}</h3>

        <!-- 内容容器：图片和按钮 -->
        <div class="content-wrapper">
          <!-- 背景图展示区域 - 左对齐 -->
          <div class="image-container">
            <template v-if="isBgValid === true">
              <img
                  :src="bgImage"
                  alt="展示图"
                  class="content-image"
              >
            </template>
            <!-- 背景图无效时显示提示 -->
            <template v-if="isBgValid === false">
              <div class="invalid-bg">⚠️ 背景图链接无效</div>
            </template>
          </div>

          <!-- 右侧按钮区域 -->
          <div class="button-container">
            <a
                :href="isCurrentPage ? '#' : buttonLink"
                class="action-button"
                :class="{ 'current-page': isCurrentPage }"
                target="_blank"
                :disabled="isCurrentPage"
            >
              <!-- 圆角勾 SVG (当前页面) -->
              <template v-if="isCurrentPage">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M748.864 302.528a49.024 49.024 0 0 1 68.288-1.28 46.656 46.656 0 0 1 5.952 61.44l-4.608 5.44-346.56 353.344a49.024 49.024 0 0 1-64.384 4.608l-5.504-4.864-196.8-203.264a46.72 46.72 0 0 1 1.792-66.88A49.024 49.024 0 0 1 270.08 448l5.312 4.736 162.048 167.232L748.8 302.528z" fill="#FFFFFF"></path>
                </svg>
              </template>
              <!-- 圆角箭头 SVG (非当前页面) -->
              <template v-else>
                <!-- 为箭头添加专用类名 -->
                <svg class="icon arrow-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M213.333333 554.666667h128a42.666667 42.666667 0 0 0 0-85.333334H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V78.762667a21.333333 21.333333 0 0 1 31.616-18.688l787.712 433.237333a21.333333 21.333333 0 0 1 0 37.376L159.616 963.925333A21.333333 21.333333 0 0 1 128 945.237333V640a85.333333 85.333333 0 0 1 85.333333-85.333333z" fill="#FFFFFF"></path>
                </svg>
              </template>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-card {
  width: 100%;
  aspect-ratio: 3/1;
  padding: 10px;
  box-sizing: border-box;
}

.card-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  /* 毛玻璃效果 */
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative; /* 为标题定位提供基准 */
}

.card-container:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* 标题样式 - 左上角 */
.card-title {
  margin: 0 0 10px 0;
  padding: 0;
  position: absolute;
  top: 10px;
  left: 15px; /* 向右挪动5px */
  z-index: 10; /* 确保标题在最上层 */
}

/* 内容容器：包含图片和按钮 */
.content-wrapper {
  width: 100%;
  height: calc(100% - 40px); /* 减去标题高度和间距 */
  margin-top: 30px; /* 为标题留出空间 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 图片容器 - 左对齐 */
.image-container {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: flex-start; /* 顶部对齐 */
  justify-content: flex-start; /* 左对齐 */
  overflow: hidden;
  padding-left: 5px; /* 轻微左内边距，避免贴边 */
}

/* 按钮容器 - 右侧中间 */
.button-container {
  width: 150px; /* 固定宽度 */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  transform: translateX(-20%) translateY(-5%) ; /* 向左位移10% */
}

/* 内容图片样式 - 左对齐、带模糊、保持原比例等比缩放 */
.content-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 保持比例，不裁剪 */
  transition: all 0.3s ease;
  border-radius: 12px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.3);
}

.content-image:hover {
  transform: scale(1.01);
}

/* 勾图标样式 */
.icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* 箭头图标样式 */
.arrow-icon {
  transform: scale(0.65); /* 缩小到65%大小 */
}

/* 圆形按钮样式 */
.action-button {
  width: 100px;
  height: 100px;
  border-radius: 50%; /* 圆形 */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285f4;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 60px;
}

/* 去除按钮放大时文字变色（移除hover时的背景色变化） */
.action-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: white;
}

/* 当前页面按钮样式（禁用状态） */
.action-button.current-page {
  background-color: #34a853;
  cursor: default; /* 鼠标指针变为默认 */
  pointer-events: none; /* 禁用鼠标事件 */
}

/* 当前页面按钮去除悬停效果 */
.action-button.current-page:hover {
  transform: none; /* 取消缩放 */
  box-shadow: none; /* 取消阴影变化 */
}

/* 背景图容器样式 */
.bg-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.bg-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  z-index: -1;
}

.bg-wrapper:hover {
  transform: scale(1.01);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
}

.invalid-bg {
  color: #ff4d4f;
  font-size: 16px;
  padding: 20px;
}
@media (max-width: 500px) {
  .button-container {
    transform: translateX(10%) translateY(-20%);
  }
  .action-button {
    width: 60px;
    height: 60px;
  }
}
@media (min-width: 500px ) and (max-width: 700px) {
  .button-container {
    transform: translateX(-15%) translateY(-15%);
  }
  .action-button {
    width: 80px;
    height: 80px;
  }
}
@media (min-width: 700px ) and (max-width: 800px) {
  .button-container {
    transform: translateX(-20%) translateY(-15%);
  }
}
</style>