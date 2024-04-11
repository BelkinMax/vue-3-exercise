<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import Palette from '@/models/Palette.js'
import { useStorage } from '@vueuse/core'
import { useGlobalState } from '../store'

const FAVOURITES_PALETTES_STORAGE_ID = 'favourites_palletes';

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const { palettes } = useGlobalState();
    const animate = reactive([])
    const favouritesPalletes = useStorage(FAVOURITES_PALETTES_STORAGE_ID, []);

    addPalettes(30)

    /**
     * Adds new palettes to the array.
     *
     * @param {number} qty - The number of palettes to add.
     * @return {void}
     */
    function addPalettes(qty) {
      palettes.push(...Array.from({ length: qty }, () => new Palette()))
    }

    /**
     * Replaces the palette at the specified index with a new palette.
     *
     * @param {number} index - The index of the palette to replace. Must be a non-negative integer.
     * @return {undefined}
     */
    // eslint-disable-next-line no-unused-vars
    function replacePalette(index = -1) {
      if (index < 0) {
        return
      }

      animate[index] = true

      setTimeout(() => {
        palettes[index] = new Palette()
      }, 300)

      setTimeout(() => {
        animate[index] = false
      }, 500)
    }

    function addPaleteFavorite (pallete, index) {
      favouritesPalletes.value = [...favouritesPalletes.value, pallete]
      replacePalette(index)
    }

    return {
      palettes,
      animate,
      addPaleteFavorite
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
      :class="{ hidden: animate[index] }"
      @toggle-favorites="() => addPaleteFavorite(item, index)"
    />
  </section>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 3rem;
}

.home-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
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
