import { defineStore } from 'pinia'
import Palette from '@/models/Palette.js'
import { useLocalStorage } from '@vueuse/core'

export const usePaletteStore = defineStore('pallete', {
  state: () => ({
    palettes: useLocalStorage('palettes', []),
    favorites: useLocalStorage('favorites', [])
  }),
  actions: {
    addPalettes(qty) {
      this.palettes.push(...Array.from({ length: qty }, () => new Palette()));
    },
    saveInFavorites (text) {
      this.favorites.push(text);
    },
    removeFromFavorites (id) {
      this.favorites = this.favorites.filter(pallete => pallete.id !== id);
    },
    changeName (id, newName) {
      const item = this.favorites.find(pallete => pallete.id === id);
      item.setName(newName);
    }
  },
  getters: {
    favoritePalettes (state) {
      return state.favorites;
    }
  },
})