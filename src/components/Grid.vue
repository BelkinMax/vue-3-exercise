<script>
import { defineComponent } from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'

export default defineComponent({
  name: 'ItemsGrid',
  components: {
    PaletteCard
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    itemsClass: {
      type: String,
      required: false,
      default: null
    },
    animate: {
      type: Array,
      required: false,
      default: () => []
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: false
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>

<template>
  <TransitionGroup name="list" tag="section" class="grid-view">
    <PaletteCard
      :class="{ [itemsClass]: itemsClass, hidden: animate[index] }"
      v-for="(item, index) in items"
      :key="item.id" is-favorite is-editable :item="item"
      @buttonClick="() => $emit('buttonClick', index)"
      @inputChanged="(value) => $emit('inputChanged', value)"
      :isEditable="isEditable"
      :isFavorite="isFavorite"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.grid-view {
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
