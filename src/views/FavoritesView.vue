<script>
import { defineComponent } from 'vue'
import { useStore } from '@/composables/useStore.composable.js'
import Grid from '@/components/Grid.vue'

export default defineComponent({
  name: 'FavoritesView',
  components: { Grid },
  setup() {
    const { favorites } = useStore();

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
  <section class="favorites-view">
    <Grid
      class="favorites-view__grid"
      :items="favorites"
      @buttonClick="removeItem"
      @inputChanged="renameItem"
      is-favorite
      is-editable
    />
  </section>
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
