<template>
  <div>
    <h1>Lists</h1>
    <todo-lists v-bind:lists="lists"></todo-lists>
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button v-on:click="addList">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
const axios = require("axios");
import Vue from "vue";

Vue.component("todo-lists", {
  props: ["lists"],
  template: `
    <ul>
      <li v-for="list in lists" v-bind:key="list.id">
        <router-link :to="'/lists/'+list.id">{{list.title}}</router-link>
        <button>
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
      </li>
    </ul>
      `
});

export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      apiUrl: "http://localhost:8080",
      list: {
        title: ""
      },
      lists: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    refreshList: function() {
      axios
        .get(this.apiUrl + "/lists")
        .then(json => (this.lists = json.data.data));
    },
    addList: function(){
      axios
        .post(this.apiUrl + '/lists/', this.list)
        .then(response => {
          this.lists.push({
            id: response.data.id,
            title: this.list.title
          });

          this.list.title = "";
        });
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {
    this.refreshList();
  },
  beforeUpdate: function() {},
  updated: function() {},
  destroyed: function() {}
};
</script>