<template>
  <div id="app" class="container">
    <nav class="mb-5">
      <router-link v-if="isLoggedIn" class="nav-link" style="display:inline" to="/dashboard">Home</router-link>
      <router-link v-if="!isLoggedIn" class="nav-link" style="display:inline" to="/signin">Signin</router-link>
      <router-link
        v-if="!isLoggedInComputedALternative"
        class="nav-link"
        style="display:inline"
        to="/signup"
      >Signup</router-link>
      <router-link class="nav-link" style="display:inline" to="/about">About</router-link>
      <a
        href="#"
        v-if="isLoggedIn"
        @click="logout"
        class="nav-link"
        style="display:inline; cursor: pointer"
      >
        Logout
        <small class="text-muted">({{name}})</small>
      </a>
    </nav>
    <router-view></router-view>

    <div class="alert alert-warning">
      Debug: logged in user: {{name}}
      <br />
      store messages: {{$store.state.messages}}
    </div>
  </div>
</template>

<script lang="js">

import {firebaseApp} from '../firebase.js';
import { mapState } from 'vuex'

export default { 
 computed:{
    ...mapState({
        isLoggedIn: state => state.user,
        email: state => state.user.email,
        name (state) {
            if(state.user){
                return state.user.displayName ? state.user.displayName : state.user.email;
            }
    }
  }),
   isLoggedInComputedALternative: function() {
        return this.$store.state.user != null;   
   }
 },
  methods: {
    logout() {
      firebaseApp.auth()
      .signOut()
      .then(() => {})
      .catch(error =>{
         console.log(error);
      });
    }
  }
};
</script>