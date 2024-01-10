import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './assets/styles.css'

import VueAwesomePaginate from 'vue-awesome-paginate'
import 'vue-awesome-paginate/dist/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUpRightFromSquare,
  faArrowLeft,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUpRightFromSquare, faArrowLeft, faRightFromBracket)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)

app.use(VueAwesomePaginate)

app.mount('#app')
