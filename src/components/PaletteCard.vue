<script>
import { defineComponent, ref } from 'vue'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'

export default defineComponent({
  name: 'PaletteCard',
  components: {
    IconFavorite,
    IconCopy
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup({ item }) {
    const showCopyFeedback = ref(false)
    const isFavorite = ref(false)

    function copyCss() {
      navigator.clipboard.writeText(
        `background-image: linear-gradient(135deg, ${item.colors.join(', ')})`
      )

      showCopyFeedback.value = true

      setTimeout(() => {
        showCopyFeedback.value = false
      }, 1000)
    }

    function toggleIsFavorite() {
      isFavorite.value = !isFavorite.value
    }

    return {
      copyCss,
      toggleIsFavorite,
      showCopyFeedback,
      isFavorite
    }
  }
})
</script>

<template>
  <figure class="palette-card">
    <button
      class="palette-button"
      :style="{
        backgroundImage: `linear-gradient(135deg, ${item.colors.join(', ')})`
      }"
      @click="toggleIsFavorite"
    >
      <IconFavorite class="icon" :filled="isFavorite" />
    </button>
    <figcaption class="caption">
      <TransitionGroup name="move" tag="div" class="transition-box">
        <span v-if="showCopyFeedback">Copied! 👍</span>
        <span v-else>{{ item.colors.join(' - ') }}</span>
      </TransitionGroup>

      <button @click="copyCss">
        <IconCopy class="icon" />
      </button>
    </figcaption>
  </figure>
</template>

<style lang="scss" scoped>
.move-enter-active,
.move-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateX(0);
}
.move-enter-from,
.move-leave-to {
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(-30px);
}

.palette-card {
  box-shadow: 0.25em 0.25em 2em rgba(0, 0, 0, 0.25);
  border-radius: 0.5em;
  margin: 0;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  .palette-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: none;
    cursor: pointer;
    aspect-ratio: 1;

    &:hover .icon {
      visibility: visible;
    }

    .icon {
      visibility: hidden;
      position: absolute;
      height: 3rem;
      width: 3rem;
      color: white;
    }
  }

  .caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: #fff;
    font-size: 0.875rem;
    line-height: 1rem;
    font-weight: 500;
    padding: 1.5em;
    text-align: center;
    text-transform: uppercase;

    .transition-box {
      position: relative;
      height: 1rem;
      flex: 1;

      & > * {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        white-space: nowrap;
      }
    }
  }
}
</style>
