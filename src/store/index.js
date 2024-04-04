import { createGlobalState, useStorage } from '@vueuse/core'

export const useGlobalState = createGlobalState(
  () => {
    const state = useStorage(
        'v3-exercise', 
        {
            palettes: [],
            favorites: []
        }, 
        undefined, {
            serializer: {
                read: (v) => v ? JSON.parse(v) : null,
                write: (v) => JSON.stringify(v),
            }
        }
    );

    function updatePalettes (data) {
        state.value.palettes = data
    }

    function addFavorite (item) {
        state.value.favorites.push(item)
    }

    
    return {
        state,
        updatePalettes,
        addFavorite
    };
  }
)