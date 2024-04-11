<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePaletteStore } from '../store/Palette.store'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {

    const paletteStore = usePaletteStore()
    const { favoritePalettes } = storeToRefs(paletteStore)

    function removeFromFavorites (id) {
      paletteStore.removeFromFavorites(id)
    }

    return {
      favoritePalettes,
      removeFromFavorites
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view" :key="favoritePalettes.length">
    <PaletteCard
      v-for="item in favoritePalettes"
      :key="item.id"
      is-editable
      is-favorite
      :item="item"
      @addToFav="removeFromFavorites(item.id)"
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