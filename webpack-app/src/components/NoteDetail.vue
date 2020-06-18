<template>
  <div>
    <h1>Note {{note.id}}</h1>
    <router-link to="/lists">/lists</router-link>
    <br>
    <textarea rows="4" v-model.lazy="note.content"></textarea>
    <button v-on:click = "editNote"><font-awesome-icon icon="edit"></font-awesome-icon></button>
    <error-view v-bind:errors="errors"></error-view>
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
      },
      errors: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    editNote: function(){
      this.$todoApi.notesIdPut(this.note.id, this.$removeId(this.note))
        .then(
          ()=> {},
          error => this.errors.push(error.body)
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