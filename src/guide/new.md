---
comment: true
---
# 更新日志&新功能介绍<badge type="warning" text="最近更新" />

## 更新日志

::: tip
### 最新更新：2025.7.25
### 更新日志：
  WGdocs版本Dev2.0,Preview16
  更新日志：制作ImageSlider组件（适配把我整惨了，花了NM两天）、制作更新日志页面
::: 

::: warning 停更通知
因为要去看演唱会所以停更到 7.28 /(ㄒoㄒ)/~~
:::

::: details 往期日志
#### 2025年07月24日
### WGdocs版本Dev2.0,Preview15.4
更新日志：改进测试功能：MusicPlayer标签：移动端再次修正适配~测试过真的会出问题的iPad Mini机型你就忍忍吧，毕竟横着看也不是不行哈

### WGdocs版本Dev2.0,Preview15.3
更新日志：改进测试功能：MusicPlayer标签：移动端适配

#### 2025年07月23日
### WGdocs版本Dev2.0,Preview15.2
更新日志：改进测试功能：MusicPlayer标签：稍调整内边距；修复文章错误；修复版本号错误

### WGdocs版本Dev2.0,Preview15.1
更新日志：改进测试功能：MusicPlayer标签

### WGdocs版本Dev2.0,Preview15
更新日志：更新测试功能：MusicPlayer标签

#### 2025年07月22日
### WGdocs版本Dev2.0,Alphafix14
更新日志：紧急修复：tzb页面链接处问题（我手滑按到Ctrl+V了？）  
话说CloudFlare还可以自动更新站点部署，挺智能的~

### WGdocs版本Dev2.0,Preview13
更新日志：加了一些小蛋仔和文章哈~域名从mmy.kesug.com迁移到wgdocs.pages.dev了（主要是那个infinityfree的bug太多了）  
下期预告：继续写文

#### 2025年07月21日
### WGdocs版本Dev2.0,AlphaFix12.2
更新日志：加了一些小蛋仔哈~  
下期预告：继续加一些小蛋仔哈~

### WGdocs版本Dev2.0,Preview11
更新日志：更新打包式应用程序的文章。  
字数和阅读时间应该是构建之后才会有。NapCat官方的仓库在预览的时候也没有字数和时间，但是网站上不知道为什么就有  
下期预告：加一些小蛋仔哈~

#### 2025年07月20日
### WGdocs版本Dev2.0,Preview10
更新日志：废了废了，真写不动了，675行要死了，懒得写更新日志  
下期预告：修复字数和最后编辑时间的问题（豆包靠你了）

### WGdocs版本Dev2.0,Preview9
更新日志：更改主页背景渐变效果

#### 2025年07月19日
### WGdocs版本Dev2.0,Preview8
更新日志：制作资源中心页面  
其余部分小修改

#### 2025年07月18日
### WGdocs版本Dev2.0,Preview7.1
更新日志：更改链接：从SCCYsccy用户名到Mengmiya1027

### WGdocs版本Dev2.0,Preview7
更新日志：更改logo（我癌鸡蛋鸭蛋荷包蛋~~~）

### WGdocs版本Dev2.0,AlphaFix6.2
更新日志：紧急修复：小彩蛋machine.png无法上传问题

### WGdocs版本Dev2.0,AlphaFix6.1
更新日志：紧急修复：小彩蛋machine.png

### WGdocs版本Dev2.0,Preview6
更新日志：更新index主界面的底栏为本站信息，添加小彩蛋machine

#### 2025年07月17日
### WGdocs版本Dev2.0,Preview5
更新日志：更新版本号命名方式，目前未完成版本将使用Dev\*.\*,Preview\*来命名

### WGdocs版本2.0.5.3
更新日志：完善导览的部分文件，完善资源中心的部分文件，修改zh.ts以更新侧栏

### WGdocs版本2.0.5.1
更新日志：制作new.md

### WGdocs版本2.0.5
更新日志：制作start-discover.md

### WGdocs版本2.0.4
更新日志：同步advanced分支

### WGdocs版本2.0.3
更新日志：更改部分GitHub链接  
更新package.json的版本号

### WGdocs版本2.0.3
更新日志：更改部分GitHub链接  
更新package.json的版本号

### WGdocs版本2.0.2
（无更新日志内容）

### v2.0.1
（无更新日志内容）

#### 2025年07月16日
### Initial commit
（无更新日志内容）
:::

## 新功能介绍

::: warning
此页面含有未经完全测试的功能，可能出现错误。
:::

## 自制音频控件 <badge type="warning" text="Dev2.0,Preview15" /> <badge type="tip" text="1" />

使用方法：

::: code-group
```[HTML]
<MusicPlayer
  title="[歌名]"
  author="[歌手]"
  tlink="[封面链接]"
  flink="[音频链接]"
  textcolor="[文字颜色]"
/>
```
```[示例1]
<MusicPlayer
  title="浮游"
  author="周深"
  tlink="../other-pictures/songs/浮游.png"
  flink="../songs/%E5%91%A8%E6%B7%B1%20-%20%E6%B5%AE%E6%B8%B8.ogg"
  textcolor="white"
/>
```
```[示例2]
<MusicPlayer
  title="蛋仔派对-疯狂乱斗BGM"
  author="Autiostock"
  tlink="../other-pictures/songs/蛋仔派对.gif"
  flink="../songs/965326.mp3"
  textcolor="black"
/>
```
:::
### 参数说明：

