<template>
<q-item clickable v-ripple>
    <q-item-section avatar>
        <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
    </q-item-section>

    <q-item-section>{{ displayName }}</q-item-section>
</q-item>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'UserNavbar',
    props: {
      displayName: {
          type: String,
          required: true
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
