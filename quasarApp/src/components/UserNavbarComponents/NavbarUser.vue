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

        <q-item-section>{{ userObj.firstName }} {{ userObj.lastName }}</q-item-section>

        <q-item-section side v-if="currentUser.id === userObj.id">
            <q-tooltip :offset="[0, 2]">Leave channel</q-tooltip>
            <q-btn flat icon="exit_to_app" @click="leaveChannel" />
        </q-item-section>
        <q-item-section side v-else>
            <q-tooltip :offset="[0, 2]" v-if="currentChannel.ownerId === currentUser.id">Ban user</q-tooltip>
            <q-tooltip :offset="[0, 2]" v-else>Vote kick</q-tooltip>
            <q-btn flat icon="block" @click="kickOrBanUser" />
        </q-item-section>
    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import { UserModel, ChannelModel } from '../models';
import { mapGetters } from 'vuex';

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
        currentUser(): UserModel | null{
            return this.$store.state.auth.user
        },
        ...mapGetters('channels', {
            currentChannel: 'activeChannelModel'
        }),
    },
    methods: {
        kickOrBanUser(){
            //
        },
        leaveChannel(){
            void this.$store.dispatch('app/leaveChannel')

        }
        
    }
});
</script>

<style scoped>
.badge {
  background-color: transparent;
}
</style>
