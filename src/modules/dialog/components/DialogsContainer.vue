<script setup>
import { useDialog } from '../composables/dialog';
import DialogWrapper from './DialogWrapper.vue';

const { dialogs } = useDialog();
</script>

<template>
  <DialogWrapper
    v-for="(dialog, $index) in dialogs"
    :key="$index"
    :closable="dialog.options.closable"
  >
    <component :is="dialog.component" v-bind="dialog.props" />
  </DialogWrapper>
</template>
