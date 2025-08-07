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

wgdocs.dpdns.org访问的秒加载，就是这个偶然的发现带来的

:::

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
需要手动设置DNS为优质公共DNS，如CF的1.1.1.1，华为的114.114.114.114，谷歌的8.8.8.8。<br><a href="ms-settings:network-status" target="_blank">打开网络连接设置</a>
:::

<LinkCard
  title="wgdocs.dpdns.org"
  bg-image="/pictures/Cloudflare账户.png"
  link="wgdocs.dpdns.org"
/>

带人机质询验证：（如果其他的都被DDos冲挂了可以试试这个）

<LinkCard
  title="mengmiya1027.dpdns.org"
  bg-image="/pictures/Cloudflare账户.png"
  link="mengmiya1027.dpdns.org"
/>

### 4.域名来自ClouDNS<badge type='tip' text='主同步频道' /><badge type='tip' text='快速' />

<LinkCard
  title="mengmiya1027.ip-ddns.com"
  bg-image="https://www.cloudns.net/i/cloudns_yt_image-fs8.png"
  link="mengmiya1027.ip-ddns.com"
/>

<LinkCard
  title="mengmiya1027.ddns-ip.net"
  bg-image="https://www.cloudns.net/i/cloudns_yt_image-fs8.png"
  link="mengmiya1027.ddns-ip.net"
/>

### 5.InfinityFree<badge type='tip' text='主同步频道' /><badge type='info' text='中速' />

<LinkCard
  title="wgdocs.mmy.kesug.com"
  bg-image="/pictures/Cloudflare账户.png"
  link="wgdocs.mmy.kesug.com"
/>
从infinityfree分出来的CNAME记录的域名

---

##### 接下来的是开发测试用地址，非开发人员就别看了哈

---

### 6.Localhost<badge type='warning' text='测试用' />
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
