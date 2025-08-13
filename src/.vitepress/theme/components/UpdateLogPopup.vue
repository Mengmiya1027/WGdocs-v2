<template>
  <ClientOnly>
    <div class="update-log-popup" v-if="showPopup">
      <!-- 遮罩层 -->
      <div class="popup-overlay" @click="closePopup"></div>

      <!-- 弹窗主体 -->
      <div class="popup-content">
        <!-- 头部区域 -->
        <div class="popup-header">
          <div class="header-text">
            <h3 class="popup-title">
              {{ isFirstVisit ? '🥰 欢迎来到WGdocs' : '🚀 更新提醒' }}
            </h3>
            <p class="popup-subtitle">
              <!-- 首次访问副标题 -->
              <template v-if="isFirstVisit">
                这里是WGdocs v2，欢迎你的访问！<br>来看看近期更新：
              </template>

              <!-- 更新提醒副标题 -->
              <template v-else>
                你上一次来到WGdocs是在{{ lastVisitedVersion }}，
                <template v-if="lastVersionDate">
                  更新日期为{{ lastVersionDate }}，<br>
                  这段时间里，WGdocs又迎来了新的更新！
                </template>
                <template v-else>
                  这个版本太超前啦，我还没学过呢！<br>
                  这段时间里，WGdocs又迎来了新的更新！
                </template>
              </template>
            </p>
          </div>
          <button class="close-btn" @click="closePopup" aria-label="关闭">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- 选项卡导航 -->
        <div class="tabs-container" v-if="displayVersions.length > 1">
          <div class="tabs-nav" ref="tabsNav">
            <!-- 选项卡项 -->
            <div
                class="tab-item"
                v-for="(version, index) in displayVersions"
                :key="index"
                :class="{ active: activeTabIndex === index }"
                @click="activeTabIndex = index"
            >
              <span class="tab-version">{{ version.version }}</span>
              <!-- 移动端日期显示 -->
              <span class="tab-date mobile-date">
                <!-- 月份动态调整字号 -->
                <span
                    class="month"
                    :style="{'font-size': String(formatMonth(version.date)).length === 1 ? '16px' : '14px'}"
                >
                  {{ formatMonth(version.date) }}
                </span>
                <!-- 动态调整日期字体大小 -->
                <span
                    class="day"
                    :style="{'font-size': String(formatDay(version.date)).length === 2 ? '15px' : '18px'}"
                >
                  {{ formatDay(version.date) }}
                </span>
              </span>
              <!-- 桌面端日期显示 -->
              <span class="tab-date desktop-date">{{ version.date }}</span>
            </div>
          </div>
          <!-- 滚动指示器（放在容器内但与tabs-nav同级） -->
          <div class="tabs-scroll-indicator" v-if="hasScrollableTabs">
            <div class="left-shadow" v-if="scrollLeft > 0"></div>
            <div class="right-shadow" v-if="!isScrolledToEnd"></div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="popup-body">
          <template v-if="displayVersions.length === 1">
            <div class="single-version-layout">
              <div class="version-badge">{{ currentVersion.version }}</div>
              <div class="update-log-content" v-html="renderedContent"></div>
            </div>
          </template>
          <template v-else>
            <div class="update-log-content" v-html="renderedContent"></div>
          </template>

          <!-- 空状态提示 -->
          <div class="empty-state" v-if="!currentVersion.content">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="empty-icon">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>暂无更新日志内容</p>
          </div>
        </div>

        <!-- 底部区域 -->
        <div class="popup-footer">
          <button
              class="show-all-btn"
              v-if="isFirstVisit && displayVersions.length < allVersions.length"
              @click="handleShowAll"
          >
            查看全部更新
          </button>
          <button class="confirm-btn" @click="closePopup">
            {{ isFirstVisit ? '开始使用' : '我知道了' }}
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: 'UpdateLogPopup',
  data() {
    return {
      allVersions: [],
      lastVisitedVersion: null,
      showPopup: false,
      isFirstVisit: false,
      showAllVersions: false,
      activeTabIndex: 0,
      scrollLeft: 0,
      loading: true,
      error: null,
      tabsNav: null, // 用于获取选项卡DOM元素
      isScrollBound: false // 标记事件是否已绑定
    };
  },
  computed: {
    displayVersions() {
      if (this.isFirstVisit && !this.showAllVersions) {
        return this.allVersions.slice(0, 3);
      }

      if (!this.isFirstVisit && this.lastVisitedVersion) {
        const lastIndex = this.allVersions.findIndex(
            item => item.version === this.lastVisitedVersion
        );
        return lastIndex !== -1 ? this.allVersions.slice(0, lastIndex) : this.allVersions;
      }

      return this.allVersions;
    },

    currentVersion() {
      // 修复：确保数组存在且索引有效
      if (!Array.isArray(this.displayVersions) || this.displayVersions.length === 0) {
        return {}; // 空数组时返回空对象
      }
      // 索引越界时取第一个元素
      const validIndex = this.activeTabIndex >= 0 && this.activeTabIndex < this.displayVersions.length
          ? this.activeTabIndex
          : 0;
      return this.displayVersions[validIndex] || {};
    },

    // 获取上次上次版本的日期
    lastVersionDate() {
      if (!this.lastVisitedVersion) return null;
      const lastVersion = this.allVersions.find(
          item => item.version === this.lastVisitedVersion
      );
      return lastVersion ? lastVersion.date : null;
    },

    renderedContent() {
      if (!this.currentVersion.content) return '';

      // 简易Markdown转换（适配VitePress常用语法）
      let content = this.currentVersion.content
          // 处理标题
          .replace(/#{1,4}\s+(.*?)\n/g, (match, text) => {
            const hLevel = match.trim().split(' ')[0].length;
            return `<h${hLevel}>${text}</h${hLevel}>`;
          })
          // 处理无序列表
          .replace(/^- (.*?)\n/gm, '<li>$1</li>')
          .replace(/(<li>.*?<\/li>)+/gs, '<ul>$&</ul>')
          // 处理有序列表
          .replace(/^\d+\. (.*?)\n/gm, '<li>$1</li>')
          .replace(/(<li>.*?<\/li>)+/gs, (match) => {
            return match.includes('<ul>') ? match : `<ol>${match}</ol>`;
          })
          // 处理粗体
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // 处理斜体
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          // 处理链接
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

      return content;
    },

    hasScrollableTabs() {
      return this.displayVersions.length > 1;
    },

    isScrolledToEnd() {
      if (!this.tabsNav) {
        console.log('isScrolledToEnd: tabsNav 不存在');
        return true;
      }
      // 使用Math.ceil确保整数比较，避免浮点数精度问题
      const sum = Math.ceil(this.tabsNav.scrollLeft + this.tabsNav.clientWidth);
      const threshold = this.tabsNav.scrollWidth - 20;
      const result = sum >= threshold;
      console.log('===== isScrolledToEnd 计算 =====');
      console.log('scrollLeft + clientWidth (向上取整):', sum);
      console.log('scrollWidth - 20 (实际阈值):', threshold); // 修复日志显示
      console.log('计算结果:', result);
      return result;
    }
  },
  watch: {
    // 监听 displayVersions 变化（因为 tabs-nav 的 v-if 依赖它）
    displayVersions: {
      handler() {
        this.$nextTick(() => {
          console.log('===== displayVersions 变化 =====');
          this.rebindScrollEvent(); // 重新绑定事件
        });
      },
      immediate: true // 初始化时执行一次
    }
  },
  async mounted() {
    try {
      // 获取上次访问版本
      this.lastVisitedVersion = localStorage.getItem('lastVisitedVersion');
      this.isFirstVisit = !this.lastVisitedVersion;
      console.log('===== 初始化信息 =====');
      console.log('lastVisitedVersion:', this.lastVisitedVersion);
      console.log('isFirstVisit:', this.isFirstVisit);

      // 加载更新日志数据
      const response = await fetch('/assets/data/Version-Info.json');

      if (!response.ok) {
        throw new Error(`加载失败: ${response.statusText}`);
      }

      let versions = await response.json();
      if (!Array.isArray(versions)) versions = [];

      // 排序版本
      this.allVersions = this.sortVersions(versions);
      console.log('===== 加载版本数据 =====');
      console.log('allVersions 长度:', this.allVersions.length);

      // 检查是否需要显示弹窗
      this.checkIfNeedShowPopup();
      console.log('showPopup 初始状态:', this.showPopup);

    } catch (err) {
      this.error = `加载更新日志失败: ${err.message}`;
      console.error(this.error);
    } finally {
      this.loading = false;
    }
  },
  beforeUnmount() {
    // 彻底移除事件
    if (this.tabsNav && this.isScrollBound) {
      this.tabsNav.removeEventListener('scroll', this.handleTabsScroll);
      this.isScrollBound = false;
      console.log('===== 组件卸载，移除滚动事件 =====');
    }
  },
  methods: {
    formatMonth(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      // 修改：直接返回数字月份，不加"月"字
      return (date.getMonth() + 1).toString();
    },

    formatDay(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.getDate();
    },

    sortVersions(versions) {
      return [...versions].sort((a, b) => {
        // 按日期排序（新日期在前）
        if (a.date !== b.date) {
          return a.date < b.date ? 1 : -1;
        }
        // 同日期按原顺序
        return versions.indexOf(a) - versions.indexOf(b);
      });
    },

    checkIfNeedShowPopup() {
      if (this.allVersions.length === 0) return;

      const latestVersion = this.allVersions[0].version;

      // 首次访问一定显示
      if (this.isFirstVisit) {
        this.showPopup = true;
        return;
      }

      // 非首次访问，版本不同则显示
      if (this.lastVisitedVersion !== latestVersion) {
        this.showPopup = true;
      }
    },

    closePopup() {
      this.showPopup = false;

      // 记录当前最新版本
      if (this.allVersions.length > 0) {
        const latestVersion = this.allVersions[0].version;
        localStorage.setItem('lastVisitedVersion', latestVersion);
      }
    },

    // 重新绑定滚动事件（核心修复）
    rebindScrollEvent() {
      // 先移除旧事件（防止重复绑定）
      if (this.tabsNav && this.isScrollBound) {
        this.tabsNav.removeEventListener('scroll', this.handleTabsScroll);
        this.isScrollBound = false;
        console.log('===== 移除旧滚动事件 =====');
      }

      // 获取最新的 tabsNav 元素（可能因 v-if 重新渲染）
      this.tabsNav = this.$refs.tabsNav;

      // 绑定新事件
      if (this.tabsNav && !this.isScrollBound) {
        this.tabsNav.addEventListener('scroll', this.handleTabsScroll);
        this.isScrollBound = true;
        // 初始化时强制触发一次滚动检测（防止初始状态错误）
        this.handleTabsScroll({ target: this.tabsNav });
        console.log('===== 绑定新滚动事件 =====');
        console.log('tabsNav 初始 scrollLeft:', this.tabsNav.scrollLeft);
        console.log('tabsNav scrollWidth:', this.tabsNav.scrollWidth);
        console.log('tabsNav clientWidth:', this.tabsNav.clientWidth);
      } else if (!this.tabsNav) {
        console.log('===== rebindScrollEvent: tabsNav 不存在 =====');
      }
    },

    handleTabsScroll(e) {
      if (!e.target) {
        console.log('handleTabsScroll: e.target 不存在');
        return;
      }
      // 强制更新 scrollLeft（确保同步）
      this.scrollLeft = e.target.scrollLeft;
      // 调试：确认滚动值是否变化
      console.log('===== 滚动事件触发 =====');
      console.log('当前 scrollLeft:', this.scrollLeft);
      console.log('当前 this.tabsNav.scrollLeft + this.tabsNav.clientWidth:', this.tabsNav.scrollLeft + this.tabsNav.clientWidth);
      console.log('scrollWidth - 20:', this.tabsNav.scrollWidth - 20);
      console.log('是否需要显示左阴影:', this.scrollLeft > 0);
      console.log('是否滚动到最右:', this.isScrolledToEnd);
    },
    handleShowAll() {
      // 关闭弹窗
      this.showPopup = false;
      // 记录当前最新版本（保持原有的本地存储逻辑）
      if (this.allVersions.length > 0) {
        const latestVersion = this.allVersions[0].version;
        localStorage.setItem('lastVisitedVersion', latestVersion);
      }
      // 重定向到 /guide/new
      window.location.href = '/guide/new';
    },
  }
};
</script>

