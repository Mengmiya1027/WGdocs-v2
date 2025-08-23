<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const urls = [
  'https://baike.baidu.com/item/国家反诈中心',
  'https://sj.qq.com/appdetail/com.hicorenational.antifraud',
  'https://apps.microsoft.com/detail/xp8jmdj14cq1xk?hl=zh-CN&gl=CN',
  'https://apps.apple.com/cn/app/国家反诈中心/id15528231302',
  'https://www.mps.gov.cn/',
  'https://www.gov.cn/lianbo/bumen/202506/content_7028568.htm'
];

const permissionPrompt = ref(null);
const hasOpened = ref(false); // 标志访问完成的变量
let clickHandler = null;

function checkPopupPermission() {
  const testWindow = window.open('', '_blank');
  if (testWindow) {
    testWindow.close();
    return true;
  }
  return false;
}

function openUrlsSequentially(index = 0) {
  if (index >= urls.length) {
    hasOpened.value = true; // 所有链接打开完成后标记为已完成
    return;
  }

  const newWindow = window.open(urls[index], '_blank');
  if (!newWindow) {
    permissionPrompt.value.style.display = 'flex';
    return;
  }

  setTimeout(() => openUrlsSequentially(index + 1), 100);
}

onMounted(() => {
  if (!hasOpened.value) {
    const initialPermission = checkPopupPermission();
    if (initialPermission) {
      openUrlsSequentially();
    } else {
      permissionPrompt.value.style.display = 'flex';
    }
  }

  clickHandler = () => {
    if (hasOpened.value) return;
    
    const currentPermission = checkPopupPermission();
    if (currentPermission) {
      permissionPrompt.value.style.display = 'none';
      openUrlsSequentially();
    }
  };

  document.addEventListener('click', clickHandler);
});

onUnmounted(() => {
  if (clickHandler) {
    document.removeEventListener('click', clickHandler);
  }
});
</script>

<!-- 显示完成状态 -->
<div v-if="hasOpened">
  <h1>你还就真信啊？</h1>
  <p>未知链接不能点，防人之心不可无！</p>
</div>

<div ref="permissionPrompt" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: none; justify-content: center; align-items: center;">
  <div style="text-align: center; color: white; padding: 2rem;">
    <h1>打开▮▮资料网站失败</h1>
    <p>请在弹出的提示窗口中 或地址栏最右侧 允许本网站打开弹出窗口以继续</p>
    <p>点击页面任意位置重试</p>
  </div>
</div>