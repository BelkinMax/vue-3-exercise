<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import {usePalettesStore} from "@/store/palettes.js";
import {useStore} from "vuex";

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const animate = reactive([]);
    const store = useStore();

    const usePalettes = usePalettesStore();
    const { palettes, addPalettes, removePalette } = usePalettes;

    addPalettes(30);

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
      store.dispatch('addPaletteToFav', palettes[index])

      setTimeout(() => {
        removePalette(index)
      }, 300)

      setTimeout(() => {
        animate[index] = false
      }, 500)
    }

    return {
      palettes,
      animate,
      replacePalette
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
      @toggleFavorites="replacePalette(index)"
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
