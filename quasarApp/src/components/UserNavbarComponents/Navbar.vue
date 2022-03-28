<template>
    <q-card-section>User list:</q-card-section>
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
        channelUsers: {
            get (): Array<UserModel> {
                return this.$store.state.app.currentChannelUsers
            },
            set () {
                //
            }
        },
        channelID: {
            get (): number {
                return Number(this.$store.state.app.currentChannel.id)
            },
            set () {
                //
            }

        }
    },
    methods: {
    },
    components: { NavbarUser }
});
</script>
