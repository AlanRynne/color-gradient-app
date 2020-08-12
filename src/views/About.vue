<template lang='pug'>
  #about.columns
    .column.is-vcentered
      .container.has-text-centered
        p HI!!!
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
}
</script>

<style lang='scss' scoped>
#about {
  width: 100%
}
</style>
