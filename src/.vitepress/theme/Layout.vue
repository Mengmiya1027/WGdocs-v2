<template>
    <div
        class="absolute flex flex-col z-[0] w-full !max-w-full items-center justify-center bg-transparent transition-bg overflow-hidden h-[60vh] -top-16 pointer-events-none opacity-[.35] dark:opacity-50">
        <div class="jumbo absolute opacity-60 animate"></div>
    </div>

</template>

<style scoped>
.opacity-\[\.35\] {
    opacity: .35;
}

.bg-transparent {
    background-color: transparent;
}

.overflow-hidden {
    overflow: hidden;
}

.justify-center {
    justify-content: center;
}

.items-center {
    align-items: center;
}

.flex-col {
    flex-direction: column;
}

.\!max-w-full {
    max-width: 100% !important;
}

.w-full {
    width: 100%;
}

.h-\[60vh\] {
    height: 60vh;
}

.flex {
    display: flex;
}

.z-\[40\] {
    z-index: 40;
}

.-top-16 {
    top: -4rem;
}

.absolute {
    position: absolute;
}

.pointer-events-none {
    pointer-events: none;
}

.jumbo {
  --stripes: repeating-linear-gradient(90deg,
    #FF8C00 0%,
    #FFA500 9%,      /* 缩小间隔 */
    #FF6B6B 18%,
    #FF4500 27%,
    #FF4D6D 36%,
    #FF6347 45%,
    #FF1493 54%,
    #FF8C00 63%,     /* 提前循环起点 */
    #FFA500 72%,
    #FF6B6B 81%,
    #FF4500 90%,
    #FF8C00 100%     /* 终点与起点同色 */
  );
  background-size: 300% 100%;  /* 调整为3倍宽度 */
    contain: strict;
    contain-intrinsic-size: 100vw 40vh;
    background-image: var(--stripes);
    background-size: 400% 100%;  /* 调整为横向拉伸 */
    background-position: 100% 50%;
    height: inherit;
    transform: translateZ(0);
    filter: none;
    -webkit-mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%);
    mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%);
}

.opacity-60 {
    opacity: .6;
}

.absolute {
    position: absolute;
}

@keyframes sunset-glow {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: -200% 50%;  /* 移动范围匹配背景尺寸倍数 */
    }
}

.animate.jumbo {
    animation: sunset-glow 30s linear infinite;  /* 再次加快速度 */
}

.jumbo:after {
    content: "";
    background-image: none;
}
</style>