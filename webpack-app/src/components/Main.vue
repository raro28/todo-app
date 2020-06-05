<!-- https://dev.to/macmacky/how-to-configure-webpack-and-vue-from-the-ground-up-4c19 -->
<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Main'
}
</script>