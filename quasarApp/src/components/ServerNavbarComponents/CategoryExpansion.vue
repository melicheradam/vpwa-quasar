<template>
  <q-expansion-item
    dense
    dense-toggle
    expand-separator
    :icon="icon"
    :label="title"
  >
    <q-list dense padding>
      <template v-for="server in servers" :key="server">
        <Server :title="server"></Server>
      </template>
    </q-list>
  </q-expansion-item>
</template>


<script>

import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import  Server  from './Server.vue'

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
          servers : ['server1', 'server2', 'server3'],
            $q: useQuasar(),
        };
    },
    methods: {
    },
    components: { Server }
});
</script>

