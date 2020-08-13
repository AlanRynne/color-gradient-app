<template lang='pug'>
  #about.columns
    .column.is-vcentered
      .container.has-text-centered
        .content
          .subtitle.is-size-6.is-family-secondary This site was created by...
          h1.title.is-1.has-text-weight-normal.has-text-white.is-mouse-tracked.has-text-shadow(
            :style="`--shadow-dir:${-position.x*30}px;--position-y:${position.y};transform: rotateX(${position.y * 10}deg) rotateY(${-position.x*30}deg);`"
          ) Alan Rynne
          h2.subtitle.is-family-secondary
            p.is-size-5 a...
            p.is-size-5.is-italic.has-text-weight-medium  Building Engineer
            p.is-size-5.is-italic.has-text-weight-medium  Computational Designer
            p.is-size-5.is-italic.has-text-weight-medium  Full stack developer
            p.is-size-5.is-italic.has-text-weight-medium  Overall tech geek!
          p.is-size-3.has-text-shadow(:style="{'--shadow-dir': '0px'}") Find me on:
          p.buttons.is-centered.is-family-secondary
            b-button(icon-left="github" icon-pack="fab" outlined type="is-white" rounded tag="a" href="http://github.com/AlanRynne" )
            b-button(icon-left="linkedin" icon-pack="fab" outlined type="is-white" rounded tag="a" href="http://linkedin.com/in/AlanRynneVidal" )
            b-button(icon-left="twitter" icon-pack="fab" outlined type="is-white" rounded tag="a" href="http://twitter.com/AlanRynne" )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class About extends Vue {
  get position() {
    return this.$store.state.mousePosition
  }
}
</script>

<style lang='scss' scoped>
#about {
  width: 100%
}
</style>
