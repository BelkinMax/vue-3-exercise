<script setup>
import { useDialog } from '@/modules/dialog/composables/dialog'

const props = defineProps({
  date: {
    type: Number,
    required: true
  }
});

const { close } = useDialog();
</script>

<template>
  <h2>My Favorites at {{ props.date }} PM</h2>
  <button @click="close(true)">yes</button>
  <button @click="close(false)">no</button>
</template>
