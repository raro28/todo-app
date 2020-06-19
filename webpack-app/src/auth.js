import * as Keycloak from 'keycloak-js'

let configOptions = {
    url: 'http://mumei:8880/auth/', realm: 'todolist', clientId: 'authorizationCode', redirectUri: window.location.origin + '/home', 
}

let initOptions = {
    onLoad:'login-required', enableLogging: true, checkLoginIframe: false
}

let keycloak = new Keycloak(configOptions);

class AuthService {
    init() {
        return keycloak.init(initOptions);
    }

    login(){
        return keycloak.login({prompt: 'login', redirectUri: window.location.origin + '/home'});
    }

    logout(){
        return keycloak.logout({});
    }

    getAccessToken(){
        return keycloak.token;
    }

    getRefreshToken(){
        return keycloak.refreshToken;
    }
}

export const authService = new AuthService();

export default {
    install: function(Vue){
        Vue.prototype.$auth = authService
    }
}