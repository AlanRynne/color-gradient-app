<template lang="pug">
  #home(ref="home")
    .container.has-text-centered
      h1.title.is-1.has-text-weight-normal.has-text-white.is-mouse-tracked.has-text-shadow(
        :style="`--shadow-dir:${-position.x*30}px;--position-y:${position.y};transform: rotateX(${position.y * 10}deg) rotateY(${-position.x*30}deg);`"
      ) Color Maps!!
      h2.subtitle.is-5.is-family-secondary Quick and easy list of colors for any application
      color-gradient()
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import ColorGradient from "@/components/ColorGradient.vue"

@Component({
  components: {ColorGradient}
})
export default class Home extends Vue {
  get position() {
    return this.$store.state.mousePosition
  }
}
</script>

<style lang="scss">
#home {
  width: 100%;
  max-width: 100vw !important;
}

.tabs {
  margin-block-end: 1.5em;
}

.navbar-menu {
  background-color: transparent !important;
}
</style>