<style scoped>
/* 基础样式 */
.update-log-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
}

/* 遮罩层 */
.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  transition: opacity 0.2s ease;
}

/* 弹窗主体 */
.popup-content {
  position: relative;
  width: 100%;
  max-width: 850px;
  background-color: rgba(255, 255, 255, 0.95); /* 轻微透明 */
  border-radius: 22px; /* 圆角上调10px */
  box-shadow: 0 8px 30px rgba(128, 0, 128, 0.15), 0 0 0 1px rgba(128, 0, 128, 0.05); /* 紫色发光效果 */
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(128, 0, 128, 0.1);
}

/* 头部区域 */
.popup-header {
  padding: 20px 24px;
  border-bottom: 1px solid rgba(128, 0, 128, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.header-text {
  flex: 1;
  min-width: 0; /* 防止文本溢出 */
}

.popup-title {
  margin: 0 0 10px 0;
  font-size: 28px; /* 大幅增大标题 */
  color: #333;
  font-weight: 700; /* 粗体 */
  line-height: 36px;
}

.popup-subtitle {
  margin: 0;
  font-size: 16px; /* 增大副标题 */
  color: #807f7f;
  line-height: 24px;
  white-space: normal;
  word-wrap: break-word;
}

/* 副标题换行后的行间距调整 */
.popup-subtitle br {
  line-height: 1.6;
}

.close-btn {
  background: rgba(255, 255, 255, 0.8); /* 轻微透明 */
  border: 1px solid rgba(128, 0, 128, 0.1);
  cursor: pointer;
  color: #666;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px; /* 圆角上调10px */
  transition: all 0.2s;
  padding: 0;
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 2px 8px rgba(128, 0, 128, 0.05); /* 轻微发光效果 */
}

.close-btn:hover {
  background-color: #fff;
  color: #333;
  box-shadow: 0 2px 12px rgba(128, 0, 128, 0.1);
  transform: translateY(-1px);
}

/* 新增容器样式 */
.tabs-container {
  position: relative; /* 作为阴影的定位父元素 */
  overflow: hidden; /* 裁剪超出容器的阴影 */
}

/* 选项卡导航 */
.tabs-nav {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 6px 16px 6px; /* 合并内边距，保留底部空间给滚动条 */
  border-bottom: 1px solid rgba(128, 0, 128, 0.08); /* 底部线条 */
  background-color: rgba(255, 255, 255, 0.9);
  min-height: 64px;
  align-items: center;
  scrollbar-width: thin; /* Firefox 滚动条宽度 */
  scrollbar-color: rgba(147, 51, 234, 0.3) transparent; /* Firefox 滑块+轨道 */
}

/* 自定义水平滚动条样式（WebKit浏览器） */
.tabs-nav::-webkit-scrollbar {
  height: 6px; /* 滚动条粗细（根据需要调整，20px太粗建议6-8px） */
}

.tabs-nav::-webkit-scrollbar-track {
  background: transparent; /* 隐藏轨道 */
  border-radius: 3px;
}

.tabs-nav::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.3);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.tabs-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.5);
}

