<script>
import { defineComponent } from 'vue'
import PaletteGrid from '@/components/PaletteGrid.vue'
import { usePaletteStore } from '@/store/palette'

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteGrid },
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
  <PaletteGrid
    title="My Favorites"
    :is-favorite="true"
    :is-editable="true"
    :items="favorites" />
</template>
