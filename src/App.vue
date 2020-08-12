<template lang="pug">
  #app
    router-view
</template>

<style lang="scss">
@import "~@/sass/_customization";

#app {
  height: 100vh;
  width: 100vw;
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
