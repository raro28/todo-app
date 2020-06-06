<template>
  <div>
    <h1>List {{list.id}}:{{list.title}}</h1>
    <router-link to="/lists">/lists</router-link>
    <todo-list v-bind:tasks="tasks" v-on:toggle-status="toggleStatus" v-on:remove-task="removeTask"></todo-list>
    <hr />
    <input type="text" placeholder="title" v-model:value="task.title" />
    <input type="checkbox" v-model:checked="task.isCompleted"> Completed
    <button v-on:click="addTask">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <hr />
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button v-on:click="editList">
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
import Vue from "vue";

const todoList = {
  props: ['tasks'],
  template: `
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <router-link :to="'/tasks/'+task.id">
          <font-awesome-icon icon="thumbtack"></font-awesome-icon>{{task.id}}
        </router-link> 
        {{task.title}}
        <button v-on:click="$emit('toggle-status', task.id)"><font-awesome-icon :icon="task.isCompleted ? 'check' : 'spinner'"></font-awesome-icon></button>
        <button v-on:click="$emit('remove-task', task.id)"><font-awesome-icon icon='trash'></font-awesome-icon></button>
      </li>
    </ul>
    `
};

export default {
  name: "ListDetail",
  components: {
    todoList
  },
  data: function() {
    return {
      task: {
        title: "",
        isCompleted: false
      },
      list: {
        id: 0,
        title: "title"
      },
      tasks: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    refreshTasks: function() {
      this.$todoApi.listsIdTasksGet(this.list.id, {page:1, size: 5})
        .then(
          response => this.tasks = response.data,
          error => console.error(error)
        );
    },
    addTask: function(){
      this.$todoApi.listsIdTasksPost(this.list.id, this.task)
        .then(
          response => {
            this.tasks.push({
              id: response.id,
              title: this.task.title,
              isCompleted: this.task.isCompleted
            });

            this.task.title = "";
            this.task.isCompleted = false;
          },
          error => console.error(error)
        );
    },
    editList: function(){
      this.$todoApi.listsIdPut(this.list.id, this.list)
        .then(
          response => {},
          error => console.error(error)
        );
    },
    toggleStatus: function(id){
      let task = this.tasks.filter(task => task.id == id)[0];
      task.isCompleted = !task.isCompleted;

      this.$todoApi.tasksIdPut(id, task);
    },
    removeTask: function(id){
      this.$todoApi.tasksIdDelete(id)
        .then(
          ()=> this.tasks = this.tasks.filter(task => task.id != id),
          error => console.error(error));
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$todoApi.listsIdGet(this.$route.params.id)
      .then(
        response => this.list = response,
        error => console.error(error)
      )
      .then(() => {
        this.list.id = this.$route.params.id;
        this.refreshTasks();
      });
  },
  beforeUpdate: function() {},
  updated: function() {}
};
</script>