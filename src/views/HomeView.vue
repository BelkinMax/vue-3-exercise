<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import Palette from '@/models/Palette.js'
import useFavoritesStore from "@/composables/favoritesStore.composable.js";
import useGradientsStore from "@/composables/gradientsStore.composable.js"

export default defineComponent({
  name: 'HomeView',
  setup() {
    const { addFavorite } = useFavoritesStore();
    const { gradients, replaceGradient } = useGradientsStore();
    const palettes = reactive([])
    const animate = reactive([])

    addPalettes(30)

    /**
     * Adds new palettes to the array.
     *
     * @param {number} qty - The number of palettes to add.
     * @return {void}
     */
    function addPalettes() {
      palettes.push();
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
        replaceGradient(index, new Palette());
      }, 300)

      setTimeout(() => {
        animate[index] = false
      }, 500)
    }

    function addGradient (index) {
      addFavorite(gradients.value[index]);
      replacePalette(index);
    }

    return {
      palettes,
      gradients,
      animate,
      addGradient
    }
  },
  components: {
    PaletteCard
  }
})
</script>

<template>
  <h2>Discover Palettes</h2>

  <section class="home-view">
    <PaletteCard
      v-for="(item, index) in gradients"
      :key="item.id"
      :item="item"
      class="card"
      :class="{ hidden: animate[index] }"
      @addGradientToFav="addGradient(index)"
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
