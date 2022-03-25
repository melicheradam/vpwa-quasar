<template>
  <q-item clickable v-ripple :inset-level="3.8">
    <q-item-section>
      {{ title }}
    </q-item-section>
  </q-item>
</template>


<script>

import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'Server',
    props: {
      title: {
          type: String,
          required : true,
      }
    },
    data() {
        return {
            $q: useQuasar(),
        };
    },
    methods: {
    },
    components: {}
});
</script>

