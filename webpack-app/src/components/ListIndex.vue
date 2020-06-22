<template>
  <div>
    <h1>Lists</h1>
    |<span  v-for="i in page.totalPages" v-bind:key="i"><router-link v-bind:to="'\/lists?page='+i+'&size='+$route.query.size">{{i}}</router-link>|</span>
    <todo-lists v-bind:lists="page.data" v-on:remove-list="removeList"></todo-lists>
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
  name: "ListIndex",
  components: {
    todoLists
  },
  data: function() {
    return {
      list: {
        title: ""
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
  watch: {
    $route(to, from) {
      this.page.size = this.$route.query.size;
      this.page.current = this.$route.query.page;
      this.refreshList();
    }
  },
  methods: {
    refreshList: function() {
      this.$todoApi.listsGet({page: this.$route.query.page, size: this.$route.query.size})
        .then(
          response => this.page = response,
          error => this.errors.push(error.body)
        );
    },
    addList: function(){
      this.$todoApi.listsPost(this.list)
        .then(
          response => {
            this.page.data.push({
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
          () => this.page.data = this.page.data.filter(list => list.id != id),
          error => this.errors.push(error.body)
        );
    }
  },
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {
    this.$route.query.page = this.$route.query.page ?? this.page.current;
    this.$route.query.size = this.$route.query.size ?? this.page.size;
  },
  mounted: function() {
    this.refreshList();
  },
  beforeUpdate: function() {},
  updated: function() {},
  destroyed: function() {}
};
</script>