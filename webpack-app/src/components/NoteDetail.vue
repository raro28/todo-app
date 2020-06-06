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
      apiUrl: "http://localhost:8080",
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
      this.$axios
        .pust(this.apiUrl + '/notes/' + this.note.id, this.note);
    }
  },
  beforeCreate: function(){},
  created: function(){},
  beforeMount: function(){},
  mounted: function() {
    this.$axios
      .get(this.apiUrl + "/notes/" + this.$route.params.id)
      .then(response => {
        this.note = response.data;
        this.note.id = this.$route.params.id;
      });
  },
  beforeUpdate: function(){},
  updated: function(){},
  destroyed: function(){}
};
</script>