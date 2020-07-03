<template>
  <div>
    <h1>Task {{task.id}}:{{task.title}}</h1>
    <router-link to="/lists">/lists</router-link> <br>
    |<span  v-for="i in page.totalPages" v-bind:key="i"><a href="#" v-on:click="goPage(i)">{{i}}</a>|</span>
    <hr />
    <task-note v-for="note in page.data" v-bind:key="note.id" v-bind:note="note" v-on:remove-note="removeNote"></task-note>
    <hr />
    <textarea rows="4" v-model="note.content"></textarea>
    <button v-on:click = "addNote">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
    <hr />
    <input type="text" placeholder="title" v-model="task.title" />
    <input type="checkbox" v-model:checked="task.completed" /> Completed
    <button v-on:click = "editTask">
      <font-awesome-icon icon="edit"></font-awesome-icon>
    </button>
    <error-view v-bind:errors="errors"></error-view>
  </div>
</template>

<script>
import Vue from "vue";

const taskNote= {
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
};

export default {
  name: "TaskDetail",
  components: {
    taskNote
  },
  data: function() {
    return {
      task: {
        id: -1,
        title: "",
        completed: false
      },
      note: {
        content: ""
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
    refreshNotes: function() {
      this.$todoApi.tasksIdNotesGet(this.task.id, {page: this.page.current, size: this.page.size})
        .then(
          response => this.page = response.data
        )
        .catch(error => this.errors.push(error.response.data));
    },
    addNote: function(){
      this.$todoApi.tasksIdNotesPost(this.task.id, this.note)
        .then(
          response => {
            this.page.data.push({
              id: response.data.id,
              content: this.note.content
            });

            this.note.content = "";
          }
        )
        .catch(error => this.errors.push(error.response.data));
    },
    editTask: function(){
      this.$todoApi.tasksIdPut(this.task.id, this.$removeId(this.task))
        .catch(error => this.errors.push(error.response.data));
    },
    removeNote: function(id){
      this.$todoApi.notesIdDelete(id)
        .then(
          ()=> this.page.data = this.page.data.filter(note => note.id != id)
        )
        .catch(error => this.errors.push(error.response.data));
    },
    goPage: function(page){
      this.page.current = page;
      this.refreshNotes();
    }
  },
  beforeCreate: function(){},
  create: function(){},
  beforeMount: function(){},
  mounted: function() {
    this.$todoApi.tasksIdGet(this.$route.params.id)
      .then(
        response => this.task = response.data
        )
      .catch(error => this.errors.push(error.response.data))
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