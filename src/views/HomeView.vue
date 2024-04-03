<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import Palette from '@/models/Palette.js'

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const palettes = reactive([])

    addPalettes(24)

    function addPalettes(qty = 12) {
      palettes.push(
        ...Array.from({ length: qty }, () => new Palette())
      )
    }

    return {
      palettes
    }
  }
})
</script>

<template>
  <section class="home-view">
    <PaletteCard v-for="item in palettes" :key="item.id" :item="item" />
  </section>
</template>

<style lang="scss" scoped>
.home-view {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 3em;
}
</style>
