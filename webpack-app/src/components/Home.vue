<template>
  <div>
    <h1>Home</h1>
    <lists v-bind:lists="lists"></lists>
  </div>
</template>

<script>
const axios = require('axios');
import Lists from "./Lists.vue";

export default {
  name: "Home",
  components: {
    Lists
  },
  data: function() {
    return {
      apiUrl: "http://localhost:8080",
      list: {
        title: ""
      },
      lists: []
    };
  },
  methods: {
    refreshList: function() {
      axios
        .get(this.apiUrl + "/lists")
        .then(json => (this.lists = json.data.data));
    }
  },
  mounted: function() {
    this.refreshList();
  }
};
</script>