<template>
  <q-page>
    <MessagesContainer></MessagesContainer>
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