.tabs-scroll-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.tabs-scroll-indicator .left-shadow {
  position: absolute;
  left: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(to right, rgb(255, 255, 255), transparent);
}

.tabs-scroll-indicator .right-shadow {
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(to left, rgb(255, 255, 255), transparent);
}

.tab-item {
  padding: 12px 20px;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-bottom-color 0.2s ease, background-color 0.2s ease; /* 修改此行 */
  margin: 0 4px;
  font-size: 16px;
  color: #666;
  border-radius: 14px 14px 3px 3px;
}

.tab-item.active {
  border-bottom-color: #9333ea; /* 紫色主色调 */
  color: #9333ea;
  font-weight: 600;
  background-color: rgba(147, 51, 234, 0.1);
}

.tab-item:hover:not(.active) {
  color: #333;
  background-color: rgba(147, 51, 234, 0.03);
}

.tab-version {
  display: inline-block;
  margin-right: 10px;
}

.tab-date {
  display: inline-block;
  font-size: 14px; /* 增大日期文字 */
  color: #888;
}

/* 日期显示适配 */
.mobile-date {
  display: none;
}

/* 内容区域 */
.popup-body {
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  line-height: 1.8;
  background-color: rgba(255, 255, 255, 0.95);
  transition: height 0.3s ease; /* 添加此行 */
}

