<template>
  <ul>
    <li v-for="task in tasks" v-bind:key="task.id">
        <router-link :to="'/tasks/'+task.id">
          <font-awesome-icon icon="thumbtack"></font-awesome-icon>{{task.id}}
        </router-link> 
        {{task.title}}
        <button><font-awesome-icon :icon="task.isCompleted ? 'check' : 'spinner'"></font-awesome-icon></button>
        <button><font-awesome-icon icon='trash'></font-awesome-icon></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: ['tasks']
};
</script>