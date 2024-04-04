import { useStorage } from '@vueuse/core'
export default function useFavoritesStore () {
    const favorites = useStorage('favorites', []);

    function addFavorite (item) {
        favorites.value.push(item);
    }

    function removeFavorite (item) {
        const idx = favorites.value.findIndex(favorite => favorite.id === item.id);
        favorites.value.splice(idx,1);
    }

    return {
        favorites,
        addFavorite,
        removeFavorite
    }
}
