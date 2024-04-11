<script>
import { defineComponent, reactive } from 'vue'
import Palette from '@/models/Palette.js'
import { useStore } from '@/composables/useStore.composable.js'
import Grid from '@/components/Grid.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    Grid
  },
  setup() {
    const {palettes, favorites} = useStore();
    const animate = reactive([])

    if (!palettes.length) {
      addPalettes(30)
    }


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

      favorites.push(palettes[index])

      animate[index] = true

      setTimeout(() => {
        palettes[index] = new Palette()
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
    <Grid
      class="home-view__grid"
      :items="palettes"
      itemsClass="card"
      :animate="animate"
      @buttonClick="replacePalette"
    />
  </section>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 3rem;
}
</style>
