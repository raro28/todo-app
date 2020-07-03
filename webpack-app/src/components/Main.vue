<!-- https://dev.to/macmacky/how-to-configure-webpack-and-vue-from-the-ground-up-4c19 -->
<template>
    <div>
        <router-link to="/home">home</router-link>
        <router-view></router-view>
    <br>
    <button
      v-if="!isUserLoggedIn"
      @click="onLogin()"
    >
      Login
    </button>
    <button
      v-else
      @click="onLogout()"
    >
      Logout
    </button>
    </div>
</template>

<script>
import {setTokenTodoApi} from '../api';
import { authService } from '../auth'
import { registerUserLoggedInEventListener, registerUserLoggedOutEventListener } from '../eventBus'

export default {
  name: 'Home',
  data () {
    return {
      isUserLoggedIn: false
    }
  },
  mounted () {
    //https://github.com/ChristianHuff-DEV/vuejs-quarkus-oauth/blob/f59107918b3352419fa75197790862e2f7f49d7a/webclient-service/src/views/Home.vue
    this.$auth.isUserLoggedIn()
      .then(isLoggedIn => {
        this.isUserLoggedIn = isLoggedIn;
      })
      .catch(error => {
        this.isUserLoggedIn = false;
      })
    registerUserLoggedInEventListener(() => this.isUserLoggedIn = true)
    registerUserLoggedOutEventListener(() => this.isUserLoggedIn = false)
  },
  methods: {
    onLogin () {
      this.$auth.login()
    },
    onLogout () {
      this.$auth.logout()
    }
  }
}
</script>