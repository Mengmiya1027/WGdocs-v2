---
layout: page
comment: true
title: 正在重定向…
---

::: warning 正在重定向…
  由于本部分概念较为简单，故不做介绍。<br>
  您将在2秒后被重定向到概览页面。
:::

::: tip 嘿嘿
正常情况下您也不应看到这个页面。<br>
大不了就是某人输错网址咯~
:::

<script setup>
import { ref, onMounted } from 'vue';

const seconds = ref(2);

onMounted(() => {
  const interval = setInterval(() => {
    seconds.value--;
    if (seconds.value <= 0) {
      clearInterval(interval);
      window.location.href = '/resources/picture/map'
    }
  }, 1000)
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 text-center">
    <h1 class="text-2xl font-bold mb-4">页面迁移提示</h1>
    <p class="mb-2">
      您将在 <span class="font-bold text-green-500">{{ seconds }}</span> 秒后被重定向到
      <a href="/resources/picture/map" class="text-blue-500 hover:underline">导览页面</a>
    </p>
    <p>
      <a href="/resources/picture/map" class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        立即跳转
      </a>
    </p>
  </div>
</template>