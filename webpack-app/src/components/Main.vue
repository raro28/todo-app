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
    this.$auth.isUserLoggedIn()
      .then(isLoggedIn => {
        if(isLoggedIn){
          authService.getAccessToken().then((accessToken) => {
              setTokenTodoApi(accessToken, null);
          });
        }
        this.isUserLoggedIn = isLoggedIn;
      })
      // If somehting goes wrong we assume no user is logged in
      .catch(error => {
        this.isUserLoggedIn = false;
      })
    registerUserLoggedInEventListener(() => { 
        authService.getAccessToken().then((accessToken) => {
            setTokenTodoApi(accessToken, null);
        });
        this.isUserLoggedIn = true;
        })
    registerUserLoggedOutEventListener(() => { 
        this.isUserLoggedIn = false 
        })
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