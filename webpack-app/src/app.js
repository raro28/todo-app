import Vue from 'vue';
import VueLogger from 'vuejs-logger';
import Main from './components/Main.vue';
import errorView from './components/errorView.vue';
import router from './router';
import todoApi from './api';
import {initTodoApi} from './api';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faThumbtack}  from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false

const options = {
  isEnabled: true,
  logLevel : Vue.config.productionTip  ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);
Vue.use(todoApi);

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
Vue.component('error-view', errorView);

new Vue({
    render: (h) => h(Main),
  router: router,
  created: function(){
    initTodoApi('http://mumei:8080');
  }
}).$mount('#app');