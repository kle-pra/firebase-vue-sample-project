<template>
  <div>
    <div class="row">
      <div class="offset-md-4 col-md-4">
        <button @click="signInGoogle" class="btn btn-info btn-sm">Sign in with Google</button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="offset-md-4 col-md-4">
        <h5>Login with email/password</h5>
        <router-link to="/signup">Not a user? Sign up</router-link>
        <div class="form-group mt-3">
          <input type="email" placeholder="email" class="form-control" v-model="email" />
          <input type="password" placeholder="password" class="form-control" v-model="password" />
          <br />
          <button class="btn btn-primary btn-sm" @click="signIn">Sign In</button>
        </div>
      </div>
    </div>
    <br />
    <br />
    <p v-if="error.message" class="alert alert-danger">{{error.message}}</p>
    <br />
  </div>
</template>

<script lang="js">

import {firebaseApp} from '../firebase.js';

export default {
  data() {
    return {
      email:'',
      password:'',
      error : {
        message:''
      }
    }
  },
  methods: {
    signIn() {
      firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then( result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
          this.error = error
      })
    },
    signInGoogle() {
      const provider = new firebaseApp.auth.GoogleAuthProvider();
      firebaseApp.auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        console.log(user);

      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>