<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePaletteStore } from '@/store/palette'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    const store = usePaletteStore()

    return {
      favorites: store.favoritesList,
      removeFavorite: store.removeFromFavorites,
      onChangeName: store.changeFavoriteName
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard
      v-for="(item, index) in favorites"
      :key="item.id"
      is-favorite is-editable
      :item="item"
      @changeName="(value) => onChangeName(value, index)"
      @toggleFavorites="removeFavorite(index)" />
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
