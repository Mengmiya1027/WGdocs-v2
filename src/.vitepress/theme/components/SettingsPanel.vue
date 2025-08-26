<template>
  <div class="settings-container">
    <!-- 顶部Logo和标题区域 -->
    <div v-if="logo || title" class="settings-header">
      <img v-if="logo" :src="logo" alt="Settings Logo" class="settings-logo" />
      <h1 v-if="title" class="settings-title">{{ title }}</h1>
    </div>

    <!-- 错误提示 -->
    <div v-if="loadingError" class="error-message">{{ loadingError }}</div>

    <!-- 配置板块列表 -->
    <div class="settings-sections">
      <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="settings-section">
        <!-- 板块标题 -->
        <h2 class="section-title">{{ section.topic }}</h2>

        <!-- 配置项列表 -->
        <div class="settings-items">
          <div
              v-for="(item, itemIndex) in section.item"
              :key="itemIndex"
              class="settings-item"
          >
            <!-- 配置项名称 -->
            <div class="item-label">{{ item.name }}</div>

            <!-- 根据类型显示不同的输入控件 -->
            <div class="item-control">
              <!-- 文本类型 -->
              <input
                  v-if="item.type === 'text'"
                  type="text"
                  v-model="formData[item.key]"
                  @input="handleInput(item.key, $event.target.value)"
                  class="mac-input"
              >

              <!-- 数字类型 -->
              <input
                  v-else-if="item.type === 'number'"
                  type="number"
                  v-model="formData[item.key]"
                  @input="handleInput(item.key, $event.target.value)"
                  class="mac-input"
              >

              <!-- 布尔类型（开关） -->
              <label v-else-if="item.type === 'boolean'" class="mac-switch">
                <input
                    type="checkbox"
                    v-model="formData[item.key]"
                    @change="handleInput(item.key, $event.target.checked)"
                >
                <span class="switch-slider"></span>
              </label>

              <!-- 下拉选择类型 -->
              <div class="mac-select-wrapper" v-else-if="item.type === 'select'">
                <select
                    v-model="formData[item.key]"
                    @change="handleInput(item.key, $event.target.value)"
                    class="mac-select"
                >
                  <option
                      v-for="(option, optIndex) in item.options"
                      :key="optIndex"
                      :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <div class="select-arrow"></div>
              </div>

              <!-- 颜色选择器 -->
              <div class="mac-color-wrapper" v-else-if="item.type === 'color'">
                <input
                    type="color"
                    v-model="formData[item.key]"
                    @input="handleInput(item.key, $event.target.value)"
                    class="mac-color"
                >
                <div class="color-preview" :style="{ backgroundColor: formData[item.key] }"></div>
              </div>

              <!-- 不支持的类型 -->
              <div v-else class="unsupported-type">
                不支持的类型: {{ item.type }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSettings, setSettings } from './settingsControl';

// 初始化数据
const formData = ref({});
const sections = ref([]);
const title = ref('');
const logo = ref('');
const loadingError = ref('');

