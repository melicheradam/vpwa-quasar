<template>
  <q-expansion-item
    dense
    dense-toggle
    expand-separator
    :icon="icon"
    :label="title"
  >
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, sequi?
  </q-expansion-item>
</template>


<script>

import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'CategoryExpansion',
    props: {
      icon: {
          type: String,
          required: true,
      },
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

