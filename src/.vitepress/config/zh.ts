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
      collapsed: false,
      items: [
        { text: '目录导航', link: '/start-discover' },
        { text: '新功能介绍', link: '/new' },
        { text: '站内快捷方式', link: '/link' }
      ]
    },
    {
      text: '资源',
      base: '/resources',
      collapsed: false,
      items: [
        { text: '概览', link: '/' },
        {
          text: '应用程序',
          base: '/resources/application',
          collapsed: false,
          items: [  /* 应用程序 仿照这里的格式进行编写*/
            {
              text: '独立型应用程序',
              base: '/resources/application/single',
              collapsed: false,
              items: [
                { text: '介绍', link: '/' },
                { text: '概览', link: '/map' },
                { text: '❗反极域课堂专栏', link: '/JiYuDiaoDuan' }
              ]
            },
            {
              text: '打包型应用程序',
              base: '/resources/application/pack',
              collapsed: false,
              items: [
                { text: '介绍', link: '/' },
                { text: '概览', link: '/map' },
                { text: '雷电模拟器 ⚡', link: '/ldmnq' }
              ]
            }
          ]
        },
        {
          text: '图片',
          base: '/resources/picture',
          collapsed: false,
          items: [
            { text: '概览', link: '/map' },
            { text: '唐子9', link: '/tzb' }
          ]
        },
      ]
    },
    {
      text: '社区',
      base: '/community',
      collapsed: false,
      items: [
        { text: '上传资源', link: '/upload' },
        { text: '架构', link: '/architecture' }
      ]
    }
  ]
}
