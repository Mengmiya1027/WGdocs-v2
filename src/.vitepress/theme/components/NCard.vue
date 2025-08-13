<script setup lang="ts">
import { useRouter } from 'vitepress'

const props = defineProps<{
  title: string,
  link: string,
  target?: string
}>()

const defaultProps = {
  target: '_self'
}

const router = useRouter()

// 检查是否为外部链接
const isExternalLink = (path: string): boolean => {
  return /^(?:[a-z]+:)?\/\//i.test(path) ||
      path.startsWith('mailto:') ||
      path.startsWith('tel:') ||
      path.startsWith('//')
}

// 处理链接点击
const handleLinkClick = (e: MouseEvent) => {
  // 如果是外部链接或特殊目标，不处理
  if (isExternalLink(props.link) ||
      (props.target && props.target !== '_self') ||
      e.ctrlKey || e.metaKey || e.shiftKey) {
    return
  }

  // 阻止默认行为并使用 VitePress 路由
  e.preventDefault()
  router.go(props.link)
}
</script>

<template>
  <ClientOnly>
    <div class="ncard">
      <a
          :href="props.link"
          :target="props.target || defaultProps.target"
          @click="handleLinkClick"
      >
        <div class="ncardBody">
          <div class="card-title">{{ props.title }}</div>
          <div class="card-text">
            <slot></slot>
          </div>
        </div>
      </a>
    </div>
  </ClientOnly>
</template>

<style scoped>
/* 原有样式保持不变 */
.ncard {
  border: 1px solid #ebedf0;
  box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, .15);
  margin-bottom: 2em;
  border-radius: 8px;
  transition: all 200ms ease;
}

.ncard:hover {
  border: 1px solid var(--vp-c-brand);
  box-shadow: 2px 2px 1px 0 rgba(0, 0, 0, .1);
}

.ncardBody {
  padding: 1.8em;
}

a {
  color: var(--vp-c-text-1);
  text-decoration-line: none;
  display: block; /* 确保链接填充整个卡片 */
}

a::after {
  content: none !important;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: .8em;
}

.card-text {
  font-size: 0.9em;
}
</style>