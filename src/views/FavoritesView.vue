<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import useFavorites from '@/composables/useFavorites.composable'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    const { favoritePalettes, removePaletteFromFavorites, updatePaletteName } = useFavorites()

    return {
      favoritePalettes,
      removePaletteFromFavorites,
      updatePaletteName
    }
  }
})
</script>

<template>
  <main>
    <h2>My Favorites</h2>

    <TransitionGroup name="list" tag="section" class="favorites-view">
      <PaletteCard 
        v-for="(item, index) in favoritePalettes" 
        :key="item.id" 
        :item="item" 
        is-favorite 
        is-editable 
        @toggle-favorite="removePaletteFromFavorites(item)"
        @update-name="updatePaletteName(index, item, $event)"
      />
    </TransitionGroup>
  </main>
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
