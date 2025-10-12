// docs/.vitepress/theme/components/ImgViewer.ts
import { nextTick } from 'vue'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import {FancyboxOptions} from "@fancyapps/ui";

// 查找图像最近的标题（逻辑不变）
const findNearestHeading = (imgElement: HTMLImageElement) => {
    let currentElement: HTMLElement | null = imgElement
    while (currentElement && currentElement !== document.body) {
        let previousSibling: Element = currentElement.previousElementSibling
        while (previousSibling) {
            if (previousSibling.tagName.match(/^H[1-6]$/)) {
                return previousSibling.textContent?.replace(/\u200B/g, '').trim() || ''
            }
            previousSibling = previousSibling.previousElementSibling
        }
        currentElement = currentElement.parentElement
    }
    return ''
}

// 关键：给 bindFancybox 加 async（因为内部有 await）
export const bindFancybox = async () => {
    document.querySelectorAll('.vp-nolebase-git-changelog-commit-avatar.inline-block.h-6.w-6.rounded-full.v-middle').forEach(img => {
        img.classList.add('no-zoom');
    });
    await nextTick(async () => {
        // 动态导入 Fancybox（await 需在 async 函数内）
        const { Fancybox } = await import('@fancyapps/ui')
        const imgs = document.querySelectorAll('.vp-doc img')

        imgs.forEach((img) => {
            const image = img as HTMLImageElement
            // 统一设置 data-fancybox（归入同一图库）
            if (!image.hasAttribute('data-fancybox')) {
                image.setAttribute('data-fancybox', 'gallery')
            }
            // 补全 alt 属性（用最近的标题）
            if (!image.hasAttribute('alt') || image.getAttribute('alt') === '') {
                const heading = findNearestHeading(image)
                image.setAttribute('alt', heading)
            }
            // 设置图片标题（用 alt 内容）
            const altString = image.getAttribute('alt') || ''
            image.setAttribute('data-caption', altString)
        })

        // 绑定 Fancybox 配置（逻辑不变）
        Fancybox.bind('[data-fancybox="gallery"]:not(.no-zoom)', {
            Hash: false,
            caption: false,
            Thumbs: {
                type: 'classic',
                showOnStart: false
            },
            Images: {
                Panzoom: { maxScale: 4 }
            },
            Carousel: { transition: 'slide' },
        } as Partial<FancyboxOptions>)
    })
}

// 关键：给 destroyFancybox 加 async（因为内部有 await）
export const destroyFancybox = async () => {
    const { Fancybox } = await import('@fancyapps/ui')
    Fancybox.destroy()
}