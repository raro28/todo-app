<template>
  <ul>
    <li v-for="task in tasks" v-bind:key="task.id">
        <router-link :to="'/tasks/'+task.id">{{task.title}}</router-link>
        {{task.isCompleted ? 'Ok':'X'}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: ['tasks']
};
</script>