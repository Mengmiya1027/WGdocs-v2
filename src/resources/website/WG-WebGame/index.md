---
comment: false
---

# 网管自制小游戏

众所周知，网站需要网址来进行导航。网址的格式为`协议://域名/路径`<br>
例如：`https://www.baidu.com`、`https://wgdocs.pages.dev/resources/website/WG-WebGame`

网站为了方便访问，会放一部分公共路径在菜单中，例如这一页左侧的页面导航（电脑端），或者左上角的菜单（手机端）。

但是有的内部路径，网站可能不会放出来。<br>举个例子，[文件快递柜](/pro/filehelper)的后台管理页面在 https://filehelper.up.railway.app/#/admin （别想了，访问需要密码），这个地址为了防止滥用，就不会出现在文件快递柜的菜单栏中。<br>

而这个小游戏就是一个需要你根据提示自己尝试输入正确路径的游戏。

## 游戏方法：
- 1.点击下方按钮，开始游戏
- 2.根据页面题目和提示，在页面最下方地址框的 /resources/website/WG-WebGame 后面输入路径
- 3.点击按钮，提交路径
- 4.如果路径正确，会自动进入下一关。否则，会进入404页面。此时不要点击下面的回到主页，而是点击浏览器的返回按钮，返回上一页。
- 5.重复以上步骤，直到找到正确路径

## 游戏入口：
看懂说明了就点吧

<script setup>
import { useRouter } from 'vitepress';
const router = useRouter();

const goToGamePage = () => {
  router.go('/resources/website/WG-WebGame/1')
}
</script>

<div style="text-align: center; margin: 20px 0;">
  <button 
    style="background-color: rgba(66, 133, 244, 1); color: white; border: none; border-radius: 999px; padding: 10px 20px; font-size: 16px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(66, 133, 244, 0.7);"
    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 15px rgba(66, 133, 244, 0.9)'; this.style.backgroundColor='rgba(66, 133, 244, 1)'; this.querySelector('span').style.transform='translateX(3px)';"
    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 10px rgba(66, 133, 244, 0.7)'; this.style.backgroundColor='rgba(66, 133, 244, 0.9)'; this.querySelector('span').style.transform='translateX(0)';"
    @click="goToGamePage"
  >
    进入游戏
    <span style="margin-left: 8px; transition: transform 0.3s ease;">→</span>
  </button>
</div>

## 卡住了？

结算页面是公开的，可以自己去看答案→[结算页面](./final)