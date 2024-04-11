<script>
import { defineComponent, reactive } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import Palette from '@/models/Palette.js'
import { usePaletteStore } from '@/store/palette'

export default defineComponent({
  name: 'PaletteGrid',
  components: { PaletteCard },
  props: {
    isFavorite: {
      type: Boolean,
      required: false,
      default: false
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup({ isFavorite }) {
    const animate = reactive([])
    const store = usePaletteStore()

    function replacePalette(index = -1) {
      if (index < 0) {
        return
      }
      store.addToFavorites(store.paletteList[index]);
      animate[index] = true

      setTimeout(() => {
        store.replacePalette(index, new Palette())
      }, 300)

      setTimeout(() => {
        animate[index] = false
      }, 500)
    }

    function onToggle (index) {
      if (isFavorite) {
        store.removeFromFavorites(index)
      } else {
        replacePalette(index)
      }
    }

    return {
      favorites: store.favoritesList,
      animate,
      onToggle,
      onChangeName: store.changeFavoriteName,
    }
  }
})
</script>

<template>
  <h2>{{ title }}</h2>
  <TransitionGroup name="list" tag="section" class="palette-grid">
    <PaletteCard
      v-for="(item, index) in items"
      class="card"
      :key="item.id"
      :is-favorite="isFavorite"
      :is-editable="isEditable"
      :item="item"
      :class="{ hidden: animate[index] }"
      @changeName="(value) => onChangeName(value, index)"
      @toggle="onToggle(index)" />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: 3rem;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease;
}

.list-leave-active {
  display: none;
}

.palette-grid {
  position: relative;
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
