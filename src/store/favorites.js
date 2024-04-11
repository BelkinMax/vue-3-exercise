import {createStore} from "vuex";
import {useStorage} from "@vueuse/core";

const store = createStore({
    state: {
        favorites: useStorage('favorites', [])
    },
    mutations: {
        addPaletteToFav(state, palette) {
            state.favorites.push(palette);
        },
        removePaletteToFav(state, id) {
            state.favorites = state.favorites.filter((value) => value.id !== id);
        },
        updateTitlePaletteToFav(state, { id, title }) {
            const favorite = state.favorites.find((value) => value.id === id);
            favorite.setName(title)
        }
    },
    actions: {
        addPaletteToFav({ commit }, value) {
            commit('addPaletteToFav', value);
        },
        removePaletteToFav({ commit }, value) {
            commit('removePaletteToFav', value);
        },
        updateTitlePaletteToFav({ commit }, value) {
            commit('updateTitlePaletteToFav', value);
        }
    }
});

export default store;