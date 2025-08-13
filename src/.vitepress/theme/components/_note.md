这里存放写组件的一些小提示。

1.试了一下给AI说让他使用VP原生SPA路由有点难，我用Deepseek手搓了一个AI提示词出来（适用于修改操作）：

# VitePress SPA 导航功能实现指南

## 任务描述
请为以下 Vue 组件添加 VitePress 单页应用（SPA）导航功能，要求：
1. 站内链接使用 SPA 导航（无刷新跳转）
2. 外部链接保持默认行为（整页加载）
3. 保留特殊操作（如 Ctrl/Cmd+点击在新标签页打开）
4. 渐进增强（确保无 JavaScript 环境下链接仍可用）

## 技术规范
- 使用 VitePress 提供的 `useRouter` API
- 实现智能链接拦截逻辑
- 遵循 VitePress SPA 最佳实践
- 保持组件原有功能和样式不变

## 实现步骤

### 1. 导入 VitePress 路由
```javascript
import { useRouter } from 'vitepress'
const router = useRouter()
```

### 2. 添加外部链接检测函数
```javascript
// 检测链接是否为外部链接
const isExternalLink = (path: string)  => {
  return /^(?:[a-z]+:)?\/\//i.test(path) || 
         path.startsWith('mailto:') || 
         path.startsWith('tel:') ||
         path.startsWith('//') ||
         path.startsWith('http:') ||
         path.startsWith('https:')
}
```

### 3. 创建点击事件处理函数
```javascript
const handleButtonClick = (e: MouseEvent) => {
    if (isCurrentPage.value) return

    // 如果是外部链接或特殊操作，不处理
    if (isExternalLink(props.link) ||
        e.ctrlKey || e.metaKey || e.shiftKey) {
        return
    }

    // 阻止默认行为并使用 VitePress 路由
    e.preventDefault()
    router.go(props.link)
}
```

### 4. 在模板中绑定点击事件
```html
<a 
  :href="link" 
  @click="handleClick($event, link)"
>
  <!-- 保留原有内容 -->
</a>
```

## 关键要求

- ✅ 保留原始 href 属性（保证无 JS 可用性）

- ✅ 正确处理动态链接和条件渲染

- ✅ 不修改组件原有样式和结构

- ✅ 确保当前页面检测逻辑不受影响（如果有）

- ✅ 支持新标签页打开配置（如 target="_blank"）

## 禁止事项

- ❌ 不要使用 vue-router

- ❌ 不要移除 href 属性

- ❌ 不要修改 CSS 样式

- ❌ 不要改变组件原有功能逻辑

## 期望输出
提供完整修改后的组件代码，仅包含必要的 JavaScript 和模板修改，不修改样式部分。