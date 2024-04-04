import { reactive } from 'vue'
import { useStorage } from '@vueuse/core'

const palettes = reactive([])
const favorites = useStorage('favorites', [])

export function useGradientComposable () {
  
  function addFavorite (item) {
    favorites.value.push(item)
  }

  function removeFavorite (id) {
    favorites.value = favorites.value.filter(item => {
      return id !== item.id;
    });
  }

  function updateItemTitle (id, title) {
    const index = favorites.value.findIndex(item => item.id === id);
    if (index > -1) {
      favorites.value[index].name = title;
    }
  }

  return {
    favorites,
    palettes,
    addFavorite,
    removeFavorite,
    updateItemTitle
  }
}
