---
comment: true
---

# mc.js<badge type="tip" text="网管首推" />

纯浏览器运行的Minecraft！

<DownloadLinkCollector
  bg-image="/pictures/MC-JS-example.png"
  title="链接直达"
  tcolor="purple"
  :downloads="[
    {
      text: 'mc.js.cool',
      link: 'https://mc.js.cool',
    },
  ]"
/>

::: warning 注意
如果提示证书警告，忽略即可（或者点击高级-继续访问mc.js.cool）。mc.js.cool始终为安全网站，请放心访问。
:::

::: details 官方简介
在一台临时的电脑上想快速体验 MC 中文版？打开 www.mc.js.cool ，不用下载 Java/启动器/客户端，不要繁琐的配置操作，打开网页就能玩！

Eaglercraft 介绍：Eaglercraft 是由 Eaglercraft 开发团队制作的在 Javascript 上运行的网页版 MC ，基于 MCJE 。使用 TeaVM 和 OpenGL 模拟器来运行与浏览器完全兼容的 Java 虚拟机。Eaglercraft 是众多网页版 MC 开源项目中完成度最高的，支持 MC 的几乎全部特性。MC.JS 仅为 Eaglercraft 开源项目的中文汉化分支，与 Eaglercraft 官方没有从属关系。

MC.JS 介绍：MC.JS 是专为国人优化的 Eaglercraft 的中文版，是众多网页版 Eaglercraft 中汉化最好的，还原 MCJE 体验。MC.JS 仅为 Eaglercraft 开源项目的中文汉化分支，与 Eaglercraft 官方没有从属关系。

关于 JS 版 和 WASMGC 版：WASMGC，即 WebAssembly GC，是在最新的 Chrome 浏览器上的新技术。 采用 WASMGC 的新版本相较于 JS 版 FPS 几乎提高了 2 倍，但是如果您的设备较旧或内存不足，它可能会运行不稳定或崩溃。WASMGC 功能可能需要手动开启，一般情况下用传统的 JS 版就行了，有高帧率需求的可尝试 WASMGC 版。

当前版本：u53（2025.7.12）
:::

## 支持信息
|版本| 运行方式       | 支持平台   | 语言   |
|-|------------|--------|------|
|EaglerMC 1.12| WASM-GC    | 仅桌面端   | 英语   |
|EaglerX MC 1.8| JS、WASM-GC | 桌面端与移动端 | 支持翻译 |
|EaglerMC 1.5 JS| JS | 仅桌面端   | 英语   |

## 特色功能
- 支持光影（实际测试效果很好，优化也还行）
- 跨局域网多人游戏（延迟低）
- 自定义皮肤
- 存档保存至cookie
- 无需下载任何支持库，打开即玩

## 游玩截图

> 我电脑真带不动了（就只截一张）

![MC-JS-example](/pictures/MC-JS-example.png)

## 其他信息

> 官方issue仓库地址（不含源代码）：https://github.com/mcjsteam/mc.js

---
<ImageSlider
  :auto="true"
  :time="1500"
  :images="[
    { id: 1, text: '执法-5', link: '/pictures/eggy/ZhiFa-5.jpeg' },
    { id: 2, text: '潜行-4', link: '/pictures/eggy/QianXing-4.jpeg' },
    { id: 3, text: '执潜-1', link: '/pictures/eggy/ZQ-1.jpg' },
    { id: 4, text: '执潜-2', link: '/pictures/eggy/ZQ-2.png' },
  ]"
  ltext="执法~"
  rtext="潜行~"
  lcolor="#ffa500"
  rcolor="#8b0000"
/>