<template>
  <div class="starry-container">
    <!-- 星空背景外框 -->
    <div class="starry-border">
      <div class="content-wrapper">
        <!-- 基础路径文本 -->
        <span class="base-path">{{ currentDomain }}/resources/website/WG-WebGame/</span>

        <!-- 路径输入框 -->
        <input
            type="text"
            v-model="pathInput"
            class="path-input"
            placeholder="请输入路径..."
            @keyup.enter="goToGamePage"
        >
      </div>
    </div>

    <!-- 检查按钮（移至外框外部） -->
    <div class="button-container">
      <button
          class="check-btn"
          @mouseover="handleMouseOver"
          @mouseout="handleMouseOut"
          @click="goToGamePage"
          :disabled="!isInputValid"
      >
        检查答案
        <span class="arrow" :style="arrowStyle">→</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vitepress';
import { ref, reactive, computed, onMounted } from 'vue';

// 路由实例
const router = useRouter();

// 输入框绑定值
const pathInput = ref('');

// 鼠标交互状态
const btnState = reactive({
  scaled: false,
  shadowSize: '10px',
  bgOpacity: 0.9,
  arrowTranslate: '0'
});

// 计算箭头样式
const arrowStyle = computed(() => ({
  transform: `translateX(${btnState.arrowTranslate})`,
  transition: 'transform 0.3s ease'
}));

// 获取当前域名（带协议头）
const currentDomain = ref('');
onMounted(() => {
  if (typeof window !== 'undefined') {
    currentDomain.value = window.location.origin;
  } else {
    currentDomain.value = 'http://localhost:5173';
  }
});

// 鼠标悬停处理
const handleMouseOver = () => {
  if (!isInputValid.value) return; // 在函数内部进行条件判断
  btnState.scaled = true;
  btnState.shadowSize = '15px';
  btnState.bgOpacity = 1;
  btnState.arrowTranslate = '3px';
};

// 鼠标离开处理
const handleMouseOut = () => {
  if (!isInputValid.value) return; // 在函数内部进行条件判断
  btnState.scaled = false;
  btnState.shadowSize = '10px';
  btnState.bgOpacity = 0.9;
  btnState.arrowTranslate = '0';
};

const isInputValid = computed(() => {
  // 检查是否包含非空格字符
  return pathInput.value.trim() !== '';
});

// 跳转处理函数
const goToGamePage = () => {
  if (!pathInput.value.trim()) {
    return;
  }

  // 构建完整路径
  const fullPath = `/resources/website/WG-WebGame/${pathInput.value.trim()}`
      .replace(/\/+/g, '/');

  router.go(fullPath);
};
</script>

<style scoped>
.starry-container {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 外框与按钮之间的间距 */
}

.starry-border {
  position: relative;
  border: 5px solid rgb(207, 207, 207);
  border-radius: 20px;
  padding: 15px;
  overflow: hidden;
  /* 移除原背景图设置 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.3);
  /* 移除 backdrop-filter，因为不再需要模糊背后内容 */
}

/* 新增伪元素作为模糊背景层 */
.starry-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.chatopens.chat/burrito-nux/640.webp');
  background-size: cover;
  background-position: center;
  filter: blur(20px); /* 模糊背景图 */
  z-index: 0; /* 放在内容下方 */
  opacity: 0.5; /* 调整透明度避免过于模糊 */
}

/* 内容容器 */
.content-wrapper {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
}

/* 优化字体样式 */
.base-path {
  color: rgb(255, 255, 255);
  font-weight: 700; /* 加粗文字，数值越大越粗（400正常，700加粗） */
  font-family: 'HarmonyOS Sans SC', 'HarmonyOS Sans SC', 'HarmonyOS Sans SC', Arial, sans-serif;
  font-size: 14px;
  padding: 8px 0;
}

/* 输入框样式优化 */
.path-input {
  flex: 1;
  min-width: 150px;
  padding: 5px 5px;
  border: 2px solid rgb(67, 161, 255);
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.71);
  color: #807f7f;
  font-weight: 500;
  font-family: 'HarmonyOS Sans SC', 'HarmonyOS Sans SC', monospace; /* 等宽字体更适合路径输入 */
  font-size: 14px;
  transition: all 0.3s ease;
}

.path-input:focus {
  outline: none;
  border-color: rgba(66, 133, 244, 0.8);
  box-shadow: 0 0 0 2px rgba(41, 118, 250, 0.51);
}

/* 按钮容器 */
.button-container {
  text-align: center; /* 按钮居中显示 */
}

/* 按钮样式优化 */
.check-btn {
  background-color: v-bind('`rgba(66, 133, 244, ${btnState.bgOpacity})`');
  color: white;
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: v-bind('`0 0 ${btnState.shadowSize} rgba(66, 133, 244, 0.7)`');
  transform: v-bind('btnState.scaled ? "scale(1.05)" : "scale(1)"');
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 500;
}

.check-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: auto !important; /* 确保禁用状态下仍能响应鼠标事件以显示cursor */
}

.check-btn:disabled:hover .arrow {
  transform: translateX(0) !important; /* 禁用状态下箭头不移动 */
}

.arrow {
  margin-left: 8px;
  font-size: 18px;
}

/* 星星脉动动画 */
@keyframes starPulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.45; }
}
</style>