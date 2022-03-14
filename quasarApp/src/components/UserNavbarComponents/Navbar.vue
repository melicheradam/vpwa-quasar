<template>
<q-card-section>
    <q-list bordered>
        <template v-for="user in users" :key="user.displayName" >
            <NavbarUser :displayName="user.displayName"></NavbarUser>
            <q-separator />
        </template>
    </q-list>
</q-card-section>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useQuasar } from 'quasar'
import NavbarUser from './NavbarUser.vue';

export default defineComponent({
    name: 'UserNavbar',

    data() {
        return {
            users: [
                {'displayName': 'User1'},
                {'displayName': 'User2'},
                {'displayName': 'User3'},
                {'displayName': 'User4'},
            ],
            $q: useQuasar(),
        };
    },
    methods: {
    },
    components: { NavbarUser }
});
</script>
