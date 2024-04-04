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

    function removeFavorite (item) {
        const newFavorites = state.value.favorites.filter((fav) => fav.id != item.id);
        state.value.favorites = newFavorites
    }

    
    return {
        state,
        updatePalettes,
        addFavorite,
        removeFavorite
    };
  }
)