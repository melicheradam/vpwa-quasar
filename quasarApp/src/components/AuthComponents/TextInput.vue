<template>

<q-input
    class="text-white"
    type="text"
    outlined
    v-model="input_local"
    :label="label"
    :modelValue="input"
    @update:modelValue="event => $emit('update:input', event)" 
/>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
      label: {
          type: String,
          required: true
      },
      input: {
          type: String,
          required: true
      }
  },
  data () {
    return {
      input_local: this.input,
    }
  },
  
  
});
</script>
