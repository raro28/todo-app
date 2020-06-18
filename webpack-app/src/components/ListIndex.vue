<template>
  <div>
    <h1>Lists</h1>
    <todo-lists v-bind:lists="lists" v-on:remove-list="removeList"></todo-lists>
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button v-on:click="addList">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <error-view v-bind:errors="errors"></error-view>
  </div>
</template>

<script>
import Vue from "vue";

const todoLists= {
  props: ["lists"],
  template: `
    <ul>
      <li v-for="list in lists" v-bind:key="list.id">
        <router-link :to="'/lists/'+list.id">{{list.title}}</router-link>
        <button v-on:click="$emit('remove-list',list.id)">
          <font-awesome-icon icon="trash"></font-awesome-icon>
        </button>
      </li>
    </ul>
      `
};

export default {
  name: "Home",
  components: {
    todoLists
  },
  data: function() {
    return {
      list: {
        title: ""
      },
      lists: [],
      errors: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    refreshList: function() {
      this.$todoApi.listsGet({page:1, size: 5})
        .then(
          response => this.lists = response.data,
          error => this.errors.push(error.body)
        );
    },
    addList: function(){
      this.$todoApi.listsPost(this.list)
        .then(
          response => {
            this.lists.push({
              id: response.id,
              title: this.list.title
            });

            this.list.title = "";
          },
          error => this.errors.push(error.body)
        );
    },
    removeList: function(id){
      this.$todoApi.listsIdDelete(id)
        .then(
          () => this.lists = this.lists.filter(list => list.id != id),
          error => this.errors.push(error.body)
        );
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