| 参数 | title、author     | tlink、flink（全称title-link、file-link） | textcolor   |
|----|------------------|-------------------------------------|-------------|
| 说明 | <mark>必填项</mark> | 可以不填，但是<mark>会显示链接无效</mark>。        | 可选项，默认为黑灰色。 |

 

### 示例预览：
因为网络原因，可能需要稍等几秒才能播放。
<MusicPlayer
  title="浮游"
  author="周深"
  tlink="../other-pictures/songs/浮游.png"
  flink="../songs/%E5%91%A8%E6%B7%B1%20-%20%E6%B5%AE%E6%B8%B8.ogg"
  textcolor="white"
/>

<MusicPlayer
title="蛋仔派对-疯狂乱斗BGM"
author="Autiostock"
tlink="../other-pictures/songs/蛋仔派对.gif"
flink="../songs/965326.mp3"
textcolor="black"
/>

### 已知问题
::: warning
- <span style="color: purple;">~~移动端显示会出现问题~~</span>   已适配✅
- 但是过宽的移动端显示会出现元素不占满卡片的问题，目前还没有找到解决方法，也不想修了。
- Cloudflare Pages 禁止上传超过25MB的文件，在添加音频文件时请注意。

::: details 惨痛的教训
![惨痛的教训-2025-07-23-15.22.57.610.png](/other-pictures/惨痛的教训-2025-07-23-15.22.57.610.png)
:::

## 自制图片轮播/展示控件 <badge type="warning" text="Dev2.0,Preview16" /> <badge type="tip" text="2" />

使用方法：

::: code-group
```[HTML]
<ImageSlider
  :auto="[true/false]"  <!-- 自动切换功能开关 -->
  :time="[切换间隔（可选）]"  <!-- 自动切换间隔（单位为毫秒） -->
  :images="[
    { id: 1, text: '[替代文字1]', link: '[图片链接1]' },
    { id: 2, text: '[替代文字2]', link: '[图片链接2]' },
    { id: 3, text: '[替代文字3]', link: '[图片链接3]' },
    ...
  ]"
  ltext="[左侧文字（可选）]"
  rtext="[右侧文字（可选）]"
  lcolor="[左侧文字颜色（可选）]" <!-- 默认为#3c3c43 -->
  rcolor="[右侧文字颜色（可选）]" <!-- 默认为#3c3c43 -->
/>
```
```[示例1]
<ImageSlider
  :auto="true"
  :time="1500"
  :images="[
    { id: 1, text: '执法-1', link: '/eggy/ZhiFa-1.jpg' },
    { id: 2, text: '执法-2', link: '/eggy/ZhiFa-2.png' },
    { id: 3, text: '执法-3', link: '/eggy/ZhiFa-3.png' },
    { id: 4, text: '执法-4', link: '/eggy/ZhiFa-4.png' }
  ]"
  ltext="执法~"
  rtext="大人~"
  rcolor="white"
/>
```
```[示例2]
<ImageSlider
  :auto="false"
  :images="[
    { id: 1, text: '潜行-1', link: '/eggy/QianXing-1.jpg' },
    { id: 2, text: '潜行-2', link: '/eggy/QianXing-2.jpg' },
    { id: 3, text: '潜行-3', link: '/eggy/QianXing-3.png' },
  ]"
  ltext="潜行~"
  rtext="小潜~"
  lcolor="white"
/>
```
:::

### 参数说明：

| 参数 | auto、time（可选）                       | images（必填） | ltext、rtext（可选） | lcolor、rcolor（可选）                              |
|----|-------------------------------------|--------------|-----------------|------------------------------------------------|
| 说明 | 自动切换功能，切换间隔单位为毫秒 | 图片链接数组，包含id、text和link属性。 | 左、右侧提示文字（可选）    | 左、右侧文字颜色（可选），默认为#3c3c43。 |

### 示例预览：
因为网络原因，可能需要稍等几秒才能显示。

<ImageSlider
  :auto="true"
  :time="1500"
  :images="[
    { id: 1, text: '执法-1', link: '/eggy/ZhiFa-1.jpg' },
    { id: 2, text: '执法-2', link: '/eggy/ZhiFa-2.png' },
    { id: 3, text: '执法-3', link: '/eggy/ZhiFa-3.png' },
    { id: 4, text: '执法-4', link: '/eggy/ZhiFa-4.png' },
  ]"
ltext="执法~"
rtext="大人~"
rcolor="white"
/>

---

<ImageSlider
  :auto="false"
  :images="[
    { id: 1, text: '潜行-1', link: '/eggy/QianXing-1.jpg' },
    { id: 2, text: '潜行-2', link: '/eggy/QianXing-2.jpg' },
    { id: 3, text: '潜行-3', link: '/eggy/QianXing-3.png' },
  ]"
  ltext="潜行~"
  rtext="小潜~"
  lcolor="white"
/>

### 已知问题
::: warning
  ⚠️暂时未知（暂时没测到）
:::