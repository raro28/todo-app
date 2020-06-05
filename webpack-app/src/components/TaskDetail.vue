<template>
  <div>
    <h1>Task {{task.id}}:{{task.title}}</h1>
    <router-link to="/lists">/lists</router-link>
    <hr>
    <note v-for="note in notes" v-bind:key="note.id" v-bind:note="note"></note>
    <hr>
    <textarea rows="4" v-model="note.content"></textarea>
    <button><font-awesome-icon icon="plus-circle"></font-awesome-icon></button>
    <hr>
    <input type="text" placeholder="title" v-model="task.title">
    <input type="checkbox" v-model:checked="task.isCompleted"> Completed
    <button><font-awesome-icon icon="edit"></font-awesome-icon></button>
  </div>
</template>

<script>
const axios = require('axios');
import Note from './Note.vue'

export default {
  name: "TaskDetail",
  components:{
      Note
  },
  data: function() {
    return {
      apiUrl: "http://localhost:8080",
      task: {
        id: -1,
        title: "",
        isCompleted: false
      },
      note: {
        content: ""
      },
      notes: []
    };
  },
  methods: {
    refreshNotes: function() {
      axios
        .get(this.apiUrl + "/tasks/" + this.task.id + "/notes")
        .then(response => (this.notes = response.data.data));
    }
  },
  mounted: function() {
    axios
      .get(this.apiUrl + "/tasks/" + this.$route.params.id)
      .then(response => (this.task = response.data))
      .then(() => {
        this.task.id = this.$route.params.id;
        this.refreshNotes();
      });
  }
};
</script>