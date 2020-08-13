<template lang="pug">
  #app(ref="app")
    b-loading(:active="isLoading")
    .app-bg(v-if="colorMap")
      svg(xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' :style="colorMap ? `background-color:${colorMap(0)}`: ''")
        g(stroke='#000' stroke-width='66.7' stroke-opacity='0.07')
          circle(
            v-for="i in circleRange"
            :key="i"
            :fill="colorMap ? colorMap(1-(i/(circleCount-1))): '#ffffff'"
            cx='-150'
            cy='0'
            :r='((circleCount+2) * 100)-(i+1)*100'
          )
    .hero.is-primary.is-transparent.is-fullheight
      .hero-head.is-family-secondary
        b-navbar(wrapper-class="container" :mobile-burger="false" spaced)
          template(slot="start" class="start")
            b-navbar-item(tag="p")
              router-link.has-text-weight-bold.has-text-white(:to="{name:'Home'}") Quick color gradients
          template(slot="end" class="end")
            b-navbar-item(tag="p")
              router-link.has-text-weight-medium.has-text-white(:to="{name: 'About'}") Created by Alan Rynne
      .hero-body
        transition(name="smooth" mode="out-in")
          router-view
      .hero-foot
        .tabs.is-fullwidth
          .container.is-family-secondary
            ul
              li
                a(href="http://svgbackgrounds.com")
                  span Original background by SvgBackgrounds.com
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds)
  })
}

@Component
export default class App extends Vue {
  private isLoading = true

  get colorMap() {
    return this.$store.getters.colorMap
  }

  private circleRange: number[] = []
  private circleCount = 24

  async mounted() {
    this.computeCircleCount()
    window.addEventListener('resize', this.handleResize)
    await wait(300)
    this.isLoading = false
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.computeCircleCount()
  }

  computeCircleCount() {
    const cnt = this.$refs.app as HTMLElement
    if (!cnt) return 25
    const height = cnt.clientHeight
    const width = cnt.clientWidth + 150
    const diagDistance = Math.sqrt(height * height + width * width)
    const count = Math.ceil(diagDistance / 100)
    this.circleRange = this.range(0, count)
    this.circleCount = count
  }

  range(lowEnd: number, highEnd: number) {
    const list = []
    for (let i = lowEnd; i <= highEnd; i++) {
      list.push(i)
    }
    return list
  }

}
</script>

<style lang="scss">
@import "~@/sass/_customization";

#app {
  height: 100vh;
  width: 100vw;
  position: relative;

  .app-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .hero.is-transparent {
    background: transparent !important;
  }
}

.navbar-start {
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 0
}

.navbar-end {
  justify-content: flex-start;
  margin-right: auto;
  margin-left: 0;
}

.button:focus:not(.active) {
  outline: none !important;
  box-shadow: none !important;
}
</style>
