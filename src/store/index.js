import { reactive } from 'vue';

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

    }
  }
});

export default store;
