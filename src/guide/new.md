---
comment: true
---
# 更新日志&新功能介绍

直接前往新功能介绍可点击左上角 `[页面导航]` ，找到[新功能介绍](#新功能介绍)，也可以直接往下滑。

## 更新日志

::: tip 最新更新：2025年9月21日
### WGdocs版本Dev3.0,Preview1
不太相同，大有不同！<br>本次更新添加了基于Fancybox 5实现的图片缩放功能。由于仍然处于测试阶段，在使用时可能会有部分显示问题。
:::

::: details 往期日志

:::

## 新功能介绍

::: warning
此页面含有未经完全测试的功能，可能出现错误。
:::

### 图片缩放功能

基于Fancybox 5实现的图片缩放功能，在点击图片后可以进行缩放操作。

效果展示：（点击图片查看~）

![执法-1](/pictures/eggy/ZhiFa-1.jpg)
---
![执法-2](/pictures/eggy/ZhiFa-2.jpeg)

也可以应用于图片展示器：
<ImageSlider
  :auto="true"
  :time="1500"
  :images="[
    { id: 1, text: '执法-1', link: '/pictures/eggy/ZhiFa-1.jpg' },
    { id: 2, text: '执法-2', link: '/pictures/eggy/ZhiFa-2.jpeg' },
    { id: 3, text: '执法-3', link: '/pictures/eggy/ZhiFa-3.jpg' },
    { id: 4, text: '执法-4', link: '/pictures/eggy/ZhiFa-4.jpg' }
  ]"
  ltext="执法~"
  rtext="大人~"
  rcolor="white"
/>

如果不希望使用图片缩放功能，可在图片上添加类名 `no-zoom` ：

::: code-group
```[markdown]
![执法-1](/pictures/eggy/ZhiFa-1.jpg){.no-zoom}
```

```[html]
<img
  :src="image.link"
  :alt="image.text"
  @click="selectImage(index)"
  :class="{
    'image-preview': true,
    'preview-active': index === currentIndex,
    'no-zoom': true
  }"
/>
```
:::
