<template>
  <ul>
    <li v-for="list in lists" v-bind:key="list.id">
      <router-link :to="'/lists/'+list.id">{{list.title}}</router-link>
      <button class="fas fa-trash" v-on:click="$emit('remove-list', list.id)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "lists",
  props: ["lists"]
};
</script>