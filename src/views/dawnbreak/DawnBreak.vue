<script setup>
import { computed, onActivated, onDeactivated, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown, ArrowUp, Expand, Fold } from '@element-plus/icons-vue'

import dawnBreakBanner from '@/assets/images/general/dawn-break-banner.png'
import dawnbreakCover from '@/assets/images/general/dawnbreak-cover.png'
import rosaCover from '@/assets/images/general/rosa-cover.png'
import playgroundCover from '@/assets/images/general/playground-cover.png'

const router = useRouter()
const route = useRoute()

const sections = [
  {
    id: 'main',
    hash: '#main',
    no: '00',
    navTitle: '黎明已至',
    kicker: 'Prologue',
    title: '黎明已至',
    subtitle: '这是一个暂时空白、但已经准备醒来的故事入口。',
    bgUrl: dawnBreakBanner,
    copy: [
      '长夜并不总是终点。',
      '当第一束光越过边界，旧世界的轮廓开始松动。',
      '这里会成为故事条目的总览，也会是读者第一次抵达破晓的地方。'
    ]
  },
  {
    id: 'embers',
    hash: '#embers',
    no: '01',
    navTitle: '余烬仍明',
    kicker: 'Archive',
    title: '余烬仍明',
    subtitle: '给未来的第一组故事留一个可以呼吸的位置。',
    bgUrl: dawnbreakCover,
    copy: [
      '废墟并非沉默，它只是把声音藏得更深。',
      '抽屉中未来可以放入章节、人物、地图或设定索引。',
      '此刻先保留样板文案，让页面节奏和交互先成形。'
    ]
  },
  {
    id: 'rose',
    hash: '#rose',
    no: '02',
    navTitle: '蔷薇回声',
    kicker: 'Memory',
    title: '蔷薇回声',
    subtitle: '在黎明之前，每一次回望都带着微弱的光。',
    bgUrl: rosaCover,
    copy: [
      '一段故事可以从人物开始，也可以从一枚意象开始。',
      '背景会随章节平滑淡入淡出，而文字只做轻微位移。',
      '用户往下滑时，感受到的是章节变换，而不是长页面滚动。'
    ]
  },
  {
    id: 'horizon',
    hash: '#horizon',
    no: '03',
    navTitle: '地平线之后',
    kicker: 'Next',
    title: '地平线之后',
    subtitle: '当内容原稿到来，这里就能继续向外铺开。',
    bgUrl: playgroundCover,
    copy: [
      '最后一屏先作为占位。',
      '后续可以把每个条目扩展成章节详情、人物档案或时间线。',
      '现在的目标，是让“黎明已至”拥有一个可进入、可切换、可继续施工的导航界面。'
    ]
  }
]

const activeIndex = ref(0)
const drawerOpen = ref(window.innerWidth > 620)
const wheelLocked = ref(false)
const touchStartY = ref(0)
let listenersActive = false

const activeSection = computed(() => sections[activeIndex.value])
const progressText = computed(
  () => `${String(activeIndex.value + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')}`
)

const setActiveSection = (nextIndex, shouldUpdateHash = true) => {
  const safeIndex = Math.min(Math.max(nextIndex, 0), sections.length - 1)
  activeIndex.value = safeIndex

  if (shouldUpdateHash && route.hash !== sections[safeIndex].hash) {
    router.replace({ name: 'dawnbreak', hash: sections[safeIndex].hash })
  }
}

const syncFromHash = () => {
  if (route.name !== 'dawnbreak') return

  const matchedIndex = sections.findIndex((section) => section.hash === route.hash)
  if (matchedIndex >= 0) {
    setActiveSection(matchedIndex, false)
    return
  }

  router.replace({ name: 'dawnbreak', hash: sections[0].hash })
}

const stepSection = (direction) => {
  setActiveSection(activeIndex.value + direction)
}

const handleWheel = (event) => {
  event.preventDefault()

  if (wheelLocked.value || Math.abs(event.deltaY) < 12) return

  wheelLocked.value = true
  stepSection(event.deltaY > 0 ? 1 : -1)

  window.setTimeout(() => {
    wheelLocked.value = false
  }, 720)
}

const handleKeydown = (event) => {
  if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault()
    stepSection(1)
  }

  if (['ArrowUp', 'PageUp'].includes(event.key)) {
    event.preventDefault()
    stepSection(-1)
  }
}

const handleTouchStart = (event) => {
  touchStartY.value = event.touches[0].clientY
}