// 加载配置模板 - 使用fetch方法适配VitePress
const loadSettingsTemplate = async () => {
  try {
    // 在VitePress中，public目录下的文件可以通过根路径直接访问
    const response = await fetch('/assets/data/SettingsTemplate.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const templateData = await response.json();

    // 提取总标题和logo
    if (templateData.title) title.value = templateData.title;
    if (templateData.logo) logo.value = templateData.logo;

    // 提取配置板块
    sections.value = templateData.sections || [];

    // 加载现有配置
    const savedSettings = getSettings();

    // 初始化表单数据
    sections.value.forEach(section => {
      Object.values(section.item).forEach(item => {
        if (savedSettings[item.key] !== undefined) {
          formData.value[item.key] = savedSettings[item.key];
        } else {
          // 为未设置的项设置基础初始值
          switch(item.type) {
            case 'boolean':
              formData.value[item.key] = false;
              break;
            case 'number':
              formData.value[item.key] = 0;
              break;
            default:
              formData.value[item.key] = '';
          }
        }
      });
    });
  } catch (error) {
    console.error('Failed to load settings template:', error);
    loadingError.value = `加载配置失败: ${error.message}`;
  }
};

// 处理输入变化并保存
const handleInput = (key, value) => {
  formData.value[key] = value;
  setSettings({ [key]: value });
};

// 组件挂载时加载配置
onMounted(() => {
  loadSettingsTemplate();
});
</script>

<style scoped>
/* 基础样式优化 - macOS风格 */
.settings-container {
  /* macOS系统偏好设置背景色 */
  background-color: #f5f5f7;
  height: auto;
  padding: 20px 20px 3px 20px;
  margin: 0 20px;
  border-radius: 15px;
  box-sizing: border-box;
}

/* 顶部区域优化 */
.settings-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: rgba(255, 255, 255, 0.8);
  /* macOS毛玻璃效果 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 13px;
  margin-bottom: 20px;
}

.settings-logo {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 6px;
  object-fit: contain;
}

.settings-title {
  font-size: 20px;
  font-weight: 500;
  color: #1d1d1f;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 配置区域优化 */
.settings-sections {
  margin: 0;
  padding: 0;
}

.settings-section {
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  margin-bottom: 20px;
}

.settings-section:hover {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  color: #6e6e73;
  padding: 12px 20px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  background-color: #f5f5f7;
  border-bottom: 1px solid #e2e2e7;
}

.settings-items {
  border-top: none;
}

/* 配置项样式优化 */
.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item:hover {
  background-color: #f7f7f9;
}

.item-label {
  font-size: 15px;
  color: #1d1d1f;
  line-height: 1.4;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* macOS风格输入框 */
.mac-input {
  font-size: 15px;
  color: #1d1d1f;
  text-align: right;
  background-color: #f5f5f7;
  border: 1px solid #d2d2d7;
  border-radius: 6px;
  padding: 8px 12px;
  min-width: 120px;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.mac-input:focus {
  outline: none;
  border-color: #007aff; /* macOS蓝 */
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
  background-color: white;
}

.mac-input:hover {
  border-color: #9e9e9e;
}

/* macOS风格下拉选择器 */
.mac-select-wrapper {
  position: relative;
  min-width: 120px;
}

.mac-select {
  font-size: 15px;
  color: #1d1d1f;
  text-shadow: 0 1px 1px rgba(255,255,255,0.3);
  background-color: transparent;
  border: 1px solid #d2d2d7;
  border-radius: 6px;
  padding: 8px 30px 8px 12px;
  width: 100%;
  appearance: none;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.2s ease;
}

.mac-select-wrapper:hover .mac-select {
  border-color: #9e9e9e;
  background-color: #f5f5f7;
}

.mac-select:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.2);
  background-color: white;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #6e6e73;
  pointer-events: none;
}

/* macOS风格颜色选择器 */
.mac-color-wrapper {
  display: flex;
  align-items: center;
}

.mac-color {
  width: 36px;
  height: 36px;
  border: 1px solid #d2d2d7;
  border-radius: 6px;
  padding: 0;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  position: absolute;
}

.color-preview {
  width: 36px;
  height: 36px;
  border: 1px solid #d2d2d7;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
}

.color-preview:hover {
  transform: scale(1.05);
  border-color: #9e9e9e;
}

/* macOS风格开关 */
.mac-switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 28px;
}

.mac-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e5ea;
  transition: .3s;
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.switch-slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

/* 开关选中状态使用macOS蓝色 */
input:checked + .switch-slider {
  background-color: #007aff;
}

input:checked + .switch-slider:before {
  transform: translateX(24px);
}

.unsupported-type {
  color: #ff3b30;
  font-size: 14px;
  padding: 8px 0;
}

.error-message {
  color: #ff3b30;
  padding: 16px;
  text-align: center;
  background-color: white;
  margin: 0 0 16px 0;
  border-radius: 8px;
  border: 1px solid #ffcccc;
}

/* 响应式优化 */
@media (max-width: 375px) {
  .settings-item {
    padding: 12px 16px;
  }

  .item-label {
    font-size: 14px;
  }

  .mac-input, .mac-select-wrapper {
    min-width: 100px;
    font-size: 14px;
  }
}
</style>