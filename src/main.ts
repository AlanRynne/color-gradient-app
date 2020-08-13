import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faGithub, faFacebook, faTwitter, faLinkedin} from '@fortawesome/free-brands-svg-icons'


import {
    faCheck,
    faCheckCircle,
    faInfoCircle,
    faExclamationTriangle,
    faExclamationCircle,
    faArrowUp,
    faAngleRight,
    faAngleLeft,
    faAngleDown,
    faEye,
    faEyeSlash,
    faCaretDown,
    faCaretUp,
    faUpload,
    faPlus,
    faMinus,
    faChevronDown,
    faChevronUp,
    faTrash,
    faRandom,
    faPalette,
    faPauseCircle,
    faPlayCircle
} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

library.add(
    faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faPlus, faMinus, faChevronDown,
    faChevronUp, faTrash, faRandom, faPalette, faGithub, faFacebook, faTwitter, faLinkedin,faPauseCircle,faPlayCircle)

Vue.component('vue-fontawesome', FontAwesomeIcon)
Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
})

import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
