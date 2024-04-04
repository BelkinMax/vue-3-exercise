import { computed } from 'vue';
import { useStorage } from '@vueuse/core'

export const useFavorites = () => {
  const favoritesStore = useStorage('favorite-palettes', [], localStorage);
  const favoriteIds = computed(() => favoritesStore.value.map(fav => fav.id));

  const toggle = (item) => {
    const position = favoritesStore.value.findIndex(fav => fav.id === item.id);
    if (position === -1) {
      favoritesStore.value.push(item);
    } else {
      favoritesStore.value.splice(position, 1);
    }
  }

  const updateFavoriteName = (name, id) => {
    const index = favoritesStore.value.findIndex((fav => fav.id === id));
    favoritesStore.value[index].name = name;
  }

  return {
    favorites: favoritesStore,
    favoriteIds,
    toggle,
    updateFavoriteName,
  };
};
