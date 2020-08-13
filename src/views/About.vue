<template lang='pug'>
  #about.columns
    .column.is-vcentered
      .container.has-text-centered
        p SXXX
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  private showLogo = true
}
</script>

<style lang='scss' scoped>
#about {
  width: 100%
}
</style>
