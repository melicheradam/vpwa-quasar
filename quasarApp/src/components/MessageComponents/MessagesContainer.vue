
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
        <Message :message="message" :currentUser="currentUser.id"></Message>
      </div>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import Message from './Message.vue';
import { MessageModel, UserModel } from '../models';
import { getMessagesByChannel } from 'src/utils/GettersHelper'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default defineComponent({
  name: 'MessagesContainer',

  data () {
    return {
      $q: useQuasar(),
      temp_now: Date.now(),
      message: '',
      loading: false
    };
  },
  methods: {
    onLoad (index: number, done: (stop?: boolean) => void): void {
      // fetch more messages from api
      this.$store.commit('app/storeMessage', { id: 0, channel_id: this.channelID, date: this.temp_now, text: ['hello'], user: 'not me' })

      done(false)
    },
    ...mapMutations('channels', {
      setActiveChannel: 'SET_ACTIVE'
    })
  },
  components: { Message },
  computed: {
    activeChannel(): number | null{
      return this.$store.state.channels.active
    },
    currentUser(): UserModel | null{
      return this.$store.state.auth.user
    },
    ...mapGetters('channels', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf'
    }),
    channelMessages (): MessageModel[] | [] {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
        return this.$store.getters['channels/currentMessages']
    },
    channelID: {
      get (): number {
        return Number(this.$store.state.channels.active)
      },
      set () {
        //
      }

    }
  },
  mounted () {
    if(this.activeChannel !== null)
      void this.$store.dispatch('channels/join', this.activeChannel)
  }
});
</script>
