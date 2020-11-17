import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/ru-RU'
import * as crypto from 'crypto-js'

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
    { name: 'Sergey', value: 'sergey' },
    { name: 'Khusan', value: 'khusan' },
    { name: 'Main', value: 'main' },
  ]
}

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    checkAdmin() {
      if (localStorage.getItem('adminPassword') && localStorage.getItem('adminPassword') == crypto.MD5('era2020')) {
        return true
      } else {
        const pass = window.prompt('Введите пароль')
        if (pass === 'era2020') {
          localStorage.setItem('adminPassword', crypto.MD5('era2020'))
          return true
        } else {
          return false
        }
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
