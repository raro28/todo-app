//https://github.com/ChristianHuff-DEV/vuejs-quarkus-oauth/blob/f59107918b3352419fa75197790862e2f7f49d7a/webclient-service/src/eventBus.js
import Vue from 'vue'

/**
 * Event fired once a user logged into the application.
 */
const USER_LOGGED_IN_EVENT = 'USER_LOGGED_IN_EVENT'

/**
 * Event fired once a user logged into the application.
 */
const USER_LOGGED_OUT_EVENT = 'USER_LOGGED_OUT_EVENT'

/**
 * Create an event bus and make it available.
 *
 * An event bus is technically just a vue instance which we use to "emit" events to and listen to them.
 */
const EventBus = new Vue()

/**
 * Fire an event that a user logged in.
 */
export var fireUserLoggedInEvent = () => {
  console.log('fire UserLoggedInEvent')
  EventBus.$emit(USER_LOGGED_IN_EVENT)
}

/**
 * Register a function to be executed when the user logged in event is fired.
 * @param {Function} callback
 */
export var registerUserLoggedInEventListener = (callback) => {
  console.log('register UserLoggedInEventListener')
  EventBus.$on(USER_LOGGED_IN_EVENT, callback)
}

/**
 * Fire an event that a user logged out.
 */
export var fireUserLoggedOutEvent = () => {
  console.log('fire UserLoggedOutEvent')
  EventBus.$emit(USER_LOGGED_OUT_EVENT)
}

/**
 * Register a function to be executed when the user logged out event is fired.
 *
 * @param {Function} callback
 */
export var registerUserLoggedOutEventListener = (callback) => {
  console.log('register UserLoggedOutEventListener')
  EventBus.$on(USER_LOGGED_OUT_EVENT, callback)
}
