<template>
  <div>
    <h1>List {{list.id}}:{{list.title}}</h1>
    <router-link to="/lists">/lists</router-link>
    <todo-list v-bind:tasks="tasks"></todo-list>
    <hr>
    <input type="text" placeholder="title" v-model:value="task.title">
    <button><font-awesome-icon icon="plus-circle"></font-awesome-icon></button>
    <hr>
    <input type="text" placeholder="title" v-model:value="list.title">
    <button><font-awesome-icon icon="edit"></font-awesome-icon></button>
  </div>
</template>

<script>
const axios = require("axios");
import TodoList from "./TodoList.vue";

export default {
  name: "ListDetail",
  components: {
    TodoList
  },
  data: function() {
    return {
      apiUrl: "http://localhost:8080",
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
  methods: {
    refreshTasks: function() {
      axios
        .get(this.apiUrl + "/lists/" + this.list.id + "/tasks")
        .then(response => (this.tasks = response.data.data));
    }
  },
  mounted: function() {
    axios
      .get(this.apiUrl + "/lists/" + this.$route.params.id)
      .then(response => (this.list = response.data))
      .then(() => {
        this.list.id = this.$route.params.id;
        this.refreshTasks();
      });
  }
};
</script>