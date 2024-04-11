<script>
import { defineComponent, ref } from 'vue'
import { copyColors } from '@/helpers/clipboard.js'
import IconCopy from '@/components/icons/IconCopy.vue'
import IconFavorite from '@/components/icons/IconFavorite.vue'
import { usePaletteStore } from '../store/Palette.store'

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
    },
    isFavorite: {
      type: Boolean,
      required: false,
      default: false
    },
    isEditable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ['addToFav'],
  setup({ item }, { emit }) {
    const showCopyFeedback = ref(false);
    const title = item.name;

    const paletteStore = usePaletteStore();

    function changeName (event) {
      paletteStore.changeName(item.id, event.target.value);
    }

    function copyCss() {
      copyColors(item.colors)

      showCopyFeedback.value = true

      setTimeout(() => {
        showCopyFeedback.value = false
      }, 1000);
    }

    return {
      copyCss,
      toggleFavorites: () => emit('addToFav'),
      title,
      showCopyFeedback,
      changeName
    }
  }
})
</script>

<template>
  <figure class="palette-card" data-cy="card">
    <button
      class="palette-button"
      data-cy="card-favorites-button"
      :style="{
        backgroundImage: `linear-gradient(135deg, ${item.colors.join(', ')})`
      }"
      @click="toggleFavorites"
    >
      <IconFavorite class="icon" :filled="isFavorite" />
    </button>
    <figcaption class="caption">
      <TransitionGroup name="move" tag="div" class="transition-box">
        <span v-if="showCopyFeedback" data-cy="card-copied">Copied! 👍</span>
        <input
          v-else
          :disabled="!isEditable"
          type="text"
          data-cy="card-title"
          v-model="title"
          :value="title"
          @keyup.enter="changeName" />
      </TransitionGroup>

      <button data-cy="card-copy-button" @click="copyCss">
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
  transform: translateY(-1rem);
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
    font-size: 0.75rem;
    line-height: 1;
    font-weight: 500;
    padding: 1.5em;
    text-align: center;
    text-transform: uppercase;

    .transition-box {
      position: relative;
      height: 2rem;
      flex: 1;

      & > * {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        white-space: nowrap;
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      input {
        padding: 0;
        border: none;
        outline: none;

        &:disabled {
          background-color: transparent;
          cursor: text;
        }

        &:focus,
        &:focus-visible {
          padding: 3px 5px;
          border: none;
          outline: 1px solid var(--color-border-hover);
        }
      }
    }
  }
}
</style>