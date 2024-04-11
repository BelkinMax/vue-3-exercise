<script>
import { defineComponent, ref } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import ModalConfirm from '@/components/ModalConfirm.vue'
import store from '@/store/'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard, ModalConfirm },
  setup() {
    const modalIndex = ref(null);
    const favorites = store.getters.getFavorites();

    function modalConfirmed (index) {
      store.mutations.deleteFavorite(index)
    }
  
    function modalClosed () {
      modalIndex.value = null;
    }

    function showModal (index) {
      modalIndex.value = index;
    }

    return {
      modalIndex,
      showModal,
      modalClosed,
      modalConfirmed,
      favorites,
      store
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <ModalConfirm
    v-if="modalIndex !== null"
    @close="modalClosed"
    @confirm="modalConfirmed"
    :index="modalIndex"
  />

  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard
      v-for="(item, index) in favorites"
      :key="item.id"
      is-favorite
      is-editable
      :item="item"
      :index="index"
      @paletteClick="showModal(index)"
      @paletteTitleChange="(title) => store.mutations.updatePaletteFavoriteName(index, item, title)"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease;
}

.list-leave-active {
  display: none;
}

h2 {
  margin-bottom: 3rem;
}

.favorites-view {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 3em;
}
</style>
