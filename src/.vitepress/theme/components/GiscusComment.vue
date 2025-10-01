<template>
  <div style="margin-top: 2rem">
    <giscus
        :key="route.path"
        src="https://giscus.app/client.js"
        repo="Mengmiya1027/WGdocs-v3"
        repo-id="R_kgDOP6JriA"
        category="Comment"
        category-id="DIC_kwDOP6JriM4CwGVz"
        mapping="pathname"
        strict="1"
        reactions-enabled="1"
        emit-metadata="1"
        :theme="isDark ? 'noborder_dark' : 'noborder_light'"
        input-position="top"
        lang="zh-CN"
        crossorigin="anonymous"
    />
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue'
import { watch } from 'vue'
import { inBrowser, useData, useRoute } from 'vitepress'

const { isDark } = useData()
const route = useRoute()

watch(isDark, (dark) => {
  if (!inBrowser) return

  const iframe = document.querySelector('giscus-widget')?.shadowRoot?.querySelector('iframe')

  iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: dark ? 'noborder_dark' : 'noborder_light' } } },
      'https://giscus.app'
  )
})
</script>