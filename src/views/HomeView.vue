<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import { usePalette } from '@/composables/PaletteComposable.js'


export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const {palettes, addPalettes, animate, onPaletteClick } = usePalette()
    addPalettes(30)


    return {
      palettes,
      animate,
      onPaletteClick
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
      @click="onPaletteClick(item, index)"
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
