import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue'
import ListIndex from './components/ListIndex.vue';
import ListDetail from './components/ListDetail.vue';
import TaskDetail from './components/TaskDetail.vue';
import NoteDetail from './components/NoteDetail.vue';

Vue.use(Router);

const routes =  [
    {
        path: '/home',
        name: 'home',
        component: Home 
    },
    {
        path: '/lists',
        name: 'lists',
        component: ListIndex
    },
    {
        path: '/lists/:id',
        name: 'listDetail',
        component: ListDetail
    },
    {
        path: '/tasks/:id',
        name: 'taskDetail',
        component: TaskDetail
    },
    {
        path: '/notes/:id',
        name: 'noteDetail',
        component: NoteDetail
    }
];

const router = new Router({
    mode: 'history',
    base: '/',
    routes: routes
});

export default router;