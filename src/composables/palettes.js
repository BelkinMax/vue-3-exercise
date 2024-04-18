import { reactive } from 'vue'
import Palette from '@/models/Palette.js'

const generatePalettes = (qty) => {
  return Array.from({ length: qty }, () => new Palette());
};

const startPalettes = generatePalettes(30);

export const usePalettes = () => {
  const animate = reactive([]);
  const palettes = reactive(startPalettes);

  const replacePalette = (index = -1) => {
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

  return {
    palettes,
    replacePalette,
    animate
  };
};
