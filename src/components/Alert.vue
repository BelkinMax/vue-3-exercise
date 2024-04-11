<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'TheAlert',
  emits: ['ok', 'cancel'],
  setup(props, { emit }) {
    function emitCancel () {
      emit('cancel');
    }

    function emitOk () {
      emit('ok');
    }

    return {
      emitOk,
      emitCancel
    }
  }
})
</script>

<template>
  <article class="the-alert">
    <p class="text">Sure?</p>
    <div class="cta">
      <button
        class="button"
        data-cy="alert-button-ok"
        @click="emitOk"
      >
        Ok
      </button>
      <button
        class="button"
        data-cy="alert-button-cancel"
        @click="emitCancel"
      >
        Cancel
      </button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.the-alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #F5E8DD;

  .text,
  .cta .button {
    font-size: 1.5rem;
  }

  .cta {
    display: flex;
    gap: 1rem;

    .button {
      color: black;
      background-color: transparent;
      border: 2px solid black;
      padding: 0.3rem 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
    }
  }
}
</style>
