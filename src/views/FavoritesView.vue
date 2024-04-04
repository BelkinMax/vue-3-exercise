<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { useStorage } from '@vueuse/core'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    const state = useStorage('my-store', { palettes: [], favorites: [] })
    const favorites = reactive(state.value.favorites)

    function removeItem (index) {
      favorites.splice(index, 1)
    }

    function renameItem ({ id: _id, value }) {
      const item = favorites.find(({ id }) => id === _id)
      item.name = value
    }

    return {
      favorites,
      removeItem,
      renameItem
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard v-for="(item, index) in favorites" :key="item.id" is-favorite is-editable :item="item" @toggleFavorites="removeItem(index)" @inputChanged="renameItem" />
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
