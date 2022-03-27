<template>
  <q-item clickable v-ripple :inset-level="3.8" @click="redirect">
    <q-item-section>
      {{ name }}
    </q-item-section>
  </q-item>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Server',
    props: {
      name: {
          type: String,
          required : true,
      },
      channel_id: {
        type: Number,
        requred: true
      }
    },
    methods: {
      redirect(evt: Event){
        evt.preventDefault();
        void this.$router.push('/channel/' + String(this.channel_id))
      }
    }
});
</script>

