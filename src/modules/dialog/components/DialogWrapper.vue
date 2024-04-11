<script setup>
import { onMounted, ref } from 'vue';
import { useDialog } from '../composables/dialog';

const props = defineProps({
  closable: {
    type: Boolean,
    default: true
  }
});

const { close } = useDialog();
const dialogRef = ref(null);

const onCancel = (ev) => {
  ev.preventDefault();
  if(!props.closable === false) {
    close();
  }
};

onMounted(() => {
  dialogRef.value?.showModal();
});
</script>

<template>
  <dialog ref="dialogRef" @cancel="onCancel">
    <slot />
  </dialog>
</template>
