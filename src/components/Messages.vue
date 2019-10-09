<template>
  <div class="row">
    <div class="col-md-12">
      <h4>Recent messages</h4>
      <form @submit.prevent="addMessage()">
        <label>
          <small>Posting as {{user}}:</small>
          <input
            class="form-control form-control-sm"
            type="text"
            placeholder="Leave message here"
            v-model="message"
          />
        </label>
        <button type="submit" class="btn btn-sm btn-primary">OK</button>
      </form>
      <div
        v-if="feedback.message"
        class="alert"
        v-bind:class="{'alert-success':(feedback.status === 'ok'), 'alert-danger':(feedback.status === 'error')}"
      >{{feedback.message}}</div>

      <ul class="list-group">
        <Message v-for="msg in messages" v-bind:key="msg.id" :message="msg"></Message>
      </ul>
    </div>
  </div>
</template>
<script lang="js">
import Message from '@/components/Message.vue'
import {firebaseApp} from "@/firebase";
export default {
  components: {
    Message
  },
  data() {
    return {
      message: "",
      user: null,
      feedback:{
        message: null,
        status: null
      },
    };
  },
  computed: {
    messages: function() {
      return this.$store.state.messages;
    }
  },
  methods: {
    addMessage() {
      if (this.message) {
        firebaseApp.firestore()
          .collection("messages")
          .add({
            message: this.message,
            sender: this.user
          })
          .then(docRef => {
            this.feedback.message =`Message with id=${docRef.id} posted.`;
            this.feedback.status =`ok`;
            setTimeout(() => {
              this.feedback.message=null;
            }, 5000);
            this.message = '';
          })
          .catch(error => {
            this.feedback.message =`${error.message}`;
            this.feedback.status =`error`;
          });
      }
    }
  },
  created: function() {
    
    this.user = this.$store.state.user.displayName ? this.$store.state.user.displayName : this.$store.state.user.email;

    firebaseApp.firestore()
      .collection("messages")
      .onSnapshot(querySnapshot => {
        const messages = [];
        querySnapshot.forEach(doc => {
          messages.push(doc.data());
        });
        this.$store.dispatch("setMessages", messages);
      });
  }
};
</script>
