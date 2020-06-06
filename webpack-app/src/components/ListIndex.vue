<template>
  <div>
    <h1>Lists</h1>
    <todo-lists v-bind:lists="lists" v-on:remove-list="removeList"></todo-lists>
    <input type="text" placeholder="title" v-model:value="list.title" />
    <button v-on:click="addList">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
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
      lists: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    refreshList: function() {
      this.$todoApi.listsGet({page:1, size: 5})
        .then(
          response => this.lists = response.data,
          error => console.error(error)
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
          error => console.error(error)
        );
    },
    removeList: function(id){
      this.$todoApi.listsIdDelete(id)
        .then(
          () => this.lists = this.lists.filter(list => list.id != id),
          error => console.error(error)
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