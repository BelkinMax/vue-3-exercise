<script>
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePalleteStore } from '../store/Palette.store'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    
    const palleteStore = usePalleteStore()
    const { allFavorites } = storeToRefs(palleteStore)

    function removeFromFavorite (id) {
      palleteStore.removeFromFavorites(id)
    }

    return {
      allFavorites,
      removeFromFavorite
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view" :key="allFavorites.length">
    <PaletteCard v-for="item in allFavorites" :key="item.id" is-favorite is-editable :item="item" @toggleFavorites="removeFromFavorite(item.id)" />
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
