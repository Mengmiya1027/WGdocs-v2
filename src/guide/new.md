---
comment: true
---
# 新功能介绍<badge type="warning" text="最近更新" />
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
```[示例]
<MusicPlayer
  title="浮游"
  author="周深"
  tlink="../other-pictures/songs/浮游.png"
  flink="../songs/%E5%91%A8%E6%B7%B1%20-%20%E6%B5%AE%E6%B8%B8.ogg"
  textcolor="white"
/>
```
:::
### 参数说明：

| 参数 | title、author     | tlink、flink（全称title-link、file-link） | textcolor                |
|----|------------------|-------------------------------------|--------------------------|
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

### 已知问题
::: warning
- 移动端显示会出现问题
- Cloudflare Pages 禁止上传超过25MB的文件，在添加音频文件时请注意。

::: details 惨痛的教训
![惨痛的教训-2025-07-23-15.22.57.610.png](/other-pictures/惨痛的教训-2025-07-23-15.22.57.610.png)
:::

