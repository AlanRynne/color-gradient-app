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
                    button.button.is-small.preview-button(slot="trigger" :style="`--color: ${startSync}`")
                    b-dropdown-item(custom)
                      color-picker(v-model="startSync" @color:change="onStartColorChanged" :height="180" :width="180")
                b-input(v-model="startSync" size="is-small")
          .card-footer-item
            b-button.is-family-secondary(type="is-text" size="is-small" @click="$emit('randomize')") Randomize
          .card-footer-item
            b-tooltip(label="End color" type="is-info" position="is-left")
              b-field
                p.control
                  b-dropdown(:mobile-modal="false" position="is-top-right")
                    button.button.is-small.preview-button(slot="trigger" :style="`--color: ${endSync}`")
                    b-dropdown-item(custom)
                      color-picker(v-model="endSync" @color:change="onEndColorChanged" :height="180" :width="180")
                b-input(v-model="endSync" size="is-small")
        .card-content.is-paddingless.columns.is-mobile.is-gapless.color-container
            .column.is-paddingless.color-box.has-background-white(v-if="colors.length == 0")
            .column.is-paddingless.color-box(v-for="color in colors" :key="color" :style="`background-color:${color}`")
        .card-footer
          .card-footer-item
            b-tooltip(label="Color count" type="is-info")
              b-numberinput(:min="2" :max="36" v-model="count" size="is-small" type="is-info" :editable="false")
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
import {Component, Vue, Watch, PropSync} from 'vue-property-decorator'
import interpolate from 'color-interpolate'

//eslint-disable-next-line @typescript-eslint/ban-ts-ignore
//@ts-ignore
import ColorPicker from 'vue-iro-color-picker'

@Component({
  components: {ColorPicker}
})
export default class ColorGradient extends Vue {

  private count = 8
  @PropSync('start') private startSync!: string
  @PropSync('end') private endSync!: string

  private colorMap: any = null
  private startError = null
  private endError = null

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

  @Watch('start')
  onStartColorChanged(value: any) {
    try {
      this.colorMap = interpolate([this.startSync, this.endSync])
      this.$emit('update:colormap', this.colorMap)
      this.startSync = value.color.hexString
    } catch (err) {
      this.startError = err
    }
  }

  @Watch('end')
  onEndColorChanged(value: any) {
    try {
      this.colorMap = interpolate([this.startSync, this.endSync])
      this.$emit('update:colormap', this.colorMap)
      this.endSync = value.color.hexString
    } catch (err) {
      this.endError = err
    }
  }

  get colors() {
    const gradient: any[] = []
    if(this.colorMap === null) return gradient;
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

  &:not(:last-child){
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
