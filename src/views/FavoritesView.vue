<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { useStorage } from '@vueuse/core'

const FAVOURITES_PALETTES_STORAGE_ID = 'favourites_palletes';

export default defineComponent({
  name: 'FavoritesView',
  components: { PaletteCard },
  setup() {
    let favorites = useStorage(FAVOURITES_PALETTES_STORAGE_ID, []);

    function removePaletteFavourites (palette) {
      favorites.value = favorites.value.filter((pal) => pal.id !== palette.id)
    }

    function updatePalette (palette, index) {
      favorites.value.splice(index, 1, palette);
    }

    return {
      favorites,
      removePaletteFavourites,
      updatePalette
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>

  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard 
      @toggle-favorites="() => removePaletteFavourites(item)"
      @name-edited="(pallete) => updatePalette(pallete, index)"
      v-for="item in favorites"
      :key="item.id"
      is-favorite
      is-editable
      :item="item"
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
