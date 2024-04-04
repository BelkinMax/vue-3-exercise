import { reactive, readonly } from 'vue';
import Palette from '@/models/Palette.js';

export default function usePaletteStore () {
  const state = reactive({
    palettes: [],
  });

  function addPalettes(qty) {
    console.log('here')
    if(!state.palettes.length) {
      for (let i = 0; i < qty; i++) {
        state.palettes.push(new Palette());
      }
    }
    console.log(state.palettes)
  }

  function replacePaletteItem(index) {
    setTimeout(() => {
      state.palettes[index] = new Palette()
    }, 300)
  }

  return {
    state: readonly(state),
    addPalettes,
    replacePaletteItem
  }
}
