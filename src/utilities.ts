export function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export function range(lowEnd: number, highEnd: number) {
    const list = []
    for (let i = lowEnd; i <= highEnd; i++) {
        list.push(i)
    }
    return list
}

export function randomColorPalette() {
    const palette = []
    const count = Math.floor((Math.random() * 4) + 2)
    for (let i = 0; i < count; i++) {
        palette.push(randomColor())
    }
    return palette
}

export function wait(seconds: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds)
    })
}
