
<template>
  <div
    id="scroll-target-id"
    class="q-pa-md"
    style="overflow: auto; width: 100%; max-height: calc(100vh - 100px);"
  >
    <q-infinite-scroll @load="onLoad" reverse scroll-target="#scroll-target-id">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div v-for="message in channelMessages" :key="message.id" class="caption q-py-sm">
        <Message :message="message" :currentUser="1"></Message>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import Message from './Message.vue';
import { MessageModel } from '../models';
import { getMessagesByChannel } from 'src/utils/GettersHelper'

export default defineComponent({
  name: 'MessagesContainer',

  props: {
    channel_idProp: {
      type: Number,
      required: true,
    }
  },

  data () {
    return {
      $q: useQuasar(),
      temp_now: Date.now(),
      channel_id: this.channel_idProp,

    };
  },
  methods: {
    onLoad: function () {
      // fetch more messages from api
      this.$store.commit('app/storeMessage', { id: 0, channel_id: 1, date: this.temp_now, text: ['hello'], user: 'not me' })

    },
  },
  components: { Message },
  computed: {
    channelMessages: {
      get () {
        console.log(this.channel_id)
        return getMessagesByChannel(this.$store.state.app.messages, this.channel_id)
      },
      set (val: MessageModel[]) {
        this.$store.commit('app/storeAllMessages', val)
      }

    }
  },
  beforeRouteUpdate(to, from) {
    // react to route changes...
    console.log(this.$route.params.channel_id)
    this.channel_id = Number(this.$route.params.channel_id)
  },

  mounted () {
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'not me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'not me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'not me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'not me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'me' })
    this.$store.commit('app/storeMessage', { id: 0, channel_id: 0, date: Date.now(), text: ['hello'], user: 'me' })
  }
});
</script>
