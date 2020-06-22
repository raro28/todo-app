<template>
  <div>
    <h1>List {{list.id}}:{{list.title}}</h1>
    <router-link to="/lists">/lists</router-link> <br>
    |<span  v-for="i in page.totalPages" v-bind:key="i"><a href="#" v-on:click="goPage(i)">{{i}}</a>|</span>
    <todo-list v-bind:tasks="page.data" v-on:toggle-status="toggleStatus" v-on:remove-task="removeTask"></todo-list>
    <hr />
    <input type="text" placeholder="title" v-model:value="task.title" />
    <input type="checkbox" v-model:checked="task.completed"> Completed
    <button v-on:click="addTask">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <hr />
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button v-on:click="editList">
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
    <error-view v-bind:errors="errors"></error-view>
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
        <button v-on:click="$emit('toggle-status', task.id)"><font-awesome-icon :icon="task.completed ? 'check' : 'spinner'"></font-awesome-icon></button>
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
        completed: false
      },
      list: {
        id: 0,
        title: "title"
      },
      page: {
        size: 5,
        current: 1,
        total: 0,
        totalPages: 0,
        data: []
      },
      errors: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    refreshTasks: function() {
      this.$todoApi.listsIdTasksGet(this.list.id, {page: this.page.current, size: this.page.size})
        .then(
          response => this.page = response,
          error => this.errors.push(error.body)
        );
    },
    addTask: function(){
      this.$todoApi.listsIdTasksPost(this.list.id, this.task)
        .then(
          response => {
            this.page.data.push({
              id: response.id,
              title: this.task.title,
              completed: this.task.completed
            });

            this.task.title = "";
            this.task.completed = false;
          },
          error => this.errors.push(error.body)
        );
    },
    editList: function(){
      this.$todoApi.listsIdPut(this.list.id, this.$removeId(this.list))
        .then(
          response => {},
          error => this.errors.push(error.body)
        );
    },
    toggleStatus: function(id){
      let task = this.page.data.filter(task => task.id == id)[0];

      let taskRq = this.$removeId(task);
      taskRq.completed = !taskRq.completed;

      this.$todoApi.tasksIdPut(id, taskRq)
        .then(
          ()=> task.completed = taskRq.completed,
          error => this.errors.push(error.body)
        );
    },
    removeTask: function(id){
      this.$todoApi.tasksIdDelete(id)
        .then(
          ()=> this.page.data = this.page.data.filter(task => task.id != id),
          error => this.errors.push(error.body)
        );
    },
    goPage: function(page){
      this.page.current = page;
      this.refreshTasks();
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMounted: function() {},
  mounted: function() {
    this.$todoApi.listsIdGet(this.$route.params.id)
      .then(
        response => this.list = response,
        error => this.errors.push(error.body)
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