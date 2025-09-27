import type { FooterData } from '@theojs/lumen'

export const Footer_Data: FooterData = {
    author: { name: 'WGdocs', link: 'https://github.com/Mengmiya1027/' },
    group: [
        {
            title: '生态',
            icon: 'fa-solid fa-lightbulb',
            links: [
                { name: 'Github仓库', href: 'https://github.com/Mengmiya1027/WGdocs-v2' },
                { name: '资源上传指南', href: '/community/upload' },
                { name: '架构文档', href: '/community/architecture' },
            ]
        },
        {
            title: '工具',
            icon: 'fa-solid fa-puzzle-piece',
            links: [
                { name: 'Webstorm', href: 'https://www.jetbrains.com/webstorm/' },
                { name: 'Typora', href: 'https://www.typora.com' },
            ]
        },
        {
            title: '社区',
            icon: 'fa-solid fa-expand',
            links: [
                { name: '111暂时没有咩~(点击有惊喜)', href: '/machine/index.html' },
            ]
        }
    ]
}