.single-version-layout {
  display: flex;
  gap: 16px;
  align-items: center; /* 添加垂直居中对齐 */
}

.version-badge {
  background-color: #9333ea;
  color: white;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  min-width: 120px;
  text-align: center;
}

.single-version-layout .update-log-content {
  flex: 1; /* 右侧内容区域占据剩余空间 */
  word-wrap: break-word; /* 内容过长时自动换行 */
  white-space: normal; /* 确保文本正常换行 */
}

.update-log-content {
  color: #535353;
  font-size: 17px; /* 增大内容文字 */
}

.update-log-content h1,
.update-log-content h2,
.update-log-content h3,
.update-log-content h4 {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  color: #1a1a1a;
  font-weight: 600;
}

.update-log-content h1 {
  font-size: 1.8em;
}

.update-log-content h2 {
  font-size: 1.5em;
}

.update-log-content h3 {
  font-size: 1.3em;
}

.update-log-content ul,
.update-log-content ol {
  margin: 1em 0;
  padding-left: 1.8em;
}

.update-log-content li {
  margin-bottom: 0.8em;
}

.update-log-content p {
  margin: 1.2em 0;
}

.update-log-content strong {
  color: #1a1a1a;
  font-weight: 600;
}

.update-log-content em {
  color: #666;
}

