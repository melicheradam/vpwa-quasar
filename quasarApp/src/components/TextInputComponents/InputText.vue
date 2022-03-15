<template>
  <q-input color="primary" class="q-px-md"    borderless v-model="input" placeholder="message">
    <template v-slot:append>
      <q-btn round dense color="grey-5"  flat icon="send" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputText',
  props: {
  },
  data () {
    return {
      input : '',
    }
  },


});
</script>

