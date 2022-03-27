<template>
    <q-item>
        <q-item-section avatar>
            <q-avatar rounded color="purple" text-color="white" icon="bluetooth">
                <q-badge floating class="badge">
                    <q-icon
                        style="background-color: #1e2033; border-radius: 50%; z-index: 0"
                        right
                        size="xs"
                        :color="userObj.status"
                        name="trip_origin"
                    />
                </q-badge>
            </q-avatar>
        </q-item-section>

        <q-item-section>{{ userObj.firstname }} {{ userObj.lastname }}</q-item-section>

        <q-item-section side v-if="currentUser.id === userObj.id">
            <q-tooltip :offset="[0, 2]">Leave channel</q-tooltip>
            <q-btn flat icon="exit_to_app" />
        </q-item-section>
        <!--
            # TODO
            if i click on myself, show option to leave channel instead of Kick user
            !need to init vue store and create user objects
        -->
    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import { ChannelModel, UserModel, ChannelUsersModel } from '../models';

export default defineComponent({
    name: 'UserNavbar',
    props: {
        userObj: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            $q: useQuasar(),
        };
    },
    computed: {
        currentUser: {
            get (): UserModel {
                return this.$store.state.app.currentUser
            },
            set () {
                //
            }
        },
        currentChannel: {
            get (): ChannelUsersModel {
                return this.$store.state.app.currentChannel
            },
            set () {
                //
            }
        }
    },
    components: {}
});
</script>
