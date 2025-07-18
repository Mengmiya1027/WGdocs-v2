import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-CN',
  description: '使用VitePress进行构建、NapcatQQ Docs模板进行开发的v2新版',

  themeConfig: {
    nav: nav(),
    sidebar: sidebarGuide(),

    editLink: {
      pattern: 'https://github.com/Mengmiya1027/WGdocs-main/edit/main/src/:path',
      text: '在 GitHub 上编辑此页面'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '开始探索',
      link: '/guide/start-discover',
      activeMatch: '/guide/'
    },
    {
      text: '关于',
      link: '/other/about',
      activeMatch: '/other/about'
    }
  ]
}

function sidebarGuide(): DefaultTheme.Sidebar {
  return [
    {
      text: '开始探索',
      base: '/guide',
      collapsed: true,
      items: [
        { text: '目录导航', link: '/start-discover' },
        { text: '新功能介绍', link: '/new' },
        { text: '站内快捷方式', link: '/link' }
      ]
    },
    {
      text: '资源',
      base: '/resources',
      collapsed: true,
      items: [
        { text: '概览', link: '/' },
        {
          text: '应用程序',
          base: '/resources/application',
          collapsed: false,
          items: [  /* 应用程序 仿照这里的格式进行编写*/
            { text: '单个型应用程序', link: '/single' },
            { text: '多文件应用程序', link: '/Multi-file' }
          ]
        }
      ]
    },
    {
      text: '使用',
      base: '/use',
      collapsed: true,
      items: [
        { text: '接入框架', link: '/integration' },
        { text: '社区资源', link: '/community' }
      ]
    },
    {
      text: '开发',
      base: '/develop',
      collapsed: true,
      items: [
        { text: '请求接口', link: '/api' },
        { text: '上报事件', link: '/event' },
        { text: '消息类型', link: '/msg' },
        { text: '本体开发', link: '/plugin' },
        { text: '处理文件', link: '/file' },
        {
          text: '完整接口定义',
          base: '/develop/api',
          collapsed: false,
          items: [
            { text: '接口', link: '/doc' },
            { text: '类型', link: '/type' }
          ]
        }
      ]
    },
    {
      text: '协议',
      base: '/onebot',
      collapsed: true,
      items: [
        {
          text: '协议概述',
          link: '/index'
        },
        {
          text: '网络通讯',
          link: '/network'
        },
        {
          text: '事件基础结构',
          link: '/basic_event'
        },
        {
          text: '事件字段详情',
          link: '/event'
        },
        {
          text: '接口基础接口',
          link: '/api'
        },
        {
          text: '消息元素定义',
          link: '/sement'
        },
        {
          text: '差异实现说明',
          link: '/napcat'
        }
      ]
    },
    {
      text: '其余',
      base: '/other',
      collapsed: true,
      items: [
        {
          text: '喵喵',
          link: '/napcat.md'
        },
        {
          text: '安全',
          link: '/security'
        },
        {
          text: '联系',
          link: '/about'
        }
      ]
    },
  ]
}
