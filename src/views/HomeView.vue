<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePaletteStore } from '../store/Palette.store'
import Palette from '@/models/Palette.js'

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const paletteStore = usePaletteStore();
    const palettes = paletteStore.palettes;
    const animate = reactive([])

    if (!palettes.length) paletteStore.addPalettes(30)

    // eslint-disable-next-line no-unused-vars
    function replacePalette(index = -1) {
      if (index < 0) {
        return
      }

      paletteStore.saveInFavorites(palettes[index]);

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
    <PaletteCard
      v-for="(item, index) in palettes"
      :key="item.id"
      :item="item"
      class="card"
      :class="{ hidden: animate[index] }"
      @click="replacePalette(index)"
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