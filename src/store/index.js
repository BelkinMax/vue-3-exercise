import { reactive } from 'vue';
import { createGlobalState } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const palettes = reactive([]);
    return { palettes }
  }
)

