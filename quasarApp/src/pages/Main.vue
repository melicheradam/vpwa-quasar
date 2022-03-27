<template>
  <q-page>
    <MessagesContainer :channel_id="channel_id" :key="$route.fullPath" ></MessagesContainer>
  </q-page>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessagesContainer from 'src/components/MessageComponents/MessagesContainer.vue'


export default defineComponent({
  components: { MessagesContainer },
  name: 'IndexPage',
  data () {
    return {
      channel_id: Number(this.$route.params.channel_id)
    }
  },
});
</script>
