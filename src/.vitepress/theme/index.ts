// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { h, type Plugin, onMounted, onUnmounted } from 'vue';
import { useData, useRoute, inBrowser } from 'vitepress';

import { NolebaseGitChangelogPlugin, Options } from '@nolebase/vitepress-plugin-git-changelog/client';
import { NolebasePagePropertiesPlugin } from '@nolebase/vitepress-plugin-page-properties';
import { NolebaseEnhancedReadabilitiesMenu, NolebaseEnhancedReadabilitiesScreenMenu, } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client';
import { NolebaseEnhancedReadabilitiesPlugin } from '@nolebase/vitepress-plugin-enhanced-readabilities/client';
import codeblocksFold from 'vitepress-plugin-codeblocks-fold';
import { NolebaseHighlightTargetedHeading } from '@nolebase/vitepress-plugin-highlight-targeted-heading/client';
import { InjectionKey } from '@nolebase/vitepress-plugin-git-changelog/client';
import { ShareButton } from '@theojs/lumen';//不好看
import { HomeFooter } from '@theojs/lumen'
import { Footer_Data } from '../data/footerData.ts';
import { NolebaseInlineLinkPreviewPlugin } from '@nolebase/vitepress-plugin-inline-link-preview/client'

import '@shikijs/vitepress-twoslash/style.css';
import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'
import "vitepress-markdown-timeline/dist/theme/index.css";
import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css';
import 'vitepress-plugin-codeblocks-fold/style/index.css';
import '@nolebase/vitepress-plugin-page-properties/client/style.css';
import '@nolebase/vitepress-plugin-enhanced-mark/client/style.css';
import Confetti from "./components/Confetti.vue";
import { bindFancybox, destroyFancybox } from './components/ImgViewer' // 图片查看器
import { useSidebarHeight } from './components/useSidebarHeight'

import Hero from '../theme/Layout.vue';
import APC_DocAfter from './APC/Doc_after.vue';
import APC_Bottom from './APC/bottom.vue';
import NCard from './components/NCard.vue';
import MusicPlayer from './components/MusicPlayer.vue'
import MusicPlayerAllPage from './components/MusicPlayerAllPage.vue'
import ImageSlider from './components/ImageSlider.vue'
import DownloadLinkCollector from './components/DownloadLinkCollector.vue'
import LinkCard from './components/LinkCard.vue'
import UpdateLogPopup from './components/UpdateLogPopup.vue';
import WGWebGameChecker from './components/WG-WebGame-Checker.vue';
import BGMusicEd from './components/BGMusicEd.vue';
import { getSettings } from './components/settingsControl';
import SettingsPanel from './components/SettingsPanel.vue';

import './custom.css';
import './style/v3-better.css'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 'aside-outline-before': () => h(ShareButton),
      'home-hero-before': () => h(Hero),
      'layout-bottom': () => [h(HomeFooter, { Footer_Data }), h(APC_Bottom)],
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
      'layout-top': () => [h(NolebaseHighlightTargetedHeading)],
      'doc-after': () => h(APC_DocAfter)
    })
  },
  enhanceApp({ app, router }) {
    if (inBrowser) {
      router.onBeforeRouteChange = () => {
      destroyFancybox() // 销毁图片查看器
      }
      router.onAfterRouteChange = () => {
        bindFancybox() // 绑定图片查看器
      }
    }
    app.component("Confetti", Confetti); //注册全局组件
    app.use(NolebaseEnhancedReadabilitiesPlugin, {
      spotlight: {
        disableHelp: true,
        defaultToggle: true,
      }
    } as Options);
    app.use(TwoslashFloatingVue);
    console.log(getSettings());
    app.component('NCard', NCard);
    app.component('MusicPlayer', MusicPlayer)
    app.component('MusicPlayerAP', MusicPlayerAllPage)
    app.component('ImageSlider', ImageSlider)
    app.component('DownloadLinkCollector', DownloadLinkCollector)
    app.component('LinkCard', LinkCard)
    app.component('UpdateLogPopup', UpdateLogPopup)
    app.component('WGwgc', WGWebGameChecker)
    app.component('BGMusicEd', BGMusicEd)
    app.component('SettingsPanel', SettingsPanel)
    app.use(TwoslashFloatingVue as unknown as Plugin);
    app.use(NolebaseGitChangelogPlugin);
    app.provide(InjectionKey, {
      hideChangelogNoChangesText: true,
      commitsRelativeTime: true,
      displayAuthorsInsideCommitLine: true,
      hideContributorsHeader: true,
      hideChangelogHeader: true
    });
    app.use(NolebaseInlineLinkPreviewPlugin as Plugin);
    app.use(NolebasePagePropertiesPlugin<{
      progress: number
    }>() as Plugin, {
      dev: true,
      properties: {
        'zh-CN': [
          {
            key: 'wordCount',
            type: 'dynamic',
            title: '字数',
            options: {
              type: 'wordsCount',
            },
          },
          {
            key: 'readingTime',
            type: 'dynamic',
            title: '阅读时间',
            options: {
              type: 'readingTime',
              dateFnsLocaleName: 'zhCN',
            },
          },
          {
            key: 'updatedAt',
            type: 'datetime',
            title: '更新时间',
            formatAsFrom: true,
            dateFnsLocaleName: 'zhCN',
          },
        ],
      },
    });
  },
  setup() {
    const route = useRoute();
    const { frontmatter } = useData();
    codeblocksFold({ route, frontmatter }, true, 400);
    onMounted(() => {
      bindFancybox()
      const { init } = useSidebarHeight(/* debug: false */)
      init() // 自动完成「初始化 + 事件绑定 + 路由监听」
    })
    onUnmounted(() => {
      destroyFancybox()
    })
  }
}