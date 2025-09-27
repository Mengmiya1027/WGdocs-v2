---
comment: true
---
# 上传资源
::: warning 防脑残提示
建议仅有vue、typescript、HTML和Markdown（Md都不会你就真的该重上小学科技课了）开发基础人员，或者像网管一样的手残党但是会用豆包的人阅读
:::

## 准备工作
#### 1. 在[GitHub仓库](https://github.com/Mengmiya1027/WGdocs-v2)点击右上角 fork按钮，将仓库 fork 到你的账号
#### 2. 克隆仓库到本地：
```bash
git clone https://github.com/你的用户名/WGdocs-v2.git
```
#### 3.安装依赖：
```bash
cd WGdocs-v2
npm install
```

## 添加资源
#### 4.创建新分支：
```bash
git checkout -b add-你的用户名-资源类型
```
#### 5.添加资源：
在`src/resources`目录下创建新的Markdown文件，建议文件名格式为`资源类型-资源名称.md`，例如`vue-组件.md`<br>
在文件中添加资源介绍内容，使用Markdown语法进行格式化，例如：
```markdown
  ## 组件名称
  组件描述
  ### 代码示例
  ```vue
  <template>
    <div>
      组件内容
    </div>
  </template>
  ```
详细的markdown参考和vitepress特有标记将在[架构文档](/community/architecture)中介绍,
你也可以在[Vitepress文档](https://vitepress.dev/guide/markdown)以及[markdown官方文档](https://markdown.com.cn/basic-syntax/)中找到更多关于写作标记的信息
#### 6.下载资源：
在`src/public`目录下创建新的文件夹，例如`vue`，将资源文件传入到该文件夹中，例如`vue-组件.vue`<br>
随后在下载标记中使用`[下载链接](子文件夹（前面不含public）/文件)`的方式进行引用。<br>
例如，示例中的`vue-组件.vue`，路径为：

```txt  {label: '项目结构'}
src
 ├─public
 │  ├─vue
 │  │  └─vue-组件.vue
 │  └─...
 │     └─...
 └...
```

文件下载标记为：

```html
src  <!-- [!code --] -->
├─public <!-- [!code --] -->
│  ├─vue  <!-- [!code ++] -->
│  │  └─vue-组件.vue <!-- [!code ++] -->
│  └─...
│     └─...
└...
```

即为`[下载链接](vue/vue-组件.vue)`<br>
这种方式同样适用于插入图片、视频等资源时的引用<br>
当然，网管也做了一个自制下载信息集合组件，你可以在[新功能介绍](/guide/new#下载信息集合器)查看。

## 提交更改
#### 7.提交并添加文件：
```bash
git add .
git commit -m "feat: 添加[资源类型]资源[资源名称] by [你的用户名]"
```
#### 8.推送分支：
```bash
git push origin add-你的用户名-资源类型
```

## 创建PR
#### 9.访问你的仓库页面
点击 <kbd>Compare & pull request</kbd> 按钮
#### 10.PR填写：
请注明：
- 资源类型
- 文件用途
- 基本说明

:::details 示例
## 变更类型
- [ ] 音频资源
- [ ] 图片资源
- [ ] 文档更新
- [ ] 其他

## 描述
<-- 请详细说明你添加的资源内容 -->

## 关联issue
<-- 如果有相关issue请注明编号 -->
:::

🎉 等待维护者审核合并后，你的贡献就会出现在文档站啦！

::: warning 后期提示
本文大部分由AI编写，请注意辨别。
:::