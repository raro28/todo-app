import Vue from 'vue';
import Router from 'vue-router';
import ListIndex from './components/ListIndex.vue';
import ListDetail from './components/ListDetail.vue';
import TaskDetail from './components/TaskDetail.vue';
import NoteDetail from './components/NoteDetail.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: '/',
    routes: [
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
    ]
});