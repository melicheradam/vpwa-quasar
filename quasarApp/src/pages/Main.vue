<template>
  <q-page>
    <MessagesContainer :key="$route.fullPath" ></MessagesContainer>
  </q-page>
 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessagesContainer from 'src/components/MessageComponents/MessagesContainer.vue'


export default defineComponent({
  components: { MessagesContainer },
  name: 'IndexPage',

  mounted(){
    void this.$store.dispatch('channels/loadChannels')
    void this.$store.dispatch('channels/join')
  }
});
</script>
