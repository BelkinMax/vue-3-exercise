<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalConfirm',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['confirm', 'close'],
  setup(props, ctx) {
    function confirm () {
      ctx.emit('confirm', props.index);
    }
    function close () {
      ctx.emit('close');
    }

    return {
      confirm,
      close
    }
  }
})
</script>

<template>
  <div>
    <h1>ModalConfirm {{ index }}</h1>
    <h2>¿SURE?</h2>
    <button @click="confirm">YES</button>
    <button @click="close">NO</button>
  </div>
</template>

<style lang="scss" scoped>
</style>
