<script>
import { defineComponent } from 'vue'
import PaletteGrid from '@/components/PaletteGrid.vue'
import Palette from '@/models/Palette.js'
import { usePaletteStore } from '@/store/palette'

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteGrid
  },
  setup() {
    const store = usePaletteStore()

    if (!store.paletteList.length) {
      addPalettes(30)
    }


    /**
     * Adds new palettes to the array.
     *
     * @param {number} qty - The number of palettes to add.
     * @return {void}
     */
    function addPalettes(qty) {
      const palettes = [];
      palettes.push(...Array.from({ length: qty }, () => new Palette()))
      store.setPaletteList(palettes);
    }

    return {
      palettes: store.paletteList
    }
  }
})
</script>

<template>
  <PaletteGrid
    title="Discover Palettes"
    :items="palettes"
  />
</template>
