<template>

<q-input
    v-model="password"
    outlined
    :type="isPwd ? 'password' : 'text'"
    :label="label"
    :modelValue="input"
    @update:modelValue="event => $emit('update:input', event)" 
> 
    <template v-slot:append>
        <q-icon
        :name="!isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
        />
    </template>
</q-input>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PasswordInput',
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
  emits: ['update:input',],
  data () {
    return {
      isPwd: true,
      password: this.input,
    }
  },
  
  
});
</script>
