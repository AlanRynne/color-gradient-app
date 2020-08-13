<template lang="pug">
  #app(ref="app")
    .app-bg(v-if="colorMap")
      svg(xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' :style="colorMap ? `background-color:${colorMap(0)}`: ''")
        g(stroke='#000' :stroke-width='strokeWidth' stroke-opacity='0.07')
          circle(
            v-for="i in count"
            :key="i"
            :fill="colorMap ? colorMap(1-(i/(count-1))): '#ffffff'"
            :cx='-400 +Math.sin(time) * 50 * (i%2 == 0 ? 1: -1)'
            :cy='-400 +Math.cos(time) * 50 * (i%2 == 0 ? 1: -1)'
            :r='((count+2) * 100)-(i+1)*100'
          )
    .change-progress.container
      b-progress(:value="progress" type="is-white" size="is-small" :style="{'--anime-delay':'0s', '--anime-duration':'0s' }")
      b-icon.pause-button.has-text-white(:icon="changeActive ? 'pause-circle': 'play-circle'" size="is-small" type="is-text" @click.native="toggleTimer")
    .hero.is-primary.is-transparent.is-fullheight
      .hero-head.is-family-secondary
        b-navbar(wrapper-class="container" :mobile-burger="false" transparent)
          template(slot="start" class="start")
            b-navbar-item(tag="router-link" :to="{name: 'Home'}") Color map creator
          template(slot="end" class="end")
            b-navbar-item(tag="router-link" :to="{name: 'About'}") About the author
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
import {Component, Ref, Vue} from 'vue-property-decorator'
import {wait} from "@/utilities"

@Component
export default class App extends Vue {
  private isLoading = true
  private changeActive = false
  private progress = 0
  private time = 0
  private size = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  private strokeWidth = 66.7

  get colorMap() {
    return this.$store.getters.colorMap
  }

  toggleTimer() {
    this.changeActive = !this.changeActive
    if (this.changeActive) {
      this.$buefy.snackbar.open({
        message: 'Starting auto generate',
        queue: false
      })
    } else {
      this.$buefy.snackbar.open({
        message: 'Stopped auto generate',
        queue: false,
        type: "is-danger"
      })
    }
  }

  async animateBackground() {
    const loopDuration = 5000
    const step = 10
    await wait(step)
    this.time += step / loopDuration
    this.animateBackground()
    this.strokeWidth = 66.7 + Math.sin(this.time) * 20
  }

  async runTimer() {
    if (this.changeActive) {
      if (this.progress == 100) {
        await wait(300)
        this.progress = 0
        this.$store.commit('randomizePalette')
        await wait(1000)
      } else {
        this.progress += 2
        await wait(100)
      }
    } else {
      await wait(500)
    }
    this.runTimer()
  }

  get count() {
    const height = this.size.height+400
    const width = this.size.width + 400
    const diagDistance = Math.sqrt(height * height + width * width)
    const count = Math.ceil(diagDistance / 100)
    return count
  }

  mounted() {
    this.animateBackground()
    if (this.changeActive) {
      this.runTimer()
    }
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('mousemove', this.onMouseMove)
    wait(300).then(() => {
      this.isLoading = false
    })
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('mousemove', this.onMouseMove)
  }

  handleResize() {
    this.size = {
      width: this.$el.clientWidth,
      height: this.$el.clientHeight
    }
  }

  onMouseMove(e: MouseEvent) {
    this.$store.commit('updateMousePosition', {
      x: (e.pageX / window.innerWidth) - 0.5,
      y: (e.pageY / window.innerHeight)
    })
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

    circle {
      transition: fill 1s;
    }
  }

  .hero.is-transparent {
    background: transparent !important;
  }
}

.change-progress {
  position: absolute;
  display: flex;
  right: 0;
  bottom: 0;
  z-index: 100;
  width: 15rem;
  margin: 0.75rem;
  align-items: center;
  justify-content: center;

  .progress-wrapper {
    flex-basis: 100% !important;
    margin-bottom: 0 !important;
    margin-right: 1rem !important;

    progress.progress {
      height: 0.4rem;
    }
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

.has-text-shadow {
  $shadow: 0px;
  @if (var(--shadow-dir)) {
    $shadow: var(--shadow-dir)
  }
  text-shadow: $shadow 1px 1px rgba(0, 0, 0, 0.11),
  $shadow 2px 2px rgba(0, 0, 0, 0.11),
  $shadow 4px 4px rgba(0, 0, 0, 0.11),
  $shadow 8px 8px rgba(0, 0, 0, 0.11),
  $shadow 16px 16px rgba(0, 0, 0, 0.11),
  $shadow 32px 32px rgba(0, 0, 0, 0.11);
}

.navbar.is-dark .navbar-end > a.navbar-item:hover {
  background-color: rgba(black, 0.5);
}

.navbar.is-dark .navbar-end > a.navbar-item:focus {
  background-color: rgba(black, 0.5);
}

.router-link-exact-active {
  font-weight: bold !important;
  color: white !important;
  transition: color 1s;
}

.pause-button {
  &:hover {
    transform: scale(1.1);
    transform-origin: center;
    transition: transform .3s;
  }
}
</style>
