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
    },
    notFound: {
        code: '404',
        title: '页面未找到',
        quote: '您访问的页面找不到啦~\n' +
            '可以试试返回上个链接\n' +
            '或者点击下面的按钮返回主页哦~',
        linkLabel: '返回主页面',
        linkText: '返回主页面'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '开始探索',
      activeMatch: '/guide/',
      items: [
        { text: '开始探索', link: '/guide/start-discover' },
        { text: '更新日志&新功能介绍', link: '/guide/new' },
        { text: '站内导览', link: '/guide/link' }
      ]
    },
    {
      text: '资源中心',
      activeMatch: '/resources/',
      items: [
        {
          text: '应用程序',
          items: [
            { text: '独立型应用程序', link: '/resources/application/single' },
            { text: '打包型应用程序', link: '/resources/application/pack' },
          ]
        },
        { text: '网站', link: '/resources/website' },
        { text: '图片', link: '/resources/picture' },
        { text: '视频', link: '/resources/video' },
      ]
    },
    {
        text: 'Pro Servise',
        activeMatch: '/pro/',
        items: [
            { text: '加速服务', link: '/pro/speed' },
            { text: '文件快递柜', link: '/pro/filehelper' },
            { text: '哈基米语翻译器', link: '/pro/hajimi' }
        ]
    },
    {
      text: '关于',
      link: '/other/',
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
        { text: '开始探索', link: '/start-discover' },
        { text: '更新日志&新功能介绍', link: '/new' },
        { text: '站内导览', link: '/link' }
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
          collapsed: true,
          items: [  /* 应用程序 仿照这里的格式进行编写*/
            {
              text: '独立型应用程序',
              base: '/resources/application/single',
              collapsed: true,
              items: [
                { text: '介绍', link: '/' },
                { text: '概览', link: '/map' },
                { text: '❗反极域课堂专栏', link: '/JiYuDiaoDuan' },
                { text: '希沃白板爆改', link: '/easinotekz' }
              ]
            },
            {
              text: '打包型应用程序',
              base: '/resources/application/pack',
              collapsed: true,
              items: [
                { text: '介绍', link: '/' },
                { text: '概览', link: '/map' },
                { text: '雷电模拟器 ⚡', link: '/ldmnq' },
                { text: '蛋仔派对', link: '/eggy-party' },
                { text: 'Minecraft（我的世界）', link: '/minecraft' },
                { text: 'Motrix', link: '/motrix' }
              ]
            }
          ]
        },
        {
          text: '网站',
          base: '/resources/website',
          collapsed: true,
          items: [
            { text: '介绍', link: '/' },
            { text: '概览', link: '/map' },
            { text: 'MC.js', link: '/mc-js' },
            { text: '原神抽卡模拟器', link: '/yschou' },
            { text: 'WG-WebGame', link: '/WG-WebGame/' },
            { text: '▮▮学习资料网站', link: '/ChinaFZ110' },
          ]
        },
        {
          text: '图片',
          base: '/resources/picture',
          collapsed: true,
          items: [
            { text: '概览', link: '/map' },
            { text: '蛋仔~', link: '/eggy' },
          ]
        },
        {
          text: '视频',
          base: '/resources/video',
          collapsed: true,
          items: [
            { text: '概览', link: '/map' },
            { text: '嚣张牌小品的珍贵实录', link: '/penguin' },
            { text: '几个子儿', link: '/im-wzxq' }
          ]
        },
      ]
    },
    {
      text: 'WGdocs Pro Service',
      base: '/pro',
      collapsed: false,
      items: [
        { text: '概览', link: '/' },
        { text: '加速访问&镜像站点', link: '/speed' },
        { text: '文件快递柜', link: '/filehelper' },
        { text: '哈基米语翻译器', link: '/hajimi' }
      ]
    },
    {
      text: '社区',
      base: '/community',
      collapsed: false,
      items: [
        { text: '上传资源', link: '/upload' },
        { text: '架构', link: '/architecture' },
        { text: '开发人员工具', link: '/DevTools'}
      ]
    },
    {
      text: '其他',
      base: '/other',
      collapsed: false,
      items: [
        { text: '关于', link: '/' },
        { text: '偏好设置', link: '/settings' }
      ]
    }
  ]
}
