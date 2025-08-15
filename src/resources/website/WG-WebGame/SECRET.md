---
readingTime: false
wordCount: false
---
# WG-WebGame
### 第二十关

<mark>最后</mark>一关啦~直接送你过关吧~

<script setup>
import { ref } from "vue"; 
// 控制按钮文字
const buttonText = ref('下一步');
// 控制组件显示状态
const showWGwgc = ref(false);

const goToGamePage = () => {
  // 修改按钮文字
  buttonText.value = '你不会真以为能成吧？';
  // 显示WGwgc组件
  showWGwgc.value = true;
};
</script>

<div style="text-align: center; margin: 20px 0;">
  <button 
    style="background-color: rgba(66, 133, 244, 1); color: white; border: none; border-radius: 999px; padding: 10px 20px; font-size: 16px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(66, 133, 244, 0.7);"
    onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 15px rgba(66, 133, 244, 0.9)'; this.style.backgroundColor='rgba(66, 133, 244, 1)'; this.querySelector('span').style.transform='translateX(3px)';"
    onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 10px rgba(66, 133, 244, 0.7)'; this.style.backgroundColor='rgba(66, 133, 244, 0.9)'; this.querySelector('span').style.transform='translateX(0)';"
    @click="goToGamePage"
  >
    {{ buttonText }}
    <span style="margin-left: 8px; transition: transform 0.3s ease;">→</span>
  </button>
</div>

<!-- 条件渲染WGwgc组件 -->
<div v-if="showWGwgc" style="margin-top: 20px; text-align: center;">
  <hr>
  <WGwgc></WGwgc>
</div>