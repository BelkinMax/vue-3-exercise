<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePalettes } from '@/composables/palettes'
import { useFavorites } from '@/composables/favorites'

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const { favoriteIds } = useFavorites();
    const { replacePalette, animate, palettes } = usePalettes();

    return {
      palettes,
      favoriteIds,
      replacePalette,
      animate
    }
  }
})
</script>

<template>
  <h2>Discover Palettes</h2>

  <section class="home-view">
    <PaletteCard
      v-for="(item, index) in palettes"
      :key="item.id"
      :item="item"
      class="card"
      :isFavorite="favoriteIds.includes(item.id)"
      @favorite-click="replacePalette(index)"
      :class="{ hidden: animate[index] }"
    />
  </section>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 3rem;
}

.home-view {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3em;

  .card {
    opacity: 1;
    transition: all 0.3s ease;

    &.hidden {
      opacity: 0;
      transform: translateY(-30px);
    }
  }
}
</style>
