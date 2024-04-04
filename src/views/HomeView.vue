<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import Palette from '@/models/Palette.js'
import { useStorage } from '@vueuse/core'

export default defineComponent({
  name: 'HomeView',
  components: {
    PaletteCard
  },
  setup() {
    const favorites = useStorage('palettes', [])
    const palettes = reactive([])
    const animate = reactive([])

    addPalettes(30)

    function addPalettes(qty) {
      palettes.push(
        ...Array.from(
          { length: qty },
          () => new Palette()
        )
      )
    }

    function addToFavorites(id) {
      const index = palettes.findIndex(obj => obj.id === id);

      favorites.value.push(palettes[index])

      if (index >= 0) {
        animate[index] = true

        setTimeout(() => {
          palettes[index] = new Palette()
        }, 300)

        setTimeout(() => {
          animate[index] = false
        }, 500)
      }
    }

    return {
      addToFavorites,
      palettes,
      animate
    }
  }
})
</script>

<template>
  <h2>Discover palettes</h2>

  <section class="home-view">
    <PaletteCard
      v-for="(item, index) in palettes"
      :key="item.id"
      :item="item"
      class="card"
      :class="{ hidden: animate[index] }"
      @favorites-click="addToFavorites"
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
