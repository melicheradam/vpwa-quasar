<template>
  <div id="scroll-target-id" class="q-pa-md" style="overflow: auto; width: 100%; max-height: 86vh;">
    <q-infinite-scroll @load="onLoad" reverse scroll-target="#scroll-target-id">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

      <div v-for="message in messages" :key="message.id" class="caption q-py-sm">
        <Message :message="message" :currentUser="1"></Message>
      </div>
    </q-infinite-scroll>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import Message from './Message.vue';

export default defineComponent({
    name: 'MessagesContainer',

    data() {
        return {
            messages: [
                {'id': 1, 'displayName': 'User1', 'text': ['lorem ipsum']},
                {'id': 2, 'displayName': 'User2', 'text': ['lorem ipsum']},
                {'id': 3, 'displayName': 'User2', 'text': ['lorem ipsum']},
                {'id': 4, 'displayName': 'User4', 'text': ['lorem ipsum']},
                {'id': 1, 'displayName': 'User1', 'text': ['lorem ipsum']},
                {'id': 1, 'displayName': 'User1', 'text': ['lorem ipsum']},
                {'id': 4, 'displayName': 'User4', 'text': ['lorem ipsum']},
            ],
            $q: useQuasar(),
        };
    },
    methods: {
        onLoad: function(){
            console.log('loading')
            //this.$refs.messages.setScrollPosition( ... )
        },
    },
    components: { Message }
});
</script>
