<template>
  <ul>
    <li v-for="list in lists" v-bind:key="list.id">
      <a v-bind:href="'/app/list_detail.html?id=' + list.id">{{list.title}}</a>
      <button class="fas fa-trash" v-on:click="$emit('remove-list', list.id)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "lists",
  props: ['lists']
};
</script>