<template>
  <div>
    <div class="row">
      <div class="offset-md-4 col-md-4">
        <h5>Register a new account</h5>
        <div class="form-group mt-3">
          <input type="email" placeholder="email" class="form-control" v-model="email" />
          <input type="password" placeholder="password" class="form-control" v-model="password" />
          <br />
          <button class="btn btn-primary btn-sm" @click="signUp">Register</button>
        </div>
      </div>
    </div>
    <br />
    <br />
    <p>{{error.message}}</p>
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
    signUp() {
      firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then( result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
          this.error = error
      })
    },
  }
};
</script>