---
comment: true
title: 极域掉段!!!
---

# ❗反极域课堂专栏
## JiYuTrainer<badge type="danger" text="停更" /><badge type="tip" text="镜像加速" />

>作者：[imengyu](https://github.com/imengyu)，原Github仓库地址：[JiYuTrainer](https://github.com/imengyu/JiYuTrainer)

::: details 官方介绍
# 已废弃。本项目将永远不再更新

---

<p align="center">
  <a href="#">
    <img alt="JiYu Trainer" src="https://imengyu.top/assets/images/jy/JiYuTrainerLogo256.png" width="128">
  </a>
</p>
<p align="center">
  <img alt="JiYu Trainer Title" src="https://imengyu.top/assets/images/jy/JiYuTrainerTitle.png">
</p>
<p align="center">不再被极域电子教室控制</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/language-C++-blue.svg"></a>
  <a href="https://github.com/imengyu/JiYuTrainer/releases"><img src="https://img.shields.io/badge/version-1.7-greeb.svg"></a>
  <a href="https://github.com/imengyu/JiYuTrainer/blob/master/LICENSE"><img src="https://img.shields.io/badge/liscence-MIT-orange.svg"></a>
</p>

简介
---

本软件研发目的就是为了对抗极域电子教室，如果您的学校机房使用极域电子教室来控制学生电脑的话，本软件很可能会帮到你。

> 讲师讲课无聊啰嗦缓慢？想自己试试操作，却被该死的全屏广播控制，什么都不能干？拔掉网线后虽然自由了但是又看不到老师的演示了？

如果你被以上问题困扰，本软件可能是您非常想要的。

这是一个可以使 **极域电子教室全屏广播失效** 的软件，也就是说，在被老师全屏广播时，会将其自动调整为窗口模式，你不仅可以自由操作电脑，也还可以看老师的演示，自由+学习两不误，这不是很爽的事情吗？其还可以防止被老师控制（有点狠），以及自动关闭 “**黑屏安静**” 这种东西；由于本软件是将全屏调整为窗口，因此老师并不会发现你断线或是进行了非法操作。

如果你喜欢这个软件，不妨向你的好友推荐一下吧！

如果你觉得这个软件不错，不妨加个小星星⭐吧，你的喜欢是对我最大的支持！

功能
---
* 在不影响极域正常运行的情况下将 全屏的广播 转为 窗口广播 模式，您不仅可自己操作，也可看老师讲解课程。
* 内置强杀、启停极域 StudentMain.exe 进程功能，无需依赖其他软件。
* 内置破解极域解锁卸载密码功能，支持新版极域。
* 反监视功能，经测试，开启反监视，教师端就无法监视您所用的电脑。
* 防控制功能，防止教师通过极域控制您所用的电脑。
* 监控极域远程执行命令，您可以自由选择是否允许教师端远程执行的命令。
* 通过极域电子教室对同学的电脑远程发送信息或远程执行命令。

下载
---

* [下载软件最新版已编译版本](https://raw.githubusercontent.com/imengyu/JiYuTrainer/master/Release/JiYuTrainer.exe)

提示：**由于本软件会对极域电子教室进行必要的操作（远程注入、替换模块），某些杀毒软件可能会报毒，您可能需要关闭杀毒软件或添加白名单**。

---

![截图](https://imengyu.top/assets/images/jy/ScreenShots.png)

操作方法
---

本软件专为小白设计，默认情况下，您不需要修改任何参数，直接运行exe，并最小化即可，软件会自动进行操作。

> 附加说明：本软件不依赖任何运行库，您只需复制一个 **JiYuTrainer.exe** 至目标电脑即可运行，本软件已将需要的DLL打包，它会自动进行安装。

[完整帮助文档](https://raw.githubusercontent.com/imengyu/JiYuTrainer/master/帮助.png)

一些提示
---

**Q: 教师端限制了U盘，要怎么把 JiYuTrainer 复制到电脑上运行？** <br/>
**A: 你可以先卸载掉极域的驱动再插入U盘。具体操作方法如下：** <br/>

1. 先以管理员身份运行cmd：
   ![CMD](https://imengyu.top/assets/images/jy/sc0.png)
2. 输入以下命令卸载TDFileFilter驱动：
```
sc stop TDFileFilter 
sc delete TDFileFilter 
```
![sc](https://imengyu.top/assets/images/jy/sc1.png)

然后再插入U盘，就没有限制了，可以直接运行JiYuTrainer。

**Q: 教师端限制了网络，要怎么办？** <br/>
**A: JiYuTrainer 可以自动卸载网络驱动，这可能有效，如果该方法无效，<br/>可尝试下载PCHunter软件，该软件有最强力的方法删除驱动（也可用它来杀死任何进程）**<br/>

1. 如图打开PCHunter软件，打开“驱动模块”页面。
2. 找到极域的网络驱动“TDNetFilter.sys”，并选择卸载驱动。
3. 稍等一下，刷新网页，此时网络即可正常访问。
4. 最好你也可顺便把极域的其他进程一并杀死，防止它因为驱动卸载掉还操作而导致系统蓝屏。

![pch](https://imengyu.top/assets/images/jy/pchunter1.png)

#### 已测试极域电子教室版本：

* 2010版 （5.01.64.942 / 5.01 Baseline）
* 2015豪华版
* 2016豪华版 （2.07.0.13488 / 2.07 CMPC）

#### 操作系统版本:

* 系统版本要求: Win7/Win8/Win8.1/Win10

> 抱歉：因为最近一次做了较大改动，一些功能XP适配不了了，所以此后JiYuTrainer都不再支持WindowXP了，
如果您要在WindowXP上使用JiYuTrainer，只能使用[旧版](https://raw.githubusercontent.com/imengyu/JiYuTrainer/master/Release/JiYuTrainerOldForWinXP.exe)。

编译以及生成
---

| 支持的编译工具：||
|:-|:-:|
| [Visual Studio](https://www.visualstudio.com/) 2019 | (推荐) |
| gcc 4.7+ (需要自己配置环境) | (不推荐) |

|如果需要编译驱动模块，您还需要安装:||
|:-|:-:|
|[WDK8](https://www.microsoft.com/en-us/download/details.aspx?id=42273) 或以上||

构建步骤：
1. 使用Visual Studio打开项目JiYuTrainer.sln
2. 在顶部工具栏选择配置为Release，平台为x86.
3. 在解决方案资源管理器中右键“JiYuTrainer”项目，点击“生成”。
4. 等待生成完毕。不用理会JiYuTrainerDriver的编译错误，因为无须生成驱动，源码里已经有生成好的驱动了。
5. 在项目目录/Release下就有构建完成的程序了。

使用的第三方库
---

*第三方库已经包含在项目中，不需要您自己安装*

- [Jiyu_udp_attack](https://github.com/ht0Ruial/Jiyu_udp_attack) (由ht0Ruial大佬提供UDP攻击的原理代码)
- [curl](https://github.com/curl/curl) (用于自动更新模块)
- [mhook](https://github.com/martona/mhook) (用于 JiYu HOOKER 模块)
- [MemoryModule](https://github.com/fancycode/MemoryModule)
- [XZip-XUnZip](https://github.com/yuanjia1011/XZip-XUnZip)

其他
---

这个项目大致功能目标已经完成了，<br/>
作者也毕业要工作了，再不会去机房上课了😔，<br/>
以后可能没有太多时间更新，所以基本除了BUG修复可能不会做大修改了。<br/>
<br/>
如果您有其他功能需求，可以fork项目之后自己研究开发。<br/>
如果你想把自己开发的特殊功能放在JiYuTrainer供大家使用的话，
你可以把功能开发完成后PullRequest让我把你的代码合并到主分支中。<br/>
<br/>
如果你喜欢这个项目，<br/>
不妨推荐给你的好友吧😉

许可
---

[MIT License](https://github.com/imengyu/JiYuTrainer/blob/master/LICENSE) (free, open source)


:::

::: details 精简介绍

# JiYuTrainer（已废弃，不再更新）

JiYu Trainer 是一款针对极域电子教室的工具软件，主要功能为对抗其控制，如将全屏广播转为窗口模式，让用户在不影响观看教师演示的同时可自由操作电脑；还具备强杀/启停极域进程、破解卸载密码、反监视、防控制、监控远程命令等功能。

该软件采用C++开发，版本为1.7，遵循MIT许可，支持Win7/Win8/Win8.1/Win10系统，适配极域2010版、2015豪华版、2016豪华版等版本。

因作者毕业工作，项目不再更新，其最新版可在GitHub发布页下载，使用时可能被杀毒软件报毒，需关闭杀毒软件或添加白名单。

:::


<DownloadLinkCollector
  title="下载链接"
  bg-image="/pictures/mythware.png"
  tcolor="#00baff"
  :downloads="[
    {
      link: 'https://github.com/imengyu/JiYuTrainer/releases/latest',
      text: '官方下载链接<mark>（不推荐，速度慢）</mark>',
      enable: true
    },
    {
      link: 'https://cdn1.kesug.com/application/single/JiYuTrainer/JiYuTrainer.zip',
      text: '镜像下载链接<mark>（WGdocs附属镜像）</mark>',
      enable: true
    },
    {
      link: 'https://wwxb.lanzn.com/ig5ma31gb5qd',
      text: '蓝奏云下载链接<mark>（推荐）</mark>',
      enable: true
    }
  ]"  
/>

> [!IMPORTANT] 关于配置文件
> 官方下载链接不带配置文件，其余方式附带最佳配置文件。
  
## NoTopDomain<badge type="warning" text="半停更" /><badge type="tip" text="官方镜像" />

>作者：[Ariasaka🍥](https://github.com/LYXOfficial)，原Github仓库地址：[NoTopDomain](https://github.com/LYXOfficial/NoTopDomain)

::: details 官方介绍
这个蒟蒻很久没更新了qwq，今年有空还会折腾的

3.0的UI是在某同学的建议下修改的，不过感觉有点大了呢（；´д｀）ゞ

后面可能会做一些其它的ui，建议现在在release里面下2.5（

# NoTopDomain

极域，就你也敢创死无数无辜学生？

此乃极域终末之神，机房摸鱼之柱。

你还在为极域控制，老师禁用，上课效率太低而烦恼吗？这个软件将帮你解决问题！

推广文x2：

https://www.cnblogs.com/LYXOfficial/p/notopdomain.html

https://yisous.xyz/posts/55af90aa/

Lanzou: https://xydc.lanzouo.com/b018x6qza 密码:2al0

## 帮助

欢迎使用NoTopDomain！希望你在机房快乐摸鱼，轻松学习，不被老师制裁和批斗，不因老师控制耽搁时间。

本软件已测试过：极域2015 v4.0/v5.0 极域2016 v6.0 极域2021 v6.0。

2010及以下版本不做可用性保证。

这是这个软件的帮助信息，这对您顺利使用此软件提供很大的帮助。

### 快捷键

（可修改）

使用 ALT+M 唤起本软件窗口，再按即自动隐藏，隐藏后老师不会在极域的列表里面看到这个软件。

使用 ALT+K 杀掉当前鼠标所在的焦点软件，会弹出一个提示框确认，这时建议直接按 Enter 或 Alt+Y来确认，以防耽搁，注意如果焦点是软件本身则会忽略，不会杀掉。

使用 ALT+H 隐藏当前焦点窗口（只是截图不了而已），在Windows 10 2004及以上版本中教师端完全看不到这个窗口，不过在更老的Windows 10版本中教师会看到一块黑屏，在Win8及以下版本中教师会看到窗口边框和标题，但是内容是一块黑色。

(老版本ALT+T已经移除)

使用 ALT+Y 将当前焦点窗口置顶，再按可以恢复，这可以方便您的一些对照操作的场景，置顶或取消时，该窗口左上角会弹出一个小提示框。

使用 ALT+F 快速强制恢复广播全屏。请注意这个功能无论何时都可以快速切换，用于防止老师看到你乱搞然后批斗你。

使用 ALT+Q 快速切换广播按钮开关，这个功能和上面有所不同，如果你没有勾选设置的“自动缩放窗口”，它只会切换按钮开关，当然打开之后也会自动缩放，用处和按设置上的“解冻全屏”完全一致。

### 广播右键菜单

广播时在窗口右击可以显示右键菜单，可以快速进行常用功能操作，具体操作见下。

### 首页项

#### 常用功能·杀掉/启动极域

这个就不用说了，会结束极域进程。（注意老师可能会发现你断线，然后批斗你）

#### 常用功能·挂起/恢复极域

这会使极域进入挂起状态而不响应系统的任何命令，老师看起来也没有掉线，画面会冻结，但是大概一段时间后可能会自动掉线，只能恢复才能连上。

#### 常用功能·监视图片替换

这将会将教师端看到您的屏幕替换成一张图片，你可以选择截图或一张图片，启动后再按可以取消。

咕咕咕。

#### 常用功能·复制极域链接

按下后会将极域的路径复制到剪贴板。

#### 常用功能·解冻/恢复全屏

这个功能会默认将全屏按钮解冻或恢复，注意只是按钮，所以需要在工具栏中按按钮才能窗口化，或者将设置“修改窗口化自动缩放窗口”打开，这将会在修改时自动全屏/窗口化广播窗口并修改按钮。

#### 常用功能·杀掉输入进程

输入一个进程名（加不加.exe都可以）或其PID，然后按回车，确认后可以杀掉该进程（注意如果使用了ntsd杀进程方案可能失败）。

#### 限制解除·置顶窗口

切换软件本体窗口置顶状态，常用于截图等操作。

#### 限制解除·解除键盘限制

在黑屏安静等情况下解除极域键盘锁，默认开启（注意对 `Ctrl+Alt+Del` 无效），开启后键盘会卡顿一段时间。

#### 限制解除·解除鼠标限制

在黑屏安静等情况下解除鼠标锁，注意开启后鼠标会卡顿一段时间。

#### 限制解除·U盘/软件限制

解除U盘访问和软件运行限制，实际上是运行了：

```bash
sc stop TDFileFilter
```

注意有时在开启UAC的电脑上需要管理员权限，否则会出错。

#### 限制解除·解除网站限制

解除访问网页时的“该网页已被阻止”，注意恢复可能无效。

#### 限制解除·解除极域防杀

因为部分机房极域有防杀钩子，该功能可以尝试解掉钩子。

如果仍然杀不了极域的话，可以尝试用其它杀进程方案。

#### 限制解除·屏蔽黑屏安静

该功能可以在黑屏安静来临时自动屏蔽掉，注意会有一点延迟。

#### 限制解除·脱离远程关机

该功能通过替换极域目录的 `Shutdown.exe` 改为空程序来实现，再按可以恢复。

当老师（或同学）发现其它的电脑都关了，你的却没关时，请注意您可能会被当作走资派给批斗、打倒（

#### 限制解除·拦截教师控制

可以让老师无法控制你的电脑，并且不会导致选择“控制”时本地不可以操作的现象。

咕咕咕。

#### 限制解除·拦截极域操作

打开后每次老师对你发布远程命令和远程杀进程时都会弹窗提示确认，也可以防御他人攻击。

#### 限制解除·拦截远程消息

开启此功能后教师端将无法对你发消息，可以防御他人攻击。

咕咕咕。

#### 限制解除·拦截传入连接

这样会启动系统的防火墙，来拦截极域的控制，这可以让老师无法控制你的电脑，无法杀掉你的进程，但是这样会导致概率性的掉线。

#### 限制解除·解工具/限制

这会解除老师在组策略中设置的禁用任务管理器、运行等等功能限制。

#### 限制解除·解除映像劫持

关于映像劫持：

https://baike.baidu.com/item/%E6%98%A0%E5%83%8F%E5%8A%AB%E6%8C%81

这可以解除系统中所有的映像劫持（比如学生机房管理助手的禁用 `taskkill`），注意可能需要管理员权限。

#### 限制解除·重启资源管理器

这个都不知道的话，还是好好上信息技术课吧...

#### 密码获取

首页底部左侧的文本框显示获取到的密码，如果获取失败，会显示为极域超级密码 `mythware_super_password`

#### 卸载极域

这个功能会自动调用极域卸载器，输入密码卸载极域，请注意：这极有可能受到批判。

### 设置项

注意：设置修改后一定要点击保存！

#### 隐藏托盘

这会隐藏软件的托盘图标，你依然可以通过快捷键来显示窗口。

#### 禁用QSS

这会禁用程序的样式表，恢复为系统默认样式。建议在出现样式错乱、性能问题时开启，注意需要重启才能应用。

#### 禁用教师全屏

通过调用 `user32.dll` 中的 `SetWindowDisplayAffinity` 来绕过截图，不过在 `Windows 10 2004` 以下的版本中会显示为黑框。

#### 修改窗口化时自缩放

这个功能可以在点击“解冻全屏”时自动缩放广播窗口。 [见上](#常用功能解冻恢复全屏)

#### 窗口不透明度

这个就不用说了吧。。。

#### 杀进程方案

共三种，针对不同的环境。

`TermProc` 即为调用 Win32API 的 `TerminateProcess` 函数，可能会被极域反杀拦截（当然可以用解反杀）。

`TermThr` 即为调用 Win32API 的 `TerminateThread` 函数，对进程进行遍历线程杀死，可以绕过反杀。

`ntsd.exe` 即为调用 `ntsd` 来杀掉进程，由于未知原因，键入杀进程很多无法杀掉（可能报 `0xC00000BB` ），并且会弹窗，建议作为最次之选择。

### 快捷键配置

具体快捷键用途在 [上文](#快捷键) 中有提到。

注意配置时用 `+` 连接各键即可，不要求大小写。

Alt键直接使用alt，ctrl键使用ctrl或control，shift键使用shift，esc使用esc，Fx（F1~F12）直接用其名字就行。

### UDP重放攻击

使用右上角工具栏的“攻击”启动该功能。

内有几个文本框，输入内容如下：

扫描IP：扫描局域网内电脑的IP，显示在日志栏里面

IP地址：从对方电脑获取到的它的局域网IP，如果想同时发多个，可以用分号隔开（英文！）

间隔时间、次数：。。。

对方关机、重启：你懂的:（

执行命令：在Windows系统下执行某命令，注意如果是命令行程序前面要加 start 否则啥也看不到。

发送消息：对方会看到一个极域的浮动窗口，图标为信息图标，内容为消息内容，在Windows 10以上会覆盖上一层原生消息窗口。

注意：单台电脑的极域发送之后对任意一人的攻击消息将有22秒左右的无敌时间。

若对方开启了 NoTopDomain 或 JiyuTrainer 等反极域软件，部分操作可能会失败。

该功能执行时对方的实际权限很低，所以许多操作会出错，但是关机还是可以滴（
:::

::: details 精简介绍
# NoTopDomain 精简介绍

该软件主要用于应对极域控制，帮助用户解决机房中因极域控制、老师禁用等导致的上课效率低等问题，适用于极域2015 v4.0/v5.0、2016 v6.0、2021 v6.0版本，2010及以下版本可用性不保证。

开发者很久没更新，今年有空会继续完善。3.0的UI根据同学建议修改，感觉有点大，后续可能做其他UI，建议现在在release里下载2.5版本。

## 核心功能与快捷键
- **ALT+M**：唤起/隐藏软件窗口，隐藏后老师在极域列表看不到
- **ALT+K**：杀掉当前鼠标焦点软件（自身除外），需确认
- **ALT+H**：隐藏当前焦点窗口（不同系统下教师端显示不同）
- **ALT+Y**：将当前焦点窗口置顶/恢复，有提示
- **ALT+F**：快速强制恢复广播全屏
- **ALT+Q**：快速切换广播按钮开关

## 其他功能
- **常用功能**：包括杀掉/启动极域、挂起/恢复极域、监视图片替换、复制极域链接等
- **限制解除**：涵盖解除键盘/鼠标限制、U盘/软件限制、网站限制、极域防杀等多种限制
- **密码获取**：首页底部左侧显示，失败则显示默认超级密码`mythware_super_password`
- **卸载极域**：自动调用卸载器，需输入密码
- **设置项**：可进行隐藏托盘、禁用QSS、禁用教师全屏等设置，修改后需保存
- **UDP重放攻击**：可扫描IP、向指定IP发送关机、重启、执行命令、发送消息等指令

## 相关链接
- 推广文：
    - [链接1](https://www.cnblogs.com/LYXOfficial/p/notopdomain.html)
    - [链接2](https://yisous.xyz/posts/55af90aa/)
- 下载地址：[Lanzou](https://xydc.lanzouo.com/b018x6qza)，密码:2al0
:::

官方GitHub下载链接<mark>（不推荐，速度慢）</mark>：https://github.com/LYXOfficial/NoTopDomain/releases/latest<br>
官方蓝奏云下载链接<mark>（密码：2al0）</mark>：https://xydc.lanzouo.com/b018x6qza<br>

<DownloadLinkCollector
  title="下载链接"
  bg-image="/pictures/mythware.png"
  tcolor="#00baff"
  bcolor="orange"
  :downloads="[
    {
      text: '官方Github下载链接<mark>（不推荐，速度慢）</mark>',
      link: 'https://github.com/LYXOfficial/NoTopDomain/releases/latest',
    },
    {
      text: '官方蓝奏云下载链接',
      link: 'https://xydc.lanzouo.com/b018x6qza',
      password: '2al0',
    },
  ]"
/>


## MythwareToolkit<badge type="tip" text="活跃" /><badge type="tip" text="镜像加速" />

>作者：[小流汗黄豆](https://github.com/BengbuGuards)，原Github仓库地址：[MythwareToolkit](https://github.com/BengbuGuards/MythwareToolkit)


::: details 官方介绍

# MythwareToolkit

极域工具包，支持多种控制极域以及学生机房管理助手的工具。StudentMain、Mythware、Jiyu

![截图](https://img-blog.csdnimg.cn/60d799d3637b4fe8a99c295a6bad605b.png#pic_center)

截图（1.2.1）

如果喜欢本项目，给个star可以吗？￣へ￣

欢迎访问[原理介绍博客](https://blog.csdn.net/weixin_42112038/article/details/125346545)，欢迎关注！

## 功能

注：以下*斜体标注*的内容表示即将到来的功能

**README适应版本：v1.2.2-patch**

### 极域控制

- 支持不依赖`taskkill`、`ntsd`等工具杀掉极域。极域未运行时可启动极域，降权到登录用户（路径来自注册表）
- 显示极域存活状态：未运行/正常运行/已挂起/无响应 + PID
- 解除极域网络限制功能（黑/白名单或是直接禁用，下面这些解禁功能一般都是仅对2016版有效，可验证至2021版）
- 解除极域U盘限制功能，有两种方式
- 窗口化/全屏化极域广播
- 挂起（冻结）/恢复极域
- 解鼠标限制，例如屏幕广播时的鼠标锁和机房管理助手蓝屏时的鼠标活动范围限制（教师端的远程控制依然有效）
- 支持解极域键盘锁，可以解锁<kbd>Alt</kbd>+<kbd>Ctrl</kbd>+<kbd>Delete</kbd>
- 防止截屏功能，可以防止教师端看到本程序（旧版本Windows看到黑框，新版本则是会看到后面的内容）

### 学生机房管理助手控制

- 支持关闭6.8-10.1版本的学生机房管理助手（其中某些版本可能不能正常工作，但是依然可以利用快捷键清除漏网之鱼）
- 将学生机房管理助手密码更改为12345678（7.1-9.9x版本有效，但是不推荐在助手运行期间更改，因为会蓝屏）。**最新版本的密码逻辑有变，所以建议不要更改。**
- 可以解除cmd（命令提示符）、注册表编辑器、任务管理器、注销、管理控制台、taskkill等程序，还可以解禁Chrome恐龙游戏和Edge冲浪游戏，以及Win7系统自带的一些游戏。
- 新版本机房助手会禁用Tab键，请在使用“解禁系统程序”功能后注销重登，才能解锁（一般此操作不会触发系统还原，但别忘了重新打开本软件）。
- 可以重启资源管理器（explorer.exe）

### 通用功能

- 内置MeltdownDFC、crdisk两个解除硬盘保护的软件
- 快捷键：
    - <kbd>Alt</kbd>+双击<kbd>C</kbd>强制结束当前程序（可用于对付机房助手）
    - <kbd>Alt</kbd>+<kbd>B</kbd>显示程序主界面（也可以从托盘小图标启动）
    - <kbd>Alt</kbd>+<kbd>W</kbd>最小化当前窗口
- 支持启动任务管理器，自动“置于顶层”。
- 支持超级置顶（UIAccess），可以覆盖任务管理器和放大镜。

#### 重要提醒！！！

若出现“从服务器返回了一个参照”的弹窗，请下载存储库中`RootCA.reg`文件导入即可。如果在您的设备中没有超级置顶，可以改改**组策略：计算机配置→Windows 设置→安全设置→本地策略→安全选项→用户帐户控制: 仅提升已签名和验证的可执行文件**，改成禁用

<details>
<summary>查看图片</summary>

![1](https://img-blog.csdnimg.cn/3bf026b7cf14411fa15c83fee47cf771.png)

![2](https://img-blog.csdnimg.cn/8065bc909c2148dd8039b67343cc2fc5.png)

</details>

- 当勾选“启用鼠标检测弹窗”选项后，鼠标移至屏幕左上角时，可以选择最小化当前的焦点窗口，与解键盘锁结合就可以实现脱离黑屏；移至右上角时，可以选择关闭当前焦点窗口，类似于<kbd>Alt</kbd>+<kbd>F4</kbd>效果。还有强制关闭窗口功能（即强制关闭：禁用关闭窗口、屏蔽<kbd>Alt</kbd>+<kbd>F4</kbd>的窗口，对UWP应用无效）

## 附录

<details>

### 防止教师端强制关机

只需删除极域目录下的Shutdown.exe即可。此后工具包将对这些远控操作做专门的预防

### 使用命令行或PowerShell手动解除极域U盘限制

CMD：

```powershell
sc stop TDFileFilter
sc delete TDFileFilter #可选
```

PowerShell：（适用于CMD被禁用情况）

```powershell
cd C:\Windows\System32\
.\sc.exe stop TDFileFilter
.\sc.exe delete TDFileFilter #可选
```

### 学生机房管理助手的软件黑名单（10.1版本）

进程名包含这些词就会蓝屏（加粗的名字不仅匹配进程名，还匹配窗口名）：

vmware、VirtualBox、Virtual PC、**虚拟机**、**电子教室**、ProcView、IceSword、Procmast.exe、**toolkit_32-bits.exe**（有点搞笑，只捉按规范命名的32位程序，随便一改都搞得定）、rstray.exe、PFW.exe、FTCleaner.exe、Wsyscheck.exe、XueTr.exe、prom.exe、ProcessX.exe、pchunter、**Killer.exe**、procmgr.exe、ProcessHacker.exe、killcontrol、PowerTool32.exe、360taskmgr、YtWinAst、KVFWMain.exe、ECQ-PS.exe、SnipeSword、procexp、**MsgFlood.exe**、ProcessOVER、procdeal、**多桌面**、**任务管理**、**进程**、Prayaya、dexpot.exe、vdeskman.exe、mdesk.exe、**virtualdesk**、multideskt.exe、VirDsk.exe、IDesktop.exe、YtMDesk.exe、coon.exe、zmqh.exe、DexpotProPortable.exe、Desktops.exe、wisedesktop.exe、DESKTOP.exe、Vdesktop.exe、MagicDesktop.exe、multidesktop.exe、**weRs0cqa**（这个有特别关照，在蓝屏窗口加载时还会自动杀掉带有这个名字的进程）、RegWX64.exe、QQPCNetFlow.exe、BDMANetLimiter.exe、netmon.exe、360netman.exe、HelloTeacher.exe、EHacker.exe、PowerTool64.exe、zydesk.exe、perfmon.exe、**吾爱破解**、**极域**、prcview.exe、processlasso.exe、netfuke.exe、**去除控制**、**课堂狂欢器**、**课堂工具**、fuckmythware、SpecialSet.exe、JiYuTrainer.exe、skieskiller、WindowsKernelExplorer.exe、msconfig.exe、iu杀毒、**窗口拓印**
。另外包括任务管理器，会有独特的锁定蓝屏界面。

### 在线根据明文生成学生机房管理助手密码（7.2版本以上，9.98以下）

访问[这个网站](https://try.dot.net/)，在代码运行窗口输入如下内容，便可生成密文，将密文写入注册表HKEY_CURRENT_USER\Software:n（REG_SZ），机房助手密码将会被立即更改：（也可以本地运行）

```csharp
// 代码来自学生机房管理助手9.0 set.exe，逆向、整理：小流汗黄豆
using System;
using System.Security.Cryptography;
using System.Text;
using System.IO;

public class Program
{
	public static void Main()
	{
		// 更改这里的内容
		string string_3 = "12345678";
		// Class6.smethod_0()
		string value = "C:\\WINDOWS";
		string s = value.Substring(0, 8);
		string s2 = value.Substring(1, 8);
		DESCryptoServiceProvider descryptoServiceProvider = new DESCryptoServiceProvider();
		descryptoServiceProvider.Key = Encoding.UTF8.GetBytes(s);
		descryptoServiceProvider.IV = Encoding.UTF8.GetBytes(s2);
		MemoryStream memoryStream = new MemoryStream();
		CryptoStream cryptoStream = new CryptoStream(memoryStream, descryptoServiceProvider.CreateEncryptor(), CryptoStreamMode.Write);
		StreamWriter streamWriter = new StreamWriter(cryptoStream);
		streamWriter.Write(string_3);
		streamWriter.Flush();
		cryptoStream.FlushFinalBlock();
		memoryStream.Flush();
		string string_4 = Convert.ToBase64String(memoryStream.GetBuffer(), 0, checked((int)memoryStream.Length));
		// Class6.smethod_3()
		StringBuilder stringBuilder = new StringBuilder();
		for(int i = 0; i < string_4.Length; i++)
			stringBuilder.Append((char)(string_4[i] - 10));
		string_3 = stringBuilder.ToString();
		// Class6.smethod_2()
		MD5CryptoServiceProvider md5CryptoServiceProvider = new MD5CryptoServiceProvider();
		byte[] array2 = md5CryptoServiceProvider.ComputeHash(Encoding.Default.GetBytes(string_3));
		stringBuilder.Clear();
		for (int i = 0; i < array2.Length; i++)
			stringBuilder.Append(array2[i].ToString("x2"));
		string str = stringBuilder.ToString().Substring(10);

		Console.WriteLine(str);
	}
}
// 期望输出：8a29cc29f5951530ac69f4，但是对于9.99以上版本为8a29cc29f5951530ac69需自己改
```

</details>

## 开发

鼓励大伙提出反馈和建议，也支持PR拉请求。

编译：使用最新版本的MinGW64编译器（<https://github.com/niXman/mingw-builds-binaries>），最好配合Red Panda C++等IDE开发和构建。

代码开源许可：若有引用他人代码，则引用部分遵循原作者许可；其他代码处于公共领域，请标注作者：小流汗黄豆。

另外：机房助手作者钟鸣，存在通过助手的木马广告非法获利（篡改浏览器主页至2345导航，一月获利以百元计）的行为。这可与其标榜的绿色无毒背道而驰了。

:::

::: details 精简介绍

# MythwareToolkit（极域工具包）

一款针对极域电子教室软件、学生机房管理助手的控制工具，集成多种管理与解除限制功能，适配StudentMain、Mythware、Jiyu等相关程序。当前适配版本为v1.2.2-patch，截图版本1.2.1。

如果喜欢本项目，欢迎给个star！更多原理可参考[原理介绍博客](https://blog.csdn.net/weixin_42112038/article/details/125346545)。


## 核心功能

### 极域控制
- 灵活管理极域进程：支持无依赖杀进程、启动、挂起/恢复，显示存活状态（含PID）
- 解除多类限制：网络限制（2016-2021版有效）、U盘限制（两种方式）、鼠标锁、键盘锁（含解锁Ctrl+Alt+Delete）
- 窗口控制：窗口化/全屏化广播，支持超级置顶（覆盖任务管理器等）
- 隐私保护：防止教师端截屏（新旧系统分别显示黑框或背景内容）

### 学生机房管理助手控制
- 版本适配：支持关闭6.8-10.1版本，部分版本可改密码为12345678（7.1-9.9x有效，新版本不推荐）
- 系统解禁：解锁cmd、注册表、任务管理器等程序，以及浏览器小游戏、Win7自带游戏
- 特殊处理：解决新版本助手对Tab键的禁用（需注销重登），支持重启资源管理器

### 通用功能
- 内置硬盘保护解除工具：MeltdownDFC、crdisk
- 实用快捷键：
    - <kbd>Alt</kbd>+双击<kbd>C</kbd>：强制结束程序
    - <kbd>Alt</kbd>+<kbd>B</kbd>：显示主界面
    - <kbd>Alt</kbd>+<kbd>W</kbd>：最小化窗口
- 辅助功能：启动置顶任务管理器、超级置顶（UIAccess）、鼠标检测弹窗（边角触发窗口控制）


## 注意事项
- 若出现“从服务器返回参照”弹窗，需导入存储库中`RootCA.reg`文件
- 超级置顶功能异常时，可修改组策略：  
  **计算机配置→Windows 设置→安全设置→本地策略→安全选项→用户帐户控制: 仅提升已签名和验证的可执行文件**，设置为“禁用”


## 附录信息
- 防止教师端强制关机：删除极域目录下`Shutdown.exe`
- 手动解除极域U盘限制的命令行代码、机房助手10.1版本黑名单、密码生成工具（适用于特定版本）等详细内容可参考原文档附录
- 开发相关：使用最新MinGW64编译器编译，代码开源（引用部分遵循原许可，其余为公共领域，作者：小流汗黄豆）

> 备注：学生机房管理助手作者存在通过软件篡改浏览器主页至2345导航非法获利的行为，与其“绿色无毒”宣传不符。

:::

> [!IMPORTANT] 关于RootCA.reg
> 镜像下载均已附带RootCA.reg


<DownloadLinkCollector
  title="下载链接"
  bg-image="/pictures/mythware.png"
  tcolor="#00baff"
  :downloads="[
    {
      text: '官方下载链接<mark>（不推荐，速度慢）</mark>',
      link: 'https://github.com/BengbuGuards/MythwareToolkit/releases/latest',
    },
    {
      text: '镜像下载链接<mark>（WGdocs附属镜像）</mark>',
      link: 'https://cdn1.kesug.com/application/single/MythwareToolkit/MythwareToolkit.zip',
    },
    {
      text: '蓝奏云盘下载链接',
      link: 'https://wwxb.lanzn.com/iZKnj31ge01g',
    },
  ]"
/>

---
> [!NOTE] 话说
> 如果只是日常逃课建议使用[JiYuTrainer](#jiyutrainer)，
> 高级点的功能建议使用[NoTopDomain](#notopdomain)。
> 至于[MythwareToolkit](#mythwaretoolkit)，没用过也不敢说~

<ImageSlider
  :auto="true"
  :time="1500"
  :images="[
    { id: 1, text: '暗算-1', link: '/pictures/eggy/AnSuan-1.png' },
    { id: 2, text: '无敌-1', link: '/pictures/eggy/WuDi-1.png' },
    { id: 3, text: '暗无-1', link: '/pictures/eggy/AW-1.jpg' },
  ]"
  ltext="暗算~"
  rtext="无敌~"
  lcolor="white"
/>
