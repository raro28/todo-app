<template>
  <div>
    <router-link :to="'/notes/'+note.id">{{note.id}}</router-link>  
    <br />
    <pre>
{{note.content}}
    </pre>
  </div>
</template>

<script>
export default {
  name: "Note",
  props: ["note"]
};
</script>