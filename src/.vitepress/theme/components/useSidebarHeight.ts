// .vitepress/theme/composables/useSidebarHeight.ts
import { onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

/**
 * 侧边栏高度计算组合式函数
 * @param debug 是否开启调试日志（默认 true）
 */
export function useSidebarHeight(debug = true) {
    // 存储已绑定的事件，用于卸载时清理（避免内存泄漏）
    const eventListeners: Array<{
        element: HTMLElement
        event: string
        handler: EventListener
    }> = []

    // --------------------------
    // 1. 核心：递归计算可见高度（只算标题栏 + 未折叠子列表）
    // --------------------------
    const calculateVisibleHeight = (container: HTMLElement, depth = 0): number => {
        let totalHeight = 0
        const indent = '  '.repeat(depth)

        // 只取当前容器的直接子项（.VPSidebarItem）
        const directChildren = Array.from(container.children).filter(child =>
            child.classList.contains('VPSidebarItem')
        ) as HTMLElement[]

        directChildren.forEach((child, index) => {
            const childTitle = child.textContent?.trim().slice(0, 30) + '...' || '无标题'
            const isCollapsed = child.classList.contains('collapsed')
            const subList = child.querySelector<HTMLElement>('.items')
            const hasSubList = !!subList

            // 调试日志
            debug && console.log(`${indent}  🔍 子项 ${index + 1}:`, {
                标题: childTitle,
                折叠状态: isCollapsed ? '✅ 折叠' : '❌ 未折叠',
                有子列表: hasSubList
            })

            // 只加「标题栏」高度（.item 元素，排除子列表）
            const titleEl = child.querySelector<HTMLElement>('.item')
            const titleHeight = titleEl ? titleEl.offsetHeight : 0
            totalHeight += titleHeight
            debug && console.log(`${indent}    ➡️  加标题高度: ${titleHeight}px（累计: ${totalHeight}px）`)

            // 未折叠且有子列表：递归计算子列表高度
            if (!isCollapsed && hasSubList && subList) {
                debug && console.log(`${indent}    ➡️  递归计算子列表: ${childTitle}`)
                const subListHeight = calculateVisibleHeight(subList, depth + 1)
                totalHeight += subListHeight
                debug && console.log(`${indent}    ➡️  加子列表高度: ${subListHeight}px（累计: ${totalHeight}px）`)
            } else if (isCollapsed) {
                debug && console.log(`${indent}    ➡️  子项折叠，跳过子列表`)
            }
        })

        // 调试日志（容器计算结果）
        debug && console.log(`${indent}📦 容器总高度: ${totalHeight}px\n`)
        return totalHeight
    }

    // --------------------------
    // 2. 初始化侧边栏高度（页面加载/路由切换时执行）
    // --------------------------
    const initSidebarHeight = () => {
        debug && console.log('\n==================================================')
        debug && console.log('🎯 开始初始化侧边栏高度')

        const sidebarItems = document.querySelectorAll<HTMLElement>('.VPSidebarItem')
        if (sidebarItems.length === 0) {
            debug && console.log('⚠️  未找到侧边栏元素，初始化跳过')
            return
        }

        sidebarItems.forEach(item => {
            const itemTitle = item.textContent?.trim().slice(0, 30) + '...' || '根项'
            const subList = item.querySelector<HTMLElement>('.items')
            if (!subList) return

            // 折叠状态：设为 0
            if (item.classList.contains('collapsed')) {
                subList.style.maxHeight = '0px'
                debug && console.log(`🎯 [${itemTitle}] 折叠 → 0px`)
            }
            // 未折叠状态：计算高度
            else {
                const height = calculateVisibleHeight(subList)
                subList.style.maxHeight = `${height}px`
                debug && console.log(`🎯 [${itemTitle}] 展开 → ${height}px`)
            }
        })
    }

    // --------------------------
    // 3. 绑定侧边栏点击事件（展开/收起时更新高度）
    // --------------------------
    const bindSidebarEvents = () => {
        // 先清理已有的事件（避免重复绑定）
        cleanupEvents()

        debug && console.log('\n🎯 绑定侧边栏点击事件')
        const sidebarItems = document.querySelectorAll<HTMLElement>('.VPSidebarItem')

        sidebarItems.forEach(item => {
            const trigger = item.querySelector<HTMLElement>('.VPSidebarItem-title') || item
            const subList = item.querySelector<HTMLElement>('.items')
            if (!trigger || !subList) return

            // 点击事件处理函数
            const handleClick = () => {
                const itemTitle = item.textContent?.trim().slice(0, 30) + '...' || '根项'
                debug && console.log(`\n==================================================`)
                debug && console.log(`🎯 点击 [${itemTitle}] → 折叠状态: ${item.classList.contains('collapsed')}`)

                // 展开：计算高度
                if (!item.classList.contains('collapsed')) {
                    const height = calculateVisibleHeight(subList)
                    subList.style.maxHeight = `${height}px`
                    debug && console.log(`🎯 展开 → 设为 ${height}px`)
                }
                // 收起：设为 0
                else {
                    subList.style.maxHeight = '0px'
                    debug && console.log(`🎯 收起 → 设为 0px`)
                }
            }

            // 绑定事件并记录（用于后续清理）
            trigger.addEventListener('click', handleClick)
            eventListeners.push({
                element: trigger,
                event: 'click',
                handler: handleClick
            })
        })
    }

    // --------------------------
    // 4. 清理事件监听（页面卸载/路由切换前执行）
    // --------------------------
    const cleanupEvents = () => {
        if (eventListeners.length === 0) return
        debug && console.log('🧹 清理侧边栏事件监听')

        eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler)
        })
        eventListeners.length = 0 // 清空数组
    }

    // --------------------------
    // 5. 自动初始化 + 路由切换重新处理
    // --------------------------
    const init = () => {
        const route = useRoute()

        // 页面首次加载：初始化高度 + 绑定事件
        onMounted(() => {
            initSidebarHeight()
            bindSidebarEvents()
        })

        // 路由切换（比如从 A 页面到 B 页面）：重新初始化（侧边栏可能更新）
        watch(route, () => {
            cleanupEvents() // 先清理旧事件
            setTimeout(() => { // 延迟执行：等待侧边栏 DOM 重新渲染
                initSidebarHeight()
                bindSidebarEvents()
            }, 100)
        })

        // 页面卸载：清理事件（避免内存泄漏）
        onUnmounted(() => {
            cleanupEvents()
        })
    }

    // 返回对外暴露的方法（按需调用）
    return {
        calculateVisibleHeight, // 暴露计算函数（如需单独调用）
        initSidebarHeight,      // 暴露初始化函数
        bindSidebarEvents,      // 暴露事件绑定函数
        init                    // 自动初始化入口（推荐优先调用）
    }
}