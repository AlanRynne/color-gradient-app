<template lang="pug">
  #home.columns(ref="home")
    .column.is-vcentered
      .container.has-text-centered
        h1.title.is-1.has-text-weight-normal.has-text-white.is-mouse-tracked.has-text-shadow(
          :style="`--shadow-dir:${-positionX*30}px;--position-y:${positionY};transform: rotateX(${positionY * 10}deg) rotateY(${-positionX*30}deg);`"
        ) Color Gradients!!
        color-gradient(
          @update:colormap="onColorMapUpdated"
          @randomize="randomizeColors"
          :palette="palette")
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ColorGradient from "@/components/ColorGradient.vue"
import interpolate from "color-interpolate"


@Component({
  components: {ColorGradient}
})
export default class Home extends Vue {
  private positionX = 0.5
  private positionY = 0
  private palette = [this.randomColor(), this.randomColor()]
  private colorMap = interpolate(this.palette)

  async mounted() {
    window.addEventListener('mousemove', this.onMouseMove)
  }

  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  onColorMapUpdated(colorMap: any) {
    this.colorMap = colorMap
    this.$emit('colormap', colorMap)
  }

  range(lowEnd: number, highEnd: number) {
    const list = []
    for (let i = lowEnd; i <= highEnd; i++) {
      list.push(i)
    }
    return list
  }

  onMouseMove(e: MouseEvent) {
    this.positionX = (e.pageX / window.innerWidth) - 0.5
    this.positionY = (e.pageY / window.innerHeight)
  }

  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  randomizeColors() {
    const temp = []
    const count = Math.floor((Math.random() * 4) + 2);
    for (let i = 0; i < count; i++) {
      temp.push(this.randomColor())
    }
    this.palette = temp
  }
}
</script>

<style lang="scss">
#home {
  width: 100%
}

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

circle {
  transition: all .2s !important;
}
</style>
