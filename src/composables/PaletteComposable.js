import Palette from '@/models/Palette.js'
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

export function usePalette() {
  // state encapsulated and managed by the composable
  const store = useStore()
  const palettes = reactive([])
  const animate = reactive([])
  const favorites = computed(() => store.state.savedPalettes);
  // a composable can update its managed state over time.
  /**
   * Adds new palettes to the array.
   *
   * @param {number} qty - The number of palettes to add.
   * @return {void}
   */
  function addPalettes(qty) {
    palettes.push(...Array.from({ length: qty }, () => new Palette()))
  }

  /**
   * Replaces the palette at the specified index with a new palette.
   *
   * @param {number} index - The index of the palette to replace. Must be a non-negative integer.
   * @return {undefined}
   */
  // eslint-disable-next-line no-unused-vars
  function replacePalette(index = -1) {
    if (index < 0) {
      return
    }

    animate[index] = true

    setTimeout(() => {
      palettes[index] = new Palette()
    }, 300)

    setTimeout(() => {
      animate[index] = false
    }, 500)
  }

  function addPaletteToFavourites(item) {
    store.dispatch('add', item)
  }

  function onPaletteClick(item, index) {
    addPaletteToFavourites(item)
    replacePalette(index)
  }

  function remove(index) {
    store.dispatch('delete', index)
  }

  function edit ({ item, event }) {
    store.dispatch('edit',{
      oldValue: item.name,
      newValue: event.srcElement.value
    })
  }
  // expose managed state as return value
  return {
    addPalettes,
    remove,
    edit,
    palettes,
    onPaletteClick,
    animate,
    favorites
  }
}
