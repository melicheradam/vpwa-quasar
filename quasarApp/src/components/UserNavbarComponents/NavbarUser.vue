<template>
<q-item>
    <q-item-section avatar>
        <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
    </q-item-section>

    <q-item-section>{{ displayName }}</q-item-section>


    <q-item-section side> 
        <q-btn flat icon="delete" />
    </q-item-section>
        <!--
            # TODO
            if i click on myself, show option to leave channel instead of Kick user
            !need to init vue store and create user objects
        -->
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
          required: true,
      },
      imageUrl: {
          type: String,
          default: 'default_image_url',
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
