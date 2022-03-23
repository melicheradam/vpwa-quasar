
<template>
  <div id="scroll-target-id" class="q-pa-md" style="overflow: auto; width: 100%; max-height: 86vh;">
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
import { defineComponent, LegacyConfig} from 'vue';
import { useQuasar } from 'quasar'
import { useStore } from 'src/store';
import Message from './Message.vue';
import {MessageModel} from '../models';
import {mapGetters} from 'vuex'
import {getMessagesByChannel} from 'src/utils/GettersHelper'

export default defineComponent({
    name: 'MessagesContainer',

    props: {
      channel_id: {
        type: Number,
        required: true,
      }
    },

    data() {
        return {
            $q: useQuasar(),
        };
    },
    methods: {
        onLoad: function(){
            // fetch more messages from api
            /*
            const loaded_messages = [
              {id: 0, channel_id: 0, date: new Date(), text: ['hello'], user: 'me'},
              {id: 0, channel_id: 0, date: new Date(), text: ['hello', '????'], user: 'me'},
              {id: 0, channel_id: 0, date: new Date(), text: ['hello'], user: 'me'},
              {id: 0, channel_id: 0, date: new Date(), text: ['hello'], user: 'me'},
            ]*/
            //this.addMessages(loaded_messages)
            
        },
        addMessages(messages: Array<MessageModel>){
          //this.messages = this.messages.concat(messages)
        
          //this.messages.sort(item => item.date)
        }
    },
    components: { Message },
    computed: {
      channelMessages:{
        get () {
          return getMessagesByChannel(this.$store.state.app.messages, 0)
        },
        set (val: MessageModel[]) {
          this.$store.commit('app/storeAllMessages', val)
        }
        
      }
    },

    mounted(){
      this.$store.commit('app/storeMessage', {id: 0, channel_id: 0, date: new Date(), text: ['hello'], user: 'me'})
      this.$store.commit('app/storeMessage', {id: 0, channel_id: 1, date: new Date(), text: ['hello'], user: 'not me'})
      console.log()

    }
});
</script>
