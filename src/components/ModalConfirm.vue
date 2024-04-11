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
  emits: ['confirm'],
  setup(props, ctx) {
    function confirm () {
      ctx.emit('confirm', props.index);
    }

    return {
      confirm
    }
  }
})
</script>

<template>
  <div>
    <h1>ModalConfirm {{ index }}</h1>
    <h2>¿SURE?</h2>
    <button @click="confirm">YES</button>
  </div>
</template>

<style lang="scss" scoped>
</style>
