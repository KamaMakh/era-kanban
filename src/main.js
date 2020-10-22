import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(Element, {
  size: 'medium',
  locale: enLang
})
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype['CONSTANTS'] = {
  users: [
    { name: 'Kamron', value: 'kamron' },
    { name: 'Abror', value: 'abror' },
    { name: 'Orlov', value: 'orlov' },
    { name: 'Tex-dir', value: 'tsaryov' },
    { name: 'Lyubov', value: 'lyuba' },
    { name: 'Anastasiya', value: 'anastasiya' },
    { name: 'Main', value: 'main' }
  ]
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
