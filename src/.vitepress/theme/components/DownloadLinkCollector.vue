<template>
  <div class="download-container">
    <div class="bg-wrapper" :style="bgImage ? { 'backgroundImage': `url(${bgImage})` } : {}">
      <div class="content-container">
        <h3 v-if="title" class="title" :style="{ color: tcolor || 'var(--vp-c-text-1)' }">{{ title }}</h3>
        <div v-for="(item, index) in filteredDownloads" :key="index"
             class="download-item" :class="{ disabled: !item.enable }">
          <a
              class="link-card"
              :href="item.enable ? item.link : 'javascript:void(0)'"
              :target="item.enable ? (newtab ? '_blank' : '') : ''"
              :style="{ flex: item.password ? '0 0 70%' : '1' }"
              @click="handleLinkClick($event, item)">
            <span class="link-text" v-html="item.text || item.link"></span>
            <span class="status">{{ item.enable ? '可用✅' : '不可用⛔️' }}</span>
          </a>
          <div v-if="item.password" class="password-section" style="flex: 0 0 30%">
            <button
                class="copy-btn"
                @click.stop="copyPassword(item.password, index)"
                :aria-label="`密码：${item.password}`">
              <span class="desktop-view">{{ copiedIndex === index ? '复制成功✓' : `密码：${item.password}` }}</span>
              <span class="mobile-view">{{ copiedIndex === index ? '复制成功✓' : '复制密码' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vitepress'

const props = defineProps({
  title: {
    type: String,
    default: '下载链接'
  },
  bgImage: {
    type: String,
    default: ''
  },
  bcolor: {
    type: String,
    default: ''
  },
  tcolor: {
    type: String,
    default: ''
  },
  newtab: {
    type: Boolean,
    default: true
  },
  downloads: {
    type: Array,
    required: true,
    validator: value => value.every(item => 'link' in item)
  }
})

const router = useRouter()
const copiedIndex = ref(-1)

const filteredDownloads = computed(() => {
  return props.downloads.map(item => ({
    text: item.link,
    enable: true,
    ...item
  }))
})

// 检查是否为外部链接
const isExternalLink = (path) => {
  return /^(?:[a-z]+:)?\/\//i.test(path) ||
      path.startsWith('mailto:') ||
      path.startsWith('tel:') ||
      path.startsWith('//') ||
      path.startsWith('http:') ||
      path.startsWith('https:')
}

// 处理链接点击
const handleLinkClick = (e, item) => {
  // 如果链接不可用，直接返回
  if (!item.enable) return

  // 如果是外部链接或特殊目标，不处理
  if (isExternalLink(item.link) ||
      (props.newtab) ||
      e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }

  // 阻止默认行为并使用 VitePress 路由
  e.preventDefault()
  router.go(item.link)
}

const copyPassword = async (password, index) => {
  try {
    await navigator.clipboard.writeText(password)
    copiedIndex.value = index
    setTimeout(() => {
      copiedIndex.value = -1
    }, 2000)
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}
</script>


<style scoped>
.desktop-view {
  display: inline;
}
.mobile-view {
  display: none;
}
.download-container {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}

.bg-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--vp-c-bg-alt); /* 无背景图时的默认颜色 */
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

.content-container {
  padding: 20px;
  backdrop-filter: blur(7px);
  background-color: rgba(255, 255, 255, 0.1);
  min-height: 150px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.title {
  text-align: left;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.download-item {
  display: flex;
  gap: 10px;
  margin: 0.5rem 0;
  align-items: stretch;
  width: 100%;
}

.link-card {
  min-height: 50px;
  padding: 0 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  flex: 0 0 70%;
  min-width: 0; /* 允许内容截断 */
  transition: transform 0.2s ease; /* 新增过渡效果 */
  transform-origin: center; /* 确保缩放中心点 */
}

.link-card:hover {
  transform: scale(1.02); /* 悬停放大效果 */
  z-index: 1; /* 防止被相邻元素遮挡 */
}

.disabled .link-card {
  opacity: 0.6;
  filter: grayscale(0.5);
  pointer-events: none;
  cursor: not-allowed;
}

.link-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
}

.password-section {
  flex: 0 0 30%;
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  padding-right: 10px;
}

.copy-btn {
  min-height: 50px;
  padding: 0 12px;
  border-radius: 8px;
  background: v-bind('bcolor || "var(--vp-button-brand-bg)"');
  color: var(--vp-button-brand-text);
  border: 1px solid var(--vp-button-brand-border);
  cursor: pointer;
  margin-left: 0;
  flex-grow: 1;
  transition: all 0.2s, transform 0.2s;
  transform-origin: center;
  font-size: clamp(12px, 2vw, 16px); /* 修改为自适应字体大小 */
}

.copy-btn:hover {
  transform: scale(1.05);
  opacity: 1 !important; /* 保持悬停时按钮可见 */
}

@media (max-width: 768px) {
  .desktop-view {
    display: none !important;
  }

  .mobile-view {
    display: inline !important;
  }

  .bg-wrapper:hover {
    transform: translateY(0);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  }

  .content-container {
    padding: 15px;
    min-height: 120px;
  }

  .download-item {
    min-height: 30px;
    /* 新增移动端布局修正 */
    flex-wrap: nowrap;
    gap: 10px;
  }

  .password-section {
    flex: 0 0 30% !important;
    padding-right: 10px;
  }

  .copy-btn {
    width: 100%;
    padding: 0 8px;
  }

  .link-card:hover {
    transform: none; /* 移动端禁用放大效果 */
  }

  .copy-btn:hover {
    transform: none;
  }
}
</style>