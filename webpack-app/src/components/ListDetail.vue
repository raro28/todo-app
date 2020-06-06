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

Vue.component("todo-list", {
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
      this.$axios
        .get(this.apiUrl + "/lists/" + this.list.id + "/tasks")
        .then(response => (this.tasks = response.data.data));
    },
    addTask: function(){
      this.$axios
        .post(this.apiUrl + '/lists/' + this.list.id + '/tasks', this.task)
        .then(response => {
          this.tasks.push({
            id: response.data.id,
            title: this.task.title,
            isCompleted: this.task.isCompleted
          });

          this.task.title = "";
          this.task.isCompleted = false;
        });
    },
    editList: function(){
      this.$axios.put(this.apiUrl + '/lists/' + this.list.id, this.list);
    },
    toggleStatus: function(id){
      let task = this.tasks.filter(task => task.id == id)[0];
      task.isCompleted = !task.isCompleted;
      this.$axios.put(this.apiUrl + '/tasks/' + id, task);
    },
    removeTask: function(id){
      this.$axios
        .delete(this.apiUrl + '/tasks/' + id)
        .then(() => this.tasks = this.tasks.filter(task => task.id != id));
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$axios
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