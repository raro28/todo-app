import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue'
import ListIndex from './components/ListIndex.vue';
import ListDetail from './components/ListDetail.vue';
import TaskDetail from './components/TaskDetail.vue';
import NoteDetail from './components/NoteDetail.vue';
import { authService } from './auth'

Vue.use(Router);

//https://medium.com/js-dojo/how-to-implement-route-guard-in-vue-js-9929c93a13db
function checkLogin(to, from, next){
    authService.isUserLoggedIn().then(loggedIn => {
        if(loggedIn){
            next();
        } else{
            authService.login();
        }
    });
}

const routes =  [
    {
        path: '/home',
        name: 'home',
        component: Home 
    },
    {
        path: '/lists',
        name: 'lists',
        beforeEnter: checkLogin,
        component: ListIndex
    },
    {
        path: '/lists/:id',
        name: 'listDetail',
        beforeEnter: checkLogin,
        component: ListDetail
    },
    {
        path: '/tasks/:id',
        name: 'taskDetail',
        beforeEnter: checkLogin,
        component: TaskDetail
    },
    {
        path: '/notes/:id',
        name: 'noteDetail',
        beforeEnter: checkLogin,
        component: NoteDetail
    }
];

const router = new Router({
    mode: 'history',
    base: '/',
    routes: routes
});

router.beforeEach((to, from, next) => {
    // This isn't an actual route leading to a component. It is called by the OAuth server once the user logged in. Handling it her prevents us to have an additional callback.html file. An additional file would lead to a short hick-up after logging in. (callback.html is loaded and than the actual route.)
    // So here we handle the login redirect and than send the user to the "/" route.
    if (to.path === '/login') {
      // Inform the authentication of the login redirect. Afterwards we send the user to the main page
      authService.handleLoginRedirect()
        .then(() => next('/'))
        .catch(error => {
          console.log(error)
          next('/')
        })
    } else if (to.path === '/logout') {
    // This is similar to the "/callback" route not leading to an actual component but only to handle the logout callback from the authentication server.
      authService.handleLogoutRedirect()
        .then(() => next('/'))
        .catch(error => {
          console.log(error)
          next('/')
        })
    }
  
    // Default case. The user is send to the desired route.
    next()
});

export default router;