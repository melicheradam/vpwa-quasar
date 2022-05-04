<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 90%;">
      <q-chat-message v-if="message.user.id === currentUser" :text="message.contentArr" sent />
      <q-chat-message
        v-if="message.user.id !== currentUser"
        :name="message.user.firstName"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="message.content"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MessagesContainer',
  props: {
    message: {
      type: Object,
      required: true,
    },
    currentUser: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      $q: useQuasar(),
    };
  },
  methods: {
  },
});
</script>