.update-log-content a {
  color: #9333ea; /* 紫色链接 */
  text-decoration: none;
  font-weight: 500;
}

.update-log-content a:hover {
  text-decoration: underline;
}

/* 空状态 */
.empty-state {
  color: #777;
  text-align: center;
  padding: 70px 20px;
  font-size: 16px; /* 增大空状态文字 */
}

.empty-icon {
  margin-bottom: 20px;
  color: #ddd;
}

/* 底部区域 */
.popup-footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(128, 0, 128, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  background-color: rgba(255, 255, 255, 0.9); /* 轻微透明 */
}

.show-all-btn {
  padding: 10px 20px;
  background-color: rgba(255, 255, 255, 0.85); /* 轻微透明 */
  color: #666;
  border: 1px solid rgba(128, 0, 128, 0.15);
  border-radius: 16px; /* 圆角上调10px */
  cursor: pointer;
  font-size: 16px; /* 增大按钮文字 */
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(128, 0, 128, 0.05); /* 轻微发光效果 */
}

.show-all-btn:hover {
  background-color: #fff;
  border-color: rgba(128, 0, 128, 0.2);
  color: #333;
  box-shadow: 0 2px 12px rgba(128, 0, 128, 0.1);
  transform: translateY(-1px);
}

.confirm-btn {
  padding: 10px 24px;
  background-color: #9333ea; /* 紫色主色调 */
  color: white;
  border: none;
  border-radius: 15px; /* 圆角上调10px */
  cursor: pointer;
  font-size: 16px; /* 增大按钮文字 */
  font-weight: 600;
  transition: all 0.2s;
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(147, 51, 234, 0.1); /* 紫色发光效果 */
}

.confirm-btn:hover {
  background-color: #8b2bd9;
  box-shadow: 0 6px 20px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.15);
  transform: translateY(-1px);
}

/* 滚动条样式 */
.popup-body::-webkit-scrollbar {
  width: 8px;
}

.popup-body::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 4px;
}

.popup-body::-webkit-scrollbar-thumb {
  background: rgba(147, 51, 234, 0.2);
  border-radius: 4px;
}

.popup-body::-webkit-scrollbar-thumb:hover {
  background: rgba(147, 51, 234, 0.3);
}

