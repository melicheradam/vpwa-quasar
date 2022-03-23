<template>
  <q-page>
    <MessagesContainer :channel_id="0" ></MessagesContainer>
  </q-page>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessagesContainer from 'src/components/MessageComponents/MessagesContainer.vue'


export default defineComponent({
  components: { MessagesContainer },
  name: 'IndexPage',
  props: {
  },
  data () {
    return {
      input : '',
    }
  },
});
</script>
