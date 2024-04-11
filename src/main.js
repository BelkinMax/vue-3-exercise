import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

const app = createApp(App)
const storage = useStorage('my-favourites', [])

const store = createStore({
  state () {
    return {
      savedPalettes: storage.value
    }
  },
  actions: {
    add (state, item) {
      storage.value.push(item)
    },
    delete(state, index) {
      storage.value.splice(index, 1)
    },
    edit (state, {
      oldValue,
      newValue
    }) {
      const item = storage.value.find(item => item.name === oldValue)
      item.name = newValue
    }
  }
})

app.use(router)
app.use(store)
app.mount('#app')
