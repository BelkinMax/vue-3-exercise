<script>
import {computed, defineComponent, ref} from 'vue'
import PaletteCard from '@/components/PaletteCard.vue'
import {useStore} from "vuex";
import Alert from "@/components/Alert.vue";

export default defineComponent({
  name: 'FavoritesView',
  components: {Alert, PaletteCard},
  setup() {
    const store = useStore();
    const showAlert = ref(false);
    let idToRemove = undefined;

    function removePaletteToFav () {
      if (!idToRemove) {
        return;
      }
      store.dispatch('removePaletteToFav', idToRemove)
    }

    function openAlert (id) {
      showAlert.value = true;
      idToRemove = id;
    }

    function onOk () {
      showAlert.value = false;
      removePaletteToFav(idToRemove)
    }

    function onCancel () {
      showAlert.value = false;
      idToRemove = undefined;
    }

    return {
      favorites: computed(() => store.state.favorites),
      updateTitlePaletteToFav: (title, id) => store.dispatch('updateTitlePaletteToFav', { id, title }),
      showAlert,
      openAlert,
      onOk,
      onCancel
    }
  }
})
</script>

<template>
  <h2>My Favorites</h2>
  <Teleport v-if="showAlert" to="#global-alert">
    <Alert
        @ok="onOk"
        @cancel="onCancel"
    />
  </Teleport>
  <TransitionGroup name="list" tag="section" class="favorites-view">
    <PaletteCard
        v-for="item in favorites"
        :key="item.id"
        is-favorite
        is-editable
        :item="item"
        @toggleFavorites="openAlert(item.id)"
        @updateTitle="updateTitlePaletteToFav($event, item.id)"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: transform 0.3s ease;
}

.list-leave-active {
  display: none;
}

h2 {
  margin-bottom: 3rem;
}

.favorites-view {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 3em;
}
</style>
