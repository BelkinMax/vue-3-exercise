import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { reactive } from 'vue'

export const usePaletteStore = defineStore('palette', {
  state: () => ({
    palettes: [],
    favorites: useLocalStorage('favorite/palettes', reactive([])),
  }),
  getters: {
    paletteList: (state) => state.palettes,
    favoritesList: (state) => state.favorites
  },
  actions: {
    setPaletteList (list) {
      this.palettes = list
    },
    replacePalette (idx, palette) {
      this.palettes[idx] = palette
    },
    addToFavorites (palette) {
      this.favorites.push(palette);
    },
    removeFromFavorites (idx) {
      this.favorites.splice(idx, 1);
    },
    changeFavoriteName (name, idx) {
      this.favorites[idx].name = name;
    }
  },
})