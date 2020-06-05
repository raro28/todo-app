<template>
  <div>
    <router-link :to="'/notes/'+note.id"><font-awesome-icon icon="comments"></font-awesome-icon> {{note.id}}</router-link>
    <button><font-awesome-icon icon="trash"></font-awesome-icon></button>
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