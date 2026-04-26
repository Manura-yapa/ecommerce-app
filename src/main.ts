import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router' // 1. Import the router
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router) // 2. Tell Vue to use the router
app.mount('#app')