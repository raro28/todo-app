<template>
  <div>
    <h1>Task {{task.id}}:{{task.title}}</h1>
    <router-link to="/lists">/lists</router-link>
    <hr />
    <task-note v-for="note in notes" v-bind:key="note.id" v-bind:note="note" v-on:remove-note="removeNote"></task-note>
    <hr />
    <textarea rows="4" v-model="note.content"></textarea>
    <button v-on:click = "addNote">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <hr />
    <input type="text" placeholder="title" v-model="task.title" />
    <input type="checkbox" v-model:checked="task.isCompleted" /> Completed
    <button v-on:click = "editTask">
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
  </div>
</template>

<script>
const axios = require("axios");
import Vue from "vue";

Vue.component("task-note", {
  props: ["note"],
  template: `
    <div>
      <router-link :to="'/notes/'+note.id"><font-awesome-icon icon="comments"></font-awesome-icon> {{note.id}}</router-link>
      <button v-on:click="$emit('remove-note', note.id)"><font-awesome-icon icon="trash"></font-awesome-icon></button>
      <br>
      <pre>
{{note.content}}
      </pre>
    </div>
  `
});

export default {
  name: "TaskDetail",
  components: {},
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
  computed: {},
  watch: {},
  methods: {
    refreshNotes: function() {
      axios
        .get(this.apiUrl + "/tasks/" + this.task.id + "/notes")
        .then(response => (this.notes = response.data.data));
    },
    addNote: function(){
      axios.post(this.apiUrl + "/tasks/" + this.task.id + '/notes', this.note)
      .then(response => {
        this.notes.push({
          id: response.data.id,
          content: this.note.content
        });

        this.note.content = "";
      });
    },
    editTask: function(){
      axios.put(this.apiUrl + '/tasks/' + this.task.id, this.task);
    },
    removeNote: function(id){
      axios
        .delete(this.apiUrl + '/notes/' + id)
        .then(()=> this.notes = this.notes.filter(note => note.id != id));
    }
  },
  beforeCreate: function(){},
  create: function(){},
  beforeMount: function(){},
  mounted: function() {
    axios
      .get(this.apiUrl + "/tasks/" + this.$route.params.id)
      .then(response => (this.task = response.data))
      .then(() => {
        this.task.id = this.$route.params.id;
        this.refreshNotes();
      });
  },
  beforeUpdate: function(){},
  updated: function(){},
  destroyed: function(){}
};
</script>