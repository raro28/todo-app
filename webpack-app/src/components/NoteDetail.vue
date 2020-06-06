<template>
  <div>
    <h1>Note {{note.id}}</h1>
    <router-link to="/lists">/lists</router-link>
    <br>
    <textarea rows="4" v-model.lazy="note.content"></textarea>
    <button v-on:click = "editNote"><font-awesome-icon icon="edit"></font-awesome-icon></button>
  </div>
</template>

<script>
export default {
  name: "NoteDetail",
  data: function() {
    return {
      note: {
        id: -1,
        content: ""
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    editNote: function(){
      //TODO: it is super weird that the generated client requires {note: ...}
      this.$todoApi.notesIdPut(this.note.id, {note: this.note})
        .then(
          ()=> {},
          error => console.error(error)
        );
    }
  },
  beforeCreate: function(){},
  created: function(){},
  beforeMount: function(){},
  mounted: function() {
    this.$todoApi.notesIdGet(this.$route.params.id)
      .then(
        response => {
          this.note = response;
          this.note.id = this.$route.params.id;
        }
      );
  },
  beforeUpdate: function(){},
  updated: function(){},
  destroyed: function(){}
};
</script>