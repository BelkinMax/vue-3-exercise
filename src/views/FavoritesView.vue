<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePalette } from '@/composables/PaletteComposable.js'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    const { favorites, remove, edit } = usePalette()


    return {
      favorites,
      remove,
      edit
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
      :item="item"
      is-editable is-favorite
      @edit="edit"
      @remove="remove(index)"
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
