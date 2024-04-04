import randomColor from '@/helpers/randomColor.js'

let counter = 0

function randomColors() {
  return [randomColor(), randomColor()]
}

export default class Palette {
  constructor({ colors, name, id } = {}) {
    this.id = id || ++counter
    this.setColors(colors ? [...colors] : [...randomColors()])
    this.setName(name)
  }

  setColors(colors) {
    this.colors = [...colors].slice(0, 2)
  }

  setName(name) {
    this.name = name || this.colors.join(' - ')
  }
}
