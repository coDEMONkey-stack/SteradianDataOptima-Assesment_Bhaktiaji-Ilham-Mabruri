import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'

library.add(fas, faFontAwesome)

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)
app.mount('#app')
