<template>
  <ul>
    <li v-for="list in lists" v-bind:key="list.id">
      <router-link :to="'/lists/'+list.id">{{list.title}}</router-link>
      <button>
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "lists",
  props: ["lists"]
};
</script>