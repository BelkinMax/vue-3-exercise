import { useStorage } from '@vueuse/core'
import { reactive } from 'vue'

export function useStore () {
  const state = useStorage('my-store', { palettes: [], favorites: [] })
  const palettes = reactive(state.value.palettes)
  const favorites = reactive(state.value.favorites)

  return {
    palettes,
    favorites
  }
}