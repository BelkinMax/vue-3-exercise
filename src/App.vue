<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Palette Picker</h1>

    <nav>
      <RouterLink to="/">Discover</RouterLink>
      <RouterLink to="/favorites">Favorites</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  flex: 1;
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  padding: 2rem 0;
}
</style>
