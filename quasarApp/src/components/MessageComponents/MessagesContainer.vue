
<template>
  <q-scroll-area
    ref="area"
    id="scroll-target-id"
    class="q-pa-md"
    style="overflow: auto; width: 100%; height: calc(100vh - 100px);"
  >
    
    <q-infinite-scroll ref="infinite" @load="onLoad" reverse scroll-target="$refs.area" >
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div v-for="message in channelMessages" :key="message.id" class="caption q-py-sm">
          <Message :message="message" :currentUser="currentUser.id"></Message>
      </div>
      
    </q-infinite-scroll>
  </q-scroll-area>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar, QInfiniteScroll, QScrollArea } from 'quasar'
import Message from './Message.vue';
import { MessageModel, UserModel } from '../models';
import { getMessagesByChannel } from 'src/utils/GettersHelper'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { scroll } from 'quasar'
const { getScrollTarget } = scroll

export default defineComponent({
  name: 'MessagesContainer',

  data () {
    return {
      $q: useQuasar(),
      temp_now: Date.now(),
      message: '',
      loading: false,
    };
  },
  methods: {
    onLoad (index: number, done: (stop?: boolean) => void): void {
      // fetch more messages from api
      if(this.activeChannel !== null && this.channelMessages !== undefined && this.channelMessages.length > 0){
        const first_message = this.channelMessages[0]
        void this.$store.dispatch('channels/fetchMessages', {channel: this.channelID, lastDate: first_message.createdAt}).then(
          () => done(false)
        )
      }
      else 
        done(false)
    },
    ...mapMutations('channels', {
      setActiveChannel: 'SET_ACTIVE'
    }),
    scrollMessages () {
      const area = this.$refs.area as QScrollArea
      if(area.getScrollPercentage().top === 1.0)
        area && area.setScrollPercentage('vertical', 1.1)
    },
  },
  watch: {
    channelMessages: {
      handler () {
        void this.$nextTick(() => this.scrollMessages())
      },
      deep: true
    } 
  },
  updated() {
    this.scrollMessages()
  },
  mounted() {
    this.scrollMessages()
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
});
</script>
