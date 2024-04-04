<script>
import { defineComponent } from 'vue'
import { useStorage } from '@vueuse/core'
import PaletteCard from '@/components/PaletteCard.vue'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    const favorites = useStorage('palettes', [])

    function removeFromFavorites (id) {
      const index = favorites.value.findIndex(obj => obj.id === id);

      favorites.value.splice(index, 1)
    }

    return {
      removeFromFavorites,
      favorites
    }
  }
})
</script>

<template>
  <h2>Favorites View</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard
      v-for="item in favorites"
      :key="item.id"
      is-favorite
      is-editable
      :item="item"
      @favorites-click="removeFromFavorites"
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