const handleTouchEnd = (event) => {
  const touchEndY = event.changedTouches[0].clientY
  const distance = touchStartY.value - touchEndY

  if (Math.abs(distance) > 40) {
    stepSection(distance > 0 ? 1 : -1)
  }
}

watch(
  () => route.hash,
  () => {
    syncFromHash()
  }
)

const activateListeners = () => {
  if (listenersActive) return

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd)
  listenersActive = true
}

const deactivateListeners = () => {
  if (!listenersActive) return

  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  listenersActive = false
}

onMounted(() => {
  syncFromHash()
  activateListeners()
})

onActivated(() => {
  syncFromHash()
  activateListeners()
})

onDeactivated(() => {
  deactivateListeners()
})

onUnmounted(() => {
  deactivateListeners()
})
</script>

<template>
  <div class="dawnbreak-page">
    <div class="background-stack">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="story-background"
        :class="{ active: index === activeIndex }"
        :style="{ backgroundImage: `url(${section.bgUrl})` }"
      ></div>
      <div class="background-veil"></div>
    </div>

    <button
      class="drawer-toggle"
      type="button"
      :aria-label="drawerOpen ? '收起故事抽屉' : '展开故事抽屉'"
      @click="drawerOpen = !drawerOpen"
    >
      <el-icon>
        <Fold v-if="drawerOpen" />
        <Expand v-else />
      </el-icon>
    </button>

    <aside class="story-drawer" :class="{ collapsed: !drawerOpen }">
      <div class="drawer-header">
        <p>DAWN INDEX</p>
        <h2>故事条目</h2>
      </div>
      <nav class="story-list" aria-label="黎明已至故事条目">
        <button
          v-for="(section, index) in sections"
          :key="section.id"
          type="button"
          :class="{ active: index === activeIndex }"
          @click="setActiveSection(index)"
        >
          <span>{{ section.no }}</span>
          <strong>{{ section.navTitle }}</strong>
        </button>
      </nav>
      <p class="drawer-note">未来这里可以承载章节、人物、地点或设定索引。</p>
    </aside>

    <main class="story-stage">
      <transition name="chapter-fade" mode="out-in">
        <section :key="activeSection.id" class="chapter-panel">
          <p class="kicker">{{ activeSection.kicker }}</p>
          <h1>{{ activeSection.title }}</h1>
          <h3>{{ activeSection.subtitle }}</h3>
          <div class="chapter-copy">
            <p v-for="line in activeSection.copy" :key="line">{{ line }}</p>
          </div>
        </section>
      </transition>

      <div class="chapter-controls">
        <button type="button" :disabled="activeIndex === 0" aria-label="上一节" @click="stepSection(-1)">
          <el-icon><ArrowUp /></el-icon>
        </button>
        <span>{{ progressText }}</span>
        <button
          type="button"
          :disabled="activeIndex === sections.length - 1"
          aria-label="下一节"
          @click="stepSection(1)"
        >
          <el-icon><ArrowDown /></el-icon>
        </button>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dawnbreak-page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #071019;
  color: #fff6e3;
}

.background-stack {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.story-background {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transform: scale(1.05);
  filter: saturate(0.92) contrast(1.04);
  transition:
    opacity 1.1s ease,
    transform 1.8s ease;

  &.active {
    opacity: 1;
    transform: scale(1);
  }
}

.background-veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 34%, rgba(255, 212, 142, 0.16), transparent 34%),
    linear-gradient(90deg, rgba(3, 8, 14, 0.88), rgba(7, 14, 22, 0.44) 44%, rgba(5, 11, 18, 0.76)),
    linear-gradient(180deg, rgba(3, 8, 12, 0.26), rgba(3, 8, 12, 0.88));
}

.drawer-toggle {
  position: fixed;
  top: 68px;
  left: 24px;
  z-index: 12;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 241, 207, 0.34);
  border-radius: 50%;
  background: rgba(5, 13, 21, 0.58);
  color: #fff6e3;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition:
    background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: rgba(255, 226, 178, 0.18);
    transform: translateY(-2px);
  }
}

.story-drawer {
  position: fixed;
  top: 126px;
  bottom: 32px;
  left: 24px;
  z-index: 10;
  width: 280px;
  padding: 26px 22px;
  border-left: 1px solid rgba(255, 235, 196, 0.5);
  background: linear-gradient(180deg, rgba(8, 17, 27, 0.8), rgba(8, 17, 27, 0.42));
  box-shadow: 24px 0 70px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(16px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    visibility 0.35s ease;

  &.collapsed {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-32px);
  }
}

