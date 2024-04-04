import { reactive, readonly } from 'vue';
import Palette from '@/models/Palette.js';

const globalState = reactive({
  palettes: [],
});

export default function usePaletteStore () {
  function addPalettes(qty) {
    if(!globalState.palettes.length) {
      for (let i = 0; i < qty; i++) {
        globalState.palettes.push(new Palette());
      }
    }
  }

  function replacePaletteItem(index) {
    setTimeout(() => {
      globalState.palettes[index] = new Palette()
    }, 300)
  }

  return {
    state: readonly(globalState),
    addPalettes,
    replacePaletteItem
  }
}
