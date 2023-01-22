import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'

import router from './modules/router'
import store, { storeKey } from './modules/store'

import pocketbase from './modules/pocketbase'

const vueApp = createApp(App)
	.use(pocketbase)
	.use(router)
	.use(store, storeKey)
	.mount('#app')
