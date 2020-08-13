import Vue from 'vue'
import Vuex from 'vuex'
import {randomColor, randomColorPalette} from "@/utilities"
import interpolate from "color-interpolate"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        palette: [randomColor(), randomColor()],
        mousePosition: {
            x: 0,
            y: 0
        }
    },
    getters: {
        colorMap: state => interpolate(state.palette)
    },
    mutations: {
        updatePalette(state, palette) {
            state.palette = palette
        },
        updatePaletteColor(state, {index, color}) {
            const temp = [...state.palette]
            temp[index] = color
            state.palette = [...temp]
        },
        randomizePalette(state) {
            state.palette = randomColorPalette()
        },
        updateMousePosition(state, pos){
            state.mousePosition = pos
        }
    },
    actions: {},
    modules: {}
})
