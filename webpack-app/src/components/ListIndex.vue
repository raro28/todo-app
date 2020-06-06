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

Vue.component("todo-lists", {
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
      this.$axios
        .get(this.apiUrl + "/lists")
        .then(json => (this.lists = json.data.data));
    },
    addList: function(){
      this.$axios
        .post(this.apiUrl + '/lists/', this.list)
        .then(response => {
          this.lists.push({
            id: response.data.id,
            title: this.list.title
          });

          this.list.title = "";
        });
    },
    removeList: function(id){
      this.$axios
        .delete(this.apiUrl + '/lists/' + id)
        .then(() => this.lists = this.lists.filter(list => list.id != id));
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