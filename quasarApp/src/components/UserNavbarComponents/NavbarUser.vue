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

        <q-item-section>{{userObj.nickName}}</q-item-section>

        <q-item-section side v-if="currentUser.id === userObj.id">
            <q-tooltip :offset="[0, 2]">Leave channel</q-tooltip>
            <q-btn flat icon="exit_to_app" @click="showDialog = true" />
        </q-item-section>
        <q-item-section side v-else>
            <template v-if="currentChannel.ownerId === currentUser.id">
              <q-tooltip :offset="[0, 2]" >Ban user</q-tooltip>
              <q-btn flat icon="hardware" @click="kickOrBanUser" />
            </template>
            <template v-else>
              <q-tooltip :offset="[0, 2]">Vote kick</q-tooltip>
              <q-btn flat icon="block" @click="kickOrBanUser" />
            </template>
        </q-item-section>
    </q-item>

      <q-dialog v-model="showDialog" persistent>
        <template v-if="currentChannel.ownerId === currentUser.id">
          <q-card style="min-width: 350px" >
            <q-card-section>
              <div class="">
                <q-avatar icon="warning" color="" text-color="negative" />
                You are the owner of this channel, if you leave, channel will be deleted
              </div>
            </q-card-section>
            <q-card-actions align="right" class="text-primary" >
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Leave" color="negative"  v-close-popup @click="leaveChannel" />
            </q-card-actions>
          </q-card>
        </template>

        <template v-else>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="">
                    Are you sure you want to leave this channel?
                </div>
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn flat label="Leave" color="negative"  v-close-popup @click="leaveChannel" />
            </q-card-actions>
          </q-card>
        </template>

      </q-dialog>

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
            showDialog : false,
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
            this.showDialog = false
            const channel_id = Number((this.currentChannel as ChannelModel).id)
            void this.$store.dispatch('channels/leaveChannel', {channel: channel_id})
            void this.$router.push('/channel')

        }

    }
});
</script>

<style scoped>
.badge {
  background-color: transparent;
}
</style>
