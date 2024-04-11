<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import PalettesGrid from '@/components/PalettesGrid.vue'
import useFavorites from '@/composables/useFavorites.composable'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard, PalettesGrid },
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

    <PalettesGrid>
      <PaletteCard 
        v-for="(item, index) in favoritePalettes" 
        :key="item.id" 
        :item="item" 
        is-favorite 
        is-editable 
        @toggle-favorite="removePaletteFromFavorites(item)"
        @update-name="updatePaletteName(index, item, $event)"
      />
    </PalettesGrid>
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
</style>
