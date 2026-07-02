<script setup>
import { defineComponent, h, nextTick, onMounted, ref } from 'vue'

const ROUTE_SCROLL_CONTAINER_SELECTOR = '[data-route-scroll-container]'

const routeViewportRef = ref(null)

const RoutePageShell = defineComponent({
  name: 'RoutePageShell',
  props: {
    viewComponent: {
      required: true
    }
  },
  setup(props) {
    return () => h('div', { class: 'route-page-shell' }, [h(props.viewComponent)])
  }
})

const resetElementScroll = (element) => {
  if (!element) return

  element.scrollTop = 0
  element.scrollLeft = 0
}

const resetRouteScroll = async (routeElement) => {
  await nextTick()

  const scrollContainers = routeElement?.querySelectorAll?.(ROUTE_SCROLL_CONTAINER_SELECTOR) ?? []
  scrollContainers.forEach(resetElementScroll)
}

onMounted(() => {
  resetRouteScroll(routeViewportRef.value)
})
</script>

<template>
  <GeneralHeader></GeneralHeader>
  <div ref="routeViewportRef" class="route-viewport">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in" @before-enter="resetRouteScroll">
        <keep-alive>
          <RoutePageShell v-if="Component" :key="route.path" :view-component="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
.route-viewport,
.route-page-shell {
  min-height: 100vh;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  will-change: opacity, transform;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (prefers-reduced-motion: reduce) {
  .fade-transform-enter-active,
  .fade-transform-leave-active {
    transition: none;
  }

  .fade-transform-enter-from,
  .fade-transform-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