.drawer-header {
  margin-bottom: 34px;

  p {
    margin-bottom: 8px;
    font-family: 'texgyrecursor-regular';
    font-size: 16px;
    color: rgba(255, 233, 190, 0.72);
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
  }
}

.story-list {
  display: flex;
  flex-direction: column;
  gap: 14px;

  button {
    display: grid;
    grid-template-columns: 44px 1fr;
    align-items: center;
    min-height: 54px;
    border: 0;
    border-bottom: 1px solid rgba(255, 239, 207, 0.16);
    background: transparent;
    color: rgba(255, 246, 227, 0.74);
    text-align: left;
    cursor: pointer;
    transition:
      color 0.25s ease,
      transform 0.25s ease;

    span {
      font-family: 'texgyrecursor-regular';
      color: rgba(255, 214, 151, 0.78);
    }

    strong {
      font-size: 16px;
      font-weight: 500;
    }

    &.active,
    &:hover {
      color: #fff9eb;
      transform: translateX(8px);
    }

    &.active {
      border-bottom-color: rgba(255, 221, 166, 0.76);
    }
  }
}

.drawer-note {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 24px;
  color: rgba(255, 246, 227, 0.58);
  font-size: 13px;
  line-height: 1.9;
}

.story-stage {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 44px 8vw 54px 360px;
  display: flex;
  align-items: center;
}

.chapter-panel {
  width: min(820px, 68vw);
  text-shadow: 0 3px 18px rgba(0, 0, 0, 0.46);

  .kicker {
    margin-bottom: 18px;
    font-family: 'texgyrecursor-regular';
    font-size: 24px;
    color: rgba(255, 222, 165, 0.82);
  }

  h1 {
    margin-bottom: 18px;
    font-size: 84px;
    font-weight: 700;
  }

  h3 {
    margin-bottom: 34px;
    font-size: 24px;
    font-weight: 400;
    color: rgba(255, 246, 227, 0.82);
  }
}

.chapter-copy {
  display: grid;
  gap: 14px;
  width: min(680px, 100%);

  p {
    color: rgba(255, 246, 227, 0.76);
    font-size: 17px;
    line-height: 2;
  }
}

.chapter-controls {
  position: fixed;
  right: 38px;
  bottom: 38px;
  z-index: 12;
  display: flex;
  align-items: center;
  gap: 16px;
  color: rgba(255, 246, 227, 0.74);
  font-family: 'texgyrecursor-regular';

  button {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(255, 241, 207, 0.3);
    border-radius: 50%;
    background: rgba(5, 13, 21, 0.5);
    color: #fff6e3;
    cursor: pointer;
    backdrop-filter: blur(12px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      background 0.25s ease;

    &:hover:not(:disabled) {
      background: rgba(255, 226, 178, 0.18);
      transform: translateY(-2px);
    }

    &:disabled {
      cursor: default;
      opacity: 0.28;
    }
  }
}

.chapter-fade-enter-active,
.chapter-fade-leave-active {
  transition:
    opacity 0.46s ease,
    transform 0.46s ease,
    filter 0.46s ease;
}

.chapter-fade-enter-from {
  opacity: 0;
  transform: translateY(22px);
  filter: blur(8px);
}

.chapter-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
  filter: blur(8px);
}

@media (max-width: 980px) {
  .story-stage {
    padding-left: 72px;
  }

  .story-drawer {
    width: min(280px, calc(100vw - 48px));
  }

  .chapter-panel {
    width: min(760px, 82vw);

    h1 {
      font-size: 64px;
    }
  }
}

@media (max-width: 620px) {
  .drawer-toggle {
    top: 58px;
    left: 16px;
  }

  .story-drawer {
    top: 110px;
    left: 16px;
    right: 16px;
    bottom: 92px;
    width: auto;
  }

  .story-stage {
    padding: 74px 22px 108px;
  }

  .chapter-panel {
    width: 100%;

    .kicker {
      font-size: 20px;
    }

    h1 {
      font-size: 44px;
    }

    h3 {
      font-size: 18px;
      line-height: 1.7;
    }
  }

  .chapter-copy p {
    font-size: 15px;
  }

  .chapter-controls {
    right: 22px;
    bottom: 24px;
  }
}
</style>
