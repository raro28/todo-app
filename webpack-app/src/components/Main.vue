<!-- https://dev.to/macmacky/how-to-configure-webpack-and-vue-from-the-ground-up-4c19 -->
<template>
    <div>
        <router-link to="/home">home</router-link>
        <router-view></router-view>

        <button v-if="!logedIn" v-on:click="login">login</button>
        <button v-else v-on:click="logout">logout</button>
    </div>
</template>

<script>

export default {
    name: 'Main',
    props: ['logedIn'],
    methods: {
        login: function(){
            this.$auth.login()
                .then(() => console.log("login ok"))
                .catch(() => this.errors.push({}));
        },
        logout: function(){
            this.$auth.logout()
                .then(() => console.log("logout ok"))
                .catch(() => this.errors.push({}));
        }
    }
}
</script>