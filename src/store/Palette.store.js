import { defineStore } from 'pinia'
import Palette from '@/models/Palette.js'
import { useLocalStorage } from '@vueuse/core'

export const usePalleteStore = defineStore('pallete', {
  state: () => ({
    favorites: useLocalStorage('favorites', []),
    palettes: useLocalStorage('palettes', [])
  }),
  getters: {
    allFavorites (state) {
      return state.favorites;
    }
  },
  actions: {
    saveInFavorites (text) {
      this.favorites.push(text)
    },
    updateName (id, newName) {
      const item = this.favorites.find(pallete => pallete.id === id);
      item.setName(newName);
    },
    addPalettes(qty) {
      this.palettes.push(...Array.from({ length: qty }, () => new Palette()))
    },
    removeFromFavorites (id) {
      this.favorites = this.favorites.filter(pallete => pallete.id !== id)
    }
  },
})