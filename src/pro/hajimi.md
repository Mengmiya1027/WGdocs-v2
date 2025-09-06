---
comment: false
title: Hajimi
---

# 哈基米语翻译器
> 本服务源码来自[translate-ha-jimi](https://github.com/wifi504/translate-ha-jimi?tab=readme-ov-file)，目前部署于Cloudflare Pages。

## 官方介绍

哈基密语加密器 v2.0 版本

> **重要提示**
>
> - 哈基密语的设计是本着娱乐为目的，并借此进一步用作学习交流，科普计算机程序的设计与算法实现。
>
> - 本程序基于现有开源加密技术实现，仅提供加密算法功能，不保存用户通信内容、不参与用户通信行为。
>
> - 您在使用哈基密语网站、使用源码二次构建项目等场景时，需要承诺不使用本软件从事以下行为，包括但不限于：
    >
    >   1. 发布、传播、存储违反中国法律法规的信息；
>   2. 组织、策划或实施电信诈骗、洗钱、非法集会、黄赌毒等违法犯罪活动；
>   3. 利用加密机制逃避国家监管或阻碍执法；
>   4. 其他违反社会公共秩序、伦理道德的行为。
    >
    >   如您违反上述承诺，您应独立承担一切法律责任。
>
> - 哈基密语网站无法、也不承担对用户传输内容的审查义务，但保留依法向有关部门报告可疑行为的权利，如因您使用本网站导致任何第三方或国家机关的调查、起诉或处罚，您应独立承担责任，网站不承担任何连带或赔偿责任。

### 简介

- 哈基密语加密器是一款在本地实现的端到端加密聊天工具，密钥交换采用ECDH协议， 加密采用ChaCha20算法，且“交换哈基密钥”和“加密哈基密语”背后都有随机盐加数字签名， 在量子计算机问世前， **天王老子来了也没法破解、篡改、撞库、中间人劫持！**
- 在把人儿语加密成哈基密语时会 **自动启用压缩算法** ，所以对于短文本来说， 加密器会直接将其转换成密文，而对于大篇幅文本，加密器会先执行压缩然后再加密， 你可以留意输出结果的文本块下方的压缩率指示。
- 本网站的所有功能完全基于前端浏览器 **本地实现** ，所以你如果真的对敏感数据有顾虑，可以等网页加载完毕后断网使用。

### 使用
#### 1. 官方站点
<LinkCard
title="lhlnb.top/hajimi/"
bg-image="https://lhlnb.top/hajimi/assets/hjm-BR67OiOX.png"
link="lhlnb.top/hajimi/"
/>


#### 2.Cloudflare Pages 默认分配地址

<LinkCard
title="wgdocs-hajimi.pages.dev"
bg-image="https://cf-assets.www.cloudflare.com/slt3lc6tev37/1wf4qdGsPqa2UUSEoa4Yyg/3250a65f210bbb7062ab4dd9a9bdf213/logo-cloudflare-dark.svg"
link="wgdocs-hajimi.pages.dev"
/>

#### 3.CDN加速

<LinkCard
title="hajimi.wgdocs.ddns-ip.net"
bg-image="https://cf-assets.www.cloudflare.com/slt3lc6tev37/1wf4qdGsPqa2UUSEoa4Yyg/3250a65f210bbb7062ab4dd9a9bdf213/logo-cloudflare-dark.svg"
link="hajimi.wgdocs.ddns-ip.net"
/>

::: details 本地部署
如果你想要本地部署项目，最简单的，只需要如下三个步骤：
1. 完全下载项目仓库到本地，并且安装有 `Node.js` 环境，可以使用 `pnpm` 等包管理工具
2. 在项目目录下依次运行命令
```bash
npm install
```

---

```bash
npm run build
```
3. 使用 Web 容器挂载输出的静态资源文件（在目录 `./dist/` 下），你也可以直接运行如下命令本地启动
```bash
npm run preview
```
接下来就可以在本地环境使用了
:::

### 技术栈

Vue3 | TypeScript | Vite

### 开源协议

GNU General Public License v3.0

### Stars

[![Star History Chart](https://api.star-history.com/svg?repos=wifi504/translate-ha-jimi&type=Date)](https://www.star-history.com/#wifi504/translate-ha-jimi&Date)

## 使用方法

### v2教程（一对一使用）

#### 1. 打开部署站点（官方站点和WGdocs自营站都可以）

#### 2.点击左侧“设置密码”
输入两次密码，确保两次输入的完全一致即可。随后点击确认。

#### 3.点击左侧添加联系人
可以选择“二维码密钥”或者“网址密钥”。选择网址密钥就直接把密钥粘贴到对方浏览器地址栏。

在对方设备上验证成功后，，点击下方“你也签名一个哈基密钥给对方”部分的“复制”，粘贴到你的设备上“输入对方签名的哈基密钥”部分

在你的设备上验证成功以后，就可以在两边分别设置昵称。
#### 4.此时就可以开始编辑信息

---

### v1教程（简易版/面向多人使用）

#### 1. 打开部署站点（官方站点和WGdocs自营站都可以）
翻到页面底部，点击“点击前往”，进入v1版本

#### 2. 翻到页面底部，设置方言（如果需要）

#### 3. 返回顶部
在左侧编辑信息，右侧会实时加密

#### 4. 如需解密
点击中间的交换箭头按钮，在左侧粘贴密文，右侧会实时解密。
