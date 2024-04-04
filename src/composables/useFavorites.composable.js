import { useLocalStorage } from '@vueuse/core';

export default function useFavorites () {
  const favoritePalettes = useLocalStorage('favorites', []);

  function addPaletteToFavorites (color) {
    if (!favoritePalettes.value.includes(color)) {
      favoritePalettes.value.push(color);
    }
  }

  function removePaletteFromFavorites (color) {
    const index = favoritePalettes.value.indexOf(color);
    if (index !== -1) {
      favoritePalettes.value.splice(index, 1);
    }
  }

  return {
    favoritePalettes,
    addPaletteToFavorites,
    removePaletteFromFavorites
   };
}
