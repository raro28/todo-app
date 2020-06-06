import Vue from 'vue';
import Main from './components/Main.vue';
import router from './router';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faThumbtack}  from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Axios from 'axios';

//https://stackoverflow.com/questions/48650107/use-axios-globally-in-all-my-components-vue
Vue.prototype.$axios = Axios;

library.add(
    faTrash,
    faThumbtack,
    faCheck,
    faSpinner,
    faPlusCircle,
    faEdit,
    faComments
    );
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    render: (h) => h(Main),
    router: router
}).$mount('#app');