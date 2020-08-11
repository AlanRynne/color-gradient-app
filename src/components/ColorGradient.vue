<template lang='pug'>
  #color-gradient
    transition(name="smooth" mode="out-in")
      .card.has-shadow
        .card-header
          .card-footer-item
            b-tooltip(label="Start color" type="is-info" position="is-left")
              b-field
                p.control
                  b-dropdown(:mobile-modal="false" position="is-top-right")
                    button.button.is-small.preview-button(slot="trigger" :style="`--color: ${start}`")
                    b-dropdown-item(custom)
                      color-picker(v-model="start" @color:change="onStartColorChanged" :height="180" :width="180")
                b-input(v-model="start" size="is-small")
          .card-footer-item
            b-tooltip(label="End color" type="is-info" position="is-left")
              b-field
                p.control
                  b-dropdown(:mobile-modal="false" position="is-top-right")
                    button.button.is-small.preview-button(slot="trigger" :style="`--color: ${end}`")
                    b-dropdown-item(custom)
                      color-picker(v-model="end" @color:change="onEndColorChanged" :height="180" :width="180")
                b-input(v-model="end" size="is-small")
        .card-content.is-paddingless.columns.is-mobile.is-gapless
          .color-container
            .column.color-box(v-for="(color, index) in colors" :key="index" :style="`background-color:${color}`")
        .card-footer
          .card-footer-item
            b-tooltip(label="Color count" type="is-info")
              b-numberinput(:min="2" :max="12" v-model="count" size="is-small" type="is-info" :editable="false")
    .copy-button
      b-dropdown(:mobile-modal="false" position="is-top-right" )
        button.button.is-white.has-shadow(slot="trigger" slot-scope="{active}")
          span Copy as...
          b-icon(:icon="active? 'chevron-up' : 'chevron-down'" size="is-small")
        b-dropdown-item(
          v-for="(option, index) in copyOptions"
          :key="index" aria-role="listitem"
          v-clipboard:copy="translate(option.name)"
          v-clipboard:success="onCopy"
          v-clipboard:error="onCopyError"
        ) {{option.name}}

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import interpolate from 'color-interpolate'

//eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import ColorPicker from 'vue-iro-color-picker'

@Component({
  components: {ColorPicker}
})
export default class ColorGradient extends Vue {
  private count = 8
  private start = this.randomColor()
  private end = this.randomColor()
  private colorMap: (index: number) => string
      = interpolate([this.start, this.end])

  private startError = null
  private endError = null
  randomColor() {
    return '#'+Math.floor(Math.random() * 16777215).toString(16)
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

  onCopy(e: any) {
    this.$buefy.notification.open({
      position: 'is-top-right',
      type: 'is-success',
      message: `Succesfully copied gradient`
    })
  }

  onCopyError(e: any) {
    this.$buefy.notification.open({
      position: 'is-top-right',
      type: 'is-danger',
      message: `Unable to copy gradient`
    })
  }

  @Watch('start')
  onStartColorChanged(value: any) {
    try {
      this.colorMap = interpolate([this.start, this.end])
      this.$emit('update:colormap', this.colorMap)
      this.start = value.color.hexString
    } catch (err) {
      this.startError = err
    }
  }

  @Watch('end')
  onEndColorChanged(value: any) {
    console.log('end color changed', value)
    try {
      this.colorMap = interpolate([this.start, this.end])
      this.$emit('update:colormap', this.colorMap)
      this.end = value.color.hexString
    } catch (err) {
      this.endError = err
    }
  }

  get colors() {
    const gradient = []
    for (let i = 0; i < this.count; i++) {
      const color = this.colorMap(i / (this.count - 1))
      gradient.push(color)
    }
    return gradient
  }
}
</script>

<style lang='scss' scoped>
.card {
  border-radius: 10px;
}

.color-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #8c67ef;
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
}

.has-shadow {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11),
  0 2px 2px rgba(0,0,0,0.11),
  0 4px 4px rgba(0,0,0,0.11),
  0 8px 8px rgba(0,0,0,0.11),
  0 16px 16px rgba(0,0,0,0.11),
  0 32px 32px rgba(0,0,0,0.11);
}
</style>
