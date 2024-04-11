import { useLocalStorage } from '@vueuse/core';
import Palette from '@/models/Palette.js';

export default function useFavorites () {
  const favoritePalettes = useLocalStorage('favorites', []);

  function addPaletteToFavorites (palette) {
    if (!favoritePalettes.value.includes(palette)) {
      favoritePalettes.value.push(palette);
    }
  }

  function removePaletteFromFavorites (palette) {
    const index = favoritePalettes.value.indexOf(palette);
    if (index !== -1) {
      favoritePalettes.value.splice(index, 1);
    }
  }

  function updatePaletteName(index, palette, name) {
    const newPalette = new Palette(palette)
    newPalette.setName(name)
    favoritePalettes.value[index] = newPalette
  }

  return {
    favoritePalettes,
    addPaletteToFavorites,
    removePaletteFromFavorites,
    updatePaletteName
  }
}