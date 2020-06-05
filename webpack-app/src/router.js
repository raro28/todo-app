import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import ListDetail from './components/ListDetail.vue';
import TaskDetail from './components/TaskDetail.vue';
import NoteDetail from './components/NoteDetail.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
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
    ]
});