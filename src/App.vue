<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">

@import "~@/sass/_customization";

#app {

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
</style>
