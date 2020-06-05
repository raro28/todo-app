<template>
  <div>
    <h1>Note {{note.id}}</h1>
    <textarea rows="4" v-model.lazy="note.content"></textarea>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "NoteDetail",
  data: function() {
    return {
      apiUrl: "http://localhost:8080",
      note: {
        id: -1,
        content: ""
      }
    };
  },
  methods: {},
  mounted: function() {
    axios
      .get(this.apiUrl + "/notes/" + this.$route.params.id)
      .then(response => {
        this.note = response.data;
        this.note.id = this.$route.params.id;
      });
  }
};
</script>