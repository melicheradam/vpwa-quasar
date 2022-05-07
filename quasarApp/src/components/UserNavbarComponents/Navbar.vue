<template>
    <q-list>
        <template v-for="user in channelUsers" :key="user.username">
            <NavbarUser :userObj="user"></NavbarUser>
            <q-separator />
        </template>
    </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import NavbarUser from './NavbarUser.vue';
import { UserModel } from '../models';

export default defineComponent({
    name: 'UserNavbar',

    data () {
        return {
            $q: useQuasar(),
        };
    },
    computed: {
        channelUsers() {
            const channel = this.activeChannel
            if(channel === null || isNaN(channel))
                return []
            return this.$store.state.channels.users[channel]
        },
        activeChannel(): number | null{
            return this.$store.state.channels.active
        }
    },
    methods: {
    },
    components: { NavbarUser }
});
</script>
