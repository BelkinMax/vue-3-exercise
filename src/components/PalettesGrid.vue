<template>
<TransitionGroup name="list" tag="section" class="grid">
    <slot></slot>
</TransitionGroup>
</template>

<script>
export default {
name: 'PalettesGrid'
}
</script>

<style scoped>
.grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 3em;
}
</style>
  