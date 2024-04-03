import randomColor from '@/helpers/randomColor.js'

let counter = 0

function randomColors() {
  return [randomColor(), randomColor()]
}

export default class Palette {
  name = ''
  colors = []

  constructor(colors) {
    this.id = ++counter
    this.colors = colors ? [...colors] : [...randomColors()]
  }

  updateColors(colors) {
    this.colors = [...colors]
  }
}
