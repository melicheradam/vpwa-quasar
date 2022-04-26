<template>

<q-input
    type="email"
    outlined
    v-model="email"
    :label="label"
    :modelValue="input"
    @update:modelValue="event => $emit('update:input', event)" 
/>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmailInput',
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
      email: this.input,
    }
  },
  
  
});
</script>
