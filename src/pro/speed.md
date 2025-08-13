---
comment: false
title: Speed Service
---

# 加速访问与镜像站点
欢迎使用WGdocs Pro Service服务！

::: details 前世今生
本站原部署于Cloudflare Pages，但是CF Pages的服务器均在海外，国内的CDN又无法使用。

后加入railway部署，但是国内访问速度仍然不理想。

偶然间网管发现可以在Digitalplat注册wgdocs.dpdns.org二级域名，且这个域名在Cloudflare上可以直接使用解析，无需进行所有者验证。

结果在DNS记录中添加CNAME根记录指向wgdocs.pages.dev，又显示522（你挺萌的）

然后我就在Pages中添加自定义域名，将wgdocs.dpdns.org添加为自定义域名，又显示请在dpdns.org处添加CNAME的wgdocs记录，指向wgdocs.pages.dev

本来到这一步就又卡住了，问豆包问半天没问明白，回来一看，直接显示活跃（What）

原来是在wgdocs.dpdns.org添加CNAME的根记录=在dpdns.org处添加CNAME的wgdocs记录，指向wgdocs.pages.dev

这样有了自定义域名，就可以享受Cloudflare的CDN服务了。

:::

可以前往[站点列表](#镜像站点)或者[终极方案](#加速终极解决方案)

## 镜像站点

::: tip 说明
当你所在的站点即为卡片中的链接时，按钮会显示绿色的✓且不可点击<br>
主同步频道=从github直接同步
:::
### 1.Cloudflare Pages 默认分配地址<badge type='tip' text='主同步频道' /><badge type='danger' text='极慢' />

<LinkCard
  title="wgdocs.pages.dev"
  bg-image="https://cf-assets.www.cloudflare.com/slt3lc6tev37/1wf4qdGsPqa2UUSEoa4Yyg/3250a65f210bbb7062ab4dd9a9bdf213/logo-cloudflare-dark.svg"
  link="wgdocs.pages.dev"
/>

Cloudflare Pages默认分配的地址。但是Pages的服务器均在海外，国内的CDN又因为各种原因无法使用，所以访问速度真的不理想。

### 2.railway项目 默认分配地址<badge type='tip' text='主同步频道' /><badge type='warning' text='较慢' />

<LinkCard
  title="wgdocs.up.railway.app"
  tcolor="white"
  bg-image="https://railway.com/brand/logotype-light.png"
  link="wgdocs.up.railway.app"
/>

railway项目默认分配的地址。速度相比Cloudflare Pages要快一点，但是也没快到哪去，还是有点慢。

---

##### 接下来的就都是Cloudflare代理出来的地址了，全部连的是Cloudflare Pages或者railway项目

---

### 3.域名来自dpdns.org（digitalplat）<badge type='tip' text='主同步频道' /><badge type='tip' text='快速' /><badge type='danger' text='需手动设置DNS' />

::: danger 警告
人机四川电信会把dpdns.org为后缀的域名解析到127.0.0.1本地回环地址，导致显示“拒绝连接”。<br>
需要手动设置DNS为优质公共DNS，如CF的1.1.1.1，华为的114.114.114.114，谷歌的8.8.8.8。<br><a href="ms-settings:network-status">打开网络连接设置</a>
:::

<LinkCard
  title="wgdocs.dpdns.org"
  bg-image="/pictures/application/Cloudflare账户.png"
  link="wgdocs.dpdns.org"
/>

带人机质询验证：（如果其他的都被DDos冲挂了可以试试这个）

<LinkCard
  title="mengmiya1027.dpdns.org"
  bg-image="/pictures/application/Cloudflare账户.png"
  link="mengmiya1027.dpdns.org"
/>

### 4.域名来自ClouDNS<badge type='tip' text='主同步频道' /><badge type='tip' text='快速' />

<LinkCard
  title="wgdocs.ip-ddns.com"
  bg-image="https://www.cloudns.net/i/cloudns_yt_image-fs8.png"
  link="wgdocs.ip-ddns.com"
/>

<LinkCard
  title="wgdocs.ddns-ip.net"
  bg-image="https://www.cloudns.net/i/cloudns_yt_image-fs8.png"
  link="wgdocs.ddns-ip.net"
/>

### 5.InfinityFree<badge type='tip' text='主同步频道' /><badge type='info' text='中速' />

<LinkCard
  title="wgdocs.mmy.kesug.com"
  bg-image="/pictures/application/Cloudflare账户.png"
  link="wgdocs.mmy.kesug.com"
/>
从infinityfree分出来的CNAME记录的域名

### 6.Netlify部署分配地址<badge type='tip' text='主同步频道' /><badge type='info' text='中速' />

<LinkCard
  title="wgdocs.netlify.app"
  bg-image="https://www.netlify.com/assets/logos/full/small/lightmode/logo-netlify-small-monochrome-lightmode.svg"
  link="wgdocs.netlify.app"
/>

---

##### 接下来的是开发测试用地址，非开发人员就别看了哈

---

### 7.Localhost<badge type='warning' text='测试用' />
<LinkCard
  title="localhost"
  bg-image="https://www.keneuc.cn/uploads/allimg/20221207/1-22120FI502V1.jpg"
  link="localhost"
/>

<LinkCard
title="0.0.0.0"
bg-image="https://www.keneuc.cn/uploads/allimg/20221207/1-22120FI502V1.jpg"
link="0.0.0.0"
/>

::: warning 注意
如果你现在是在本地开发，那么localhost和0.0.0.0右侧按钮应该至少有一个为绿色选中状态。<br>
否则右侧按钮应该为访问状态，如果你没启动开发服务请不要点击（因为点了也没用啊）
:::

## 加速终极解决方案

直接下载最新构建版本的WGdocs。需要使用本地服务器工具。<br>
内含最新版本：<mark>WGdocs版本Dev2.0, Preview22</mark>

### 使用方法
首先先在下方下载WGdocs构建文件。
然后根据自己的电脑情况选择以下方式：

::: details 1.Windows原生IIS工具
1.<a href="ms-settings:optionalfeatures">点击此处打开可选应用</a>，翻到最下面点击`更多Windows功能`，勾选`Internet information services`下拉框的全部选项。

2.搜索`IIS`打开`Internet information services（IIS）`，右击左侧网站导航栏，添加网站；如果没有找到IIS管理器，就需要看看第一步是否有勾选上IIS。

3.配置网站信息，网站名称可以输入`www.wgdocs.top`，物理路径选择你刚刚下载的`dist`文件夹，IP可以不填，端口自定义，如果保存报错的话可能是端口被占用了。

4.点击右侧的`浏览网站`下的`浏览*.****`，即可访问。
:::

::: details 2.使用Python的本地服务器（需要安装Python）
1.先找到你下载的`dist`文件夹并打开。<br>
2.点击上方地址栏，删除原有内容，并根据自己的Python版本输入以下命令：
```bash
# Python3.x
python -m http.server 8080

# Python2.x
python -m SimpleHTTPServer 8080
```
3.访问：
```
https://localhost:8080
```
<br>
:::

<DownloadLinkCollector
  title="WGdocs构建文件"
  bg-image="https://img3.downza.cn/zt/202212/103056-6397e3e0afd4a.jpg"
  bcolor="gold"
  :downloads="[
  {
    text: 'huang1111网盘',
    link: 'https://pan.huang1111.cn/s/YLQ9WCA',
  },
  ]"
/>
