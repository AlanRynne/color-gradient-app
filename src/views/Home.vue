<template lang="pug">
  #home(ref="home" @mousemove="onMouseMove")
    b-loading.custom-loading(:active="false")
    .hero.is-primary.is-fullheight
      .hero-bg
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
      .hero-head.is-family-secondary
        b-navbar(wrapper-class="container" :mobile-burger="false" spaced)
          template(slot="start" class="start")
            b-navbar-item(tag="p") Quick color gradients
          template(slot="end" class="end")
            b-navbar-item(tag="p")
              span.has-text-weight-semibold
                | Created by
                |
                |
                a.has-text-weight-medium.has-text-white(href="http://github.com/AlanRynne") Alan Rynne
      .hero-body.columns
        .column.is-vcentered
          .container.has-text-centered
            h1.title.is-1.has-text-weight-normal.has-text-white.is-mouse-tracked.has-text-shadow(:style="`--shadow-dir:${-positionX*30}px;--position-y:${positionY};transform: rotateX(${positionY * 10}deg) rotateY(${-positionX*30}deg);`") Color Gradients!!
            color-gradient(@update:colormap="onColorMapUpdated" :start.sync="start" :end.sync="end")
      .hero-foot
        nav.tabs.is-fullwidth.has-background-white
          .container.is-family-secondary
            ul
              li
                a(href="http://svgbackgrounds.com")
                  span Original background by SvgBackgrounds.com
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ColorGradient from "@/components/ColorGradient.vue"
import interpolate from "color-interpolate"

function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds)
  })
}

@Component({
  components: {ColorGradient}
})
export default class Home extends Vue {

  private circleCount = 24
  private positionX = 0.5
  private positionY = 0
  private container: HTMLElement | null = null
  private circleRange: number[] = []
  private isLoading = true
  private start = this.randomColor()
  private end = this.randomColor()
  private colorMap = interpolate([this.start,this.end])

  async mounted() {
    this.container = this.$refs.home as HTMLElement
    this.ComputeCircleCount()
    window.addEventListener('resize', this.handleResize)
    await wait(300)
    this.isLoading = false
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }

  ComputeCircleCount() {
    const cnt = this.container
    if (!cnt) return 25
    const height = cnt.clientHeight
    const width = cnt.clientWidth + 150
    const diagDistance = Math.sqrt(height * height + width * width)
    const count = Math.ceil(diagDistance / 100)
    this.circleRange = this.range(0, count)
    this.circleCount = count
  }

  onColorMapUpdated(colorMap: any) {
    this.colorMap = colorMap
  }

  range(lowEnd: number, highEnd: number) {
    const list = []
    for (let i = lowEnd; i <= highEnd; i++) {
      list.push(i)
    }
    return list
  }

  onMouseMove(e: MouseEvent) {
    this.positionX = (e.clientX / window.innerWidth) - 0.5
    this.positionY = (e.clientY / window.innerHeight)
  }

  handleResize() {
    this.ComputeCircleCount()
  }

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

}
</script>

<style lang="scss">

#i-like-food {
  fill: white
}

.crazy-bg {
  background-color: #8c67ef;
  background-image: url(~@/assets/i-like-food.svg);
}

.crazy-bg-2 {
  background-color: #191b36;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000000' stroke-width='66.7' stroke-opacity='0.05' %3E%3Ccircle fill='%23191b36' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23192646' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23143256' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23023e66' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23004b76' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23005884' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23006692' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%2300749d' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%230082a7' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%230090af' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%23009fb4' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%2300adb8' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2300bbb9' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2300c9b8' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%2300d7b4' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%2300e5b0' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%232ef2a9' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%2363ffa2' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

.hero {
  position: relative;

  .hero-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}

.has-text-shadow {
  text-shadow: var(--shadow-dir) 1px 1px rgba(0, 0, 0, 0.11),
  var(--shadow-dir) 2px 2px rgba(0, 0, 0, 0.11),
  var(--shadow-dir) 4px 4px rgba(0, 0, 0, 0.11),
  var(--shadow-dir) 8px 8px rgba(0, 0, 0, 0.11),
  var(--shadow-dir) 16px 16px rgba(0, 0, 0, 0.11),
  var(--shadow-dir) 32px 32px rgba(0, 0, 0, 0.11);
}

.tabs {
  margin-block-end: 1.5em;
}

.navbar-menu {
  background-color: transparent !important;
}

.loading-overlay.custom-loading {
  .loading-background {
    background-color: #ff9d00;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg stroke='%23000' stroke-width='66.7' stroke-opacity='0.11' %3E%3Ccircle fill='%23ff9d00' cx='0' cy='0' r='1800'/%3E%3Ccircle fill='%23f27d00' cx='0' cy='0' r='1700'/%3E%3Ccircle fill='%23e55f00' cx='0' cy='0' r='1600'/%3E%3Ccircle fill='%23d84400' cx='0' cy='0' r='1500'/%3E%3Ccircle fill='%23cb2c00' cx='0' cy='0' r='1400'/%3E%3Ccircle fill='%23bf1600' cx='0' cy='0' r='1300'/%3E%3Ccircle fill='%23b20300' cx='0' cy='0' r='1200'/%3E%3Ccircle fill='%23a5000e' cx='0' cy='0' r='1100'/%3E%3Ccircle fill='%2398001c' cx='0' cy='0' r='1000'/%3E%3Ccircle fill='%238b0027' cx='0' cy='0' r='900'/%3E%3Ccircle fill='%237e0030' cx='0' cy='0' r='800'/%3E%3Ccircle fill='%23710037' cx='0' cy='0' r='700'/%3E%3Ccircle fill='%2364003b' cx='0' cy='0' r='600'/%3E%3Ccircle fill='%2358003c' cx='0' cy='0' r='500'/%3E%3Ccircle fill='%234b003a' cx='0' cy='0' r='400'/%3E%3Ccircle fill='%233e0037' cx='0' cy='0' r='300'/%3E%3Ccircle fill='%23310030' cx='0' cy='0' r='200'/%3E%3Ccircle fill='%23210024' cx='0' cy='0' r='100'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
}

circle {
  transition: all .2s !important;
}
</style>
