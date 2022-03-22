<template>

<q-item v-bind="commandObj.itemProps">
    <q-item-section avatar>
        <q-icon :name="commandObj.opt.icon" />
    </q-item-section>
    <q-item-section>
        <q-item-label>{{ commandObj.opt.label }}</q-item-label>
        <q-item-label caption>{{ commandObj.opt.description }}</q-item-label>
    </q-item-section>
</q-item>

</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'Command',
    props: {
        commandObj:{
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            $q: useQuasar(),
        };
    },
    methods: {
    },
});
</script>