/* 响应式调整 */
@media (max-width: 600px) {
  .popup-header {
    padding: 16px 20px;
  }

  .popup-title {
    font-size: clamp(1px, 24px, 40px);
    white-space: nowrap;
    margin-bottom: 8px;
  }

  .popup-subtitle {
    font-size: 15px;
    line-height: 22px;
  }

  .popup-body {
    padding: 20px;
  }

  .tabs-nav {
    padding: 6px 8px; /* 减小内边距 */
  }

  /* 选项卡项 - 变为正方形 */
  .tab-item {
    width: 56px;
    height: 56px;
    padding: 0;
    margin: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    /* 添加过渡动画核心属性 */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); /* 统一过渡所有可动画属性 */
    will-change: width, background-color, border-color; /* 优化动画性能 */
  }
  .tab-item.active{
    background-color: rgba(147, 51, 234, 0.15);
    transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); /* 稍微调整曲线让展开更自然 */
    will-change: width, background-color, border-color; /* 优化动画性能 */
  }

  /* 隐藏版本号 */
  .tab-version {
    display: none;
  }

  /* 日期容器 - 对角线布局 */
  .tab-date {
    width: 100%;
    height: 100%;
    position: relative;
  }

  /* 对角线分隔线 */
  .tab-date::before {
    content: '';
    position: absolute;
    top: 12px; /* 距离顶部12px */
    left: 12px; /* 距离左侧12px */
    width: calc(100% - 24px); /* 宽度减去左右间距 */
    height: calc(100% - 24px); /* 高度减去上下间距 */
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 50%, transparent 50%);
    z-index: -1;
  }

  /* 添加实际对角线 */
  .tab-date::after {
    content: '';
    position: absolute;
    top: 12px; /* 距离顶部12px */
    left: 11px; /* 距离左侧12px */
    width: calc(100% - 24px); /* 宽度减去左右间距 */
    height: calc(100% - 24px); /* 高度减去上下间距 */
    background: linear-gradient(135deg,
    transparent calc(50% - 2px),  /* 左侧透明区域 */
    rgba(147, 51, 234, 0.4) calc(50% - 2px),  /* 线条起始点 */
    rgba(147, 51, 234, 0.4) calc(50% + 2px),  /* 线条结束点 */
    transparent calc(50% + 2px)   /* 右侧透明区域 */
    );
    z-index: 1;
    border-radius: 3px; /* 对角线两端圆角 */
  }

  /* 月份 - 左上角三角形 */
  .tab-date .month {
    position: absolute;
    top: 8px;
    right: 31px;
    font-weight: 600;
    color: #9333ea;
  }

  /* 日期 - 右下角三角形 */
  .tab-date .day {
    position: absolute;
    bottom: 8px;
    left: 31px;
    font-weight: 700;
    color: #333;
  }

  .single-version-layout {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .version-badge {
    margin: 0 auto;
    width: auto;
    align-items: center;
    min-width: auto;
    padding: 8px 16px;
    font-size: 16px;
  }

  .show-all-btn, .confirm-btn {
    padding: 9px 18px;
    font-size: 15px;
  }

  .popup-content {
    border-radius: 20px;
  }

  /* 移动端日期显示控制 */
  .desktop-date {
    display: none;
  }

  .mobile-date {
    display: inline-block;
  }

  .tab-date .month {
    margin-right: 4px;
  }
  .tabs-nav {
    /* 允许容器横向扩展 */
    width: auto;
    min-width: 100%;
    /* 禁止内容换行 */
    flex-wrap: nowrap;
    /* 保留滚动能力 */
    overflow-x: auto;
    overflow-y: hidden;
  }

  /* 所有选项卡项禁止压缩 */
  .tab-item {
    flex-shrink: 0; /* 关键属性：禁止压缩 */
    width: 56px;
    height: 56px;
    /* 其他原有样式保持不变 */
  }

  /* 选中项特殊处理 - 自动宽度并禁止压缩 */
  .tab-item.active {
    flex-shrink: 0; /* 关键属性：选中项也禁止压缩 */
    width: auto; /* 自动适应内容宽度 */
    height: auto;
    padding: 12px 20px; /* 恢复内边距 */
    /* 恢复版本号和桌面端日期显示 */
  }

  /* 选中项显示版本号 */
  .tab-item.active .tab-version {
    display: inline-block;
    margin-right: 10px;
  }

  /* 选中项显示桌面端日期 */
  .tab-item.active .desktop-date {
    display: inline-block;
  }

  /* 选中项隐藏移动端日期样式 */
  .tab-item.active .mobile-date {
    display: none;
  }

  /* 移除选中项的对角线样式 */
  .tab-item.active .tab-date {
    position: static;
    width: auto;
    height: auto;
  }

  .tab-item.active .tab-date::before,
  .tab-item.active .tab-date::after {
    display: none;
  }

  /* 重置选中项的日期定位 */
  .tab-item.active .tab-date .month,
  .tab-item.active .tab-date .day {
    position: static;
    font-size: inherit;
    color: inherit;
    font-weight: inherit;
    margin: 0;
  }
}
</style>