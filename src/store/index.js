import { reactive } from 'vue';
import Palette from '@/models/Palette.js'

function _localStoragePersistence (favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

const store = ({
  state: reactive({
    palettes: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),
  getters: {
    getPalettes () {
      return store.state.palettes;
    },
    getFavorites () {
      return store.state.favorites;
    }
  },
  mutations: {
    addFavorite (palette) {
      store.state.favorites.push(palette);
      _localStoragePersistence(store.state.favorites);
    },
    deleteFavorite (paletteIndex) {
      store.state.favorites.splice(paletteIndex, 1);
      _localStoragePersistence(store.state.favorites);
    },
    updateFavorites (favorites) {
      store.state.favorites = favorites;
      _localStoragePersistence(store.state.favorites);
    },
    updatePaletteFavoriteName (index, item, title) {
      const palette = new Palette(item);
      const favorites= store.getters.getFavorites();

      palette.setName(title);
      favorites[index] = palette;

      store.mutations.updateFavorites(favorites);
    }
  }
});

export default store;
