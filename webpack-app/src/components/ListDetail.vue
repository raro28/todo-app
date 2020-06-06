<template>
  <div>
    <h1>List {{list.id}}:{{list.title}}</h1>
    <router-link to="/lists">/lists</router-link>
    <todo-list v-bind:tasks="tasks"></todo-list>
    <hr />
    <input type="text" placeholder="title" v-model:value="task.title" />
    <button>
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <hr />
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button>
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
const axios = require("axios");
import Vue from "vue";

Vue.component("todo-list", {
  props: ['tasks'],
  template: `
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
    `
});

export default {
  name: "ListDetail",
  components: {},
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
  computed: {},
  watch: {},
  methods: {
    refreshTasks: function() {
      axios
        .get(this.apiUrl + "/lists/" + this.list.id + "/tasks")
        .then(response => (this.tasks = response.data.data));
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    axios
      .get(this.apiUrl + "/lists/" + this.$route.params.id)
      .then(response => (this.list = response.data))
      .then(() => {
        this.list.id = this.$route.params.id;
        this.refreshTasks();
      });
  },
  beforeUpdate: function() {},
  updated: function() {}
};
</script>