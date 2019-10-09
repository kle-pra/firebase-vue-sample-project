<template>
  <div class="jumbotron">
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="msg in messages"
        v-bind:key="msg.id"
      >{{msg.sender+": "+msg.message}}</li>
    </ul>
    Add message here [{{user}}]
    <input type="text" v-model="message" />
    <button @click="addMessage()" class="btn btn-sm btn-primary">OK</button>
  </div>
</template>

<script lang="js">
import {firebaseApp} from "@/firebase";
export default {
  data() {
    return {
      message: "",
      user: null
    };
  },
  computed:{
    messages: function (){
      return this.$store.state.messages;
    }
  },
  methods: {
    addMessage() {
      console.log(this.user+': '+this.message + '');
      if (this.message) {
        firebaseApp
          .firestore()
          .collection("messages")
          .add({
            message: this.message,
            sender: this.user,
            })
          .then((docRef) =>{
            console.log("Document written with ID: ", docRef.id);
            this.message = "";
          })
          .catch((error) =>{
            console.error("Error adding document: ", error);
          });
      }
    },
  },
   created: function() {
      this.user = this.$store.state.user.displayName ? this.$store.state.user.displayName : this.$store.state.user.email;
      firebaseApp
      .firestore()
      .collection('messages')
      .onSnapshot((querySnapshot)=> {
        const messages=[];
        querySnapshot.forEach((doc) => {
            messages.push(doc.data());
        });
        console.log(messages);
        this.$store.dispatch('setMessages', messages)
    });
    }
};
</script>

