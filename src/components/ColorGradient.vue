<template lang='pug'>
  #color-gradient
    .buttons.copy-button
      b-button.is-family-secondary.has-text-weight-semibold.has-shadow(type="is-white" size="is-small" icon-left="plus" @click="addColorToPalette" :disabled="palette.length > 4" rounded) Add color
      b-button.is-family-secondary.has-text-weight-semibold.has-shadow(type="is-white" size="is-small" icon-left="random" @click="$emit('randomize')" rounded) Randomize
    transition(name="smooth" mode="out-in")
      .card.has-shadow
        .card-header
          .card-footer-item(v-for="(color, index) in paletteObjects" :key="index")
            b-field(addons)
              p.control
                b-dropdown(:mobile-modal="false" position="is-top-right")
                  button.button.is-rounded.is-small.preview-button(slot="trigger" :style="`--color: ${color.hex}`")
                    b-icon(icon="palette" type="is-white")
                  b-dropdown-item(custom)
                    color-picker(v-model="color.hex" @color:change="onColorChanged($event,index)" :height="180" :width="180")
              b-input(v-model="color.hex" size="is-small" rounded custom-class="is-family-secondary has-text-weight-semibold" )
              p.control(v-if="palette.length > 2")
                b-button(type="is-gray" icon-left="trash" size="is-small" @click="removeColorAt(index)" :disabled="palette.length <= 2" outlined rounded)
        .card-content.is-paddingless.columns.is-mobile.is-gapless.color-container
          .column.is-paddingless.color-box.has-background-white(v-if="colors.length == 0")
          .column.is-paddingless.color-box(v-for="(color,index) in colors" :key="index" :style="`background-color:${color}`")
        .card-footer
          .card-footer-item
            b-tooltip(label="Color count" type="is-black" position="is-left")
              b-numberinput(:min="2" :max="36" v-model="count" size="is-small" type="is-gray" :editable="false" custom-class="is-family-secondary has-text-weight-semibold" rounded controls-rounded)
    .copy-button
      b-dropdown(:mobile-modal="false" position="is-top-right" )
        button.is-family-secondary.has-text-weight-semibold.button.is-white.is-small.is-rounded.has-shadow(slot="trigger" slot-scope="{active}")
          span Copy as...
          b-icon(:icon="active? 'chevron-up' : 'chevron-down'" size="is-small")
        b-dropdown-item.is-family-secondary(
          v-for="(option, index) in copyOptions"
          :key="index" aria-role="listitem"
          v-clipboard:copy="translate(option.name)"
          v-clipboard:success="onCopy"
          v-clipboard:error="onCopyError"
        ) {{option.name}}

</template>

<script lang="ts">
import {Component, Vue, Watch, PropSync} from 'vue-property-decorator'
import interpolate from 'color-interpolate'

//eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import ColorPicker from 'vue-iro-color-picker'

@Component({
  components: {ColorPicker}
})
export default class ColorGradient extends Vue {

  @PropSync('palette') private paletteSync!: string[]

  private count = 8
  private paletteObjects: any[] = []
  private colorMap: any = null

  @Watch('palette', {immediate: false, deep: false})
  onPaletteChanged(oldVal: string[], newVal: string[]) {
    this.updatePaletteObjects()
  }


  randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  addColorToPalette() {
    this.paletteSync.push(this.randomColor())
    this.updatePaletteObjects()
  }

  mounted() {
    this.updatePaletteObjects()
  }

  get colors() {
    const gradient: any[] = []
    if (this.colorMap === null) return gradient
    for (let i = 0; i < this.count; i++) {
      const color = this.colorMap(i / (this.count - 1))
      gradient.push(color)
    }
    return gradient
  }

  updatePaletteObjects() {
    this.colorMap = interpolate(this.paletteSync)
    this.$emit('update:colormap', this.colorMap)
    this.paletteObjects = this.paletteSync.map((color: string) => {
      return {
        hex: color
      }
    })
  }

  onColorChanged(value: any, index: number) {
    this.paletteSync[index] = value.color.hexString
    this.updatePaletteObjects()
  }

  removeColorAt(index: number) {
    this.paletteSync.splice(index, 1)
  }

  private copyOptions = [
    {name: 'CSS'},
    {name: 'SCSS'},
    {name: 'JS'},
    {name: 'JSON'},
  ]

  translate(value: string) {
    return this.colors.join(',')
  }

  onCopy() {
    this.$buefy.notification.open({
      position: 'is-top-right',
      type: 'is-success',
      message: `Succesfully copied gradient`
    })
  }

  onCopyError() {
    this.$buefy.notification.open({
      position: 'is-top-right',
      type: 'is-danger',
      message: `Unable to copy gradient`
    })
  }
}
</script>

<style lang='scss' scoped>
.card {
  border-radius: 10px;
}

.color-box {
  transition: background-color .1s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  &:not(:last-child) {
    margin-right: 2px;
  }
}

.columns {
  margin-bottom: 0 !important;
}

.color-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  transition: width 1s ease;
}

.preview-button {
  background-color: var(--color);
}

.copy-button {
  margin: 1em;
  align-items: center;
  justify-content: center;
}

.has-shadow {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11),
  0 2px 2px rgba(0, 0, 0, 0.11),
  0 4px 4px rgba(0, 0, 0, 0.11),
  0 8px 8px rgba(0, 0, 0, 0.11),
  0 16px 16px rgba(0, 0, 0, 0.11),
  0 32px 32px rgba(0, 0, 0, 0.11);
}
</style>
