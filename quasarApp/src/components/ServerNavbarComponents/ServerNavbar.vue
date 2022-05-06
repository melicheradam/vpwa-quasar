<template>
  <div>
    <q-list padding>
      <q-expansion-item dense dense-toggle expand-separator icon="priority_high" label="Invites">
        <q-list dense padding>
          <template v-for="server in channelsInvites" :key="server.id">
            <Server :serverObj="server"></Server>
          </template>
        </q-list>
      </q-expansion-item>
      <q-expansion-item dense dense-toggle expand-separator icon="tag" label="Channels">
        <q-list dense padding>
          <template v-for="server in channelsJoined" :key="server.id">
            <Server :serverObj="server" :serverType="'joined'"></Server>
          </template>
        </q-list>
      </q-expansion-item>
      <q-expansion-item
        dense
        dense-toggle
        expand-separator
        icon="travel_explore"
        label="Public Channels"
      >
        <q-list dense padding>
          <template v-for="server in channelsPublic" :key="server.id">
            <Server :serverObj="server" :serverType="'public'"></Server>
          </template>
        </q-list>
      </q-expansion-item>
    </q-list>
    <div style="position:absolute; bottom:0; width: 100%">
      <UserBlock></UserBlock>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChannelModel } from '../models'
import UserBlock from './UserBlock.vue'
import Server from './Server.vue'
import { mapGetters } from 'vuex';


export default defineComponent({
  name: 'ServerNavbar',
  props: {
  },
  computed: {
    ...mapGetters('channels', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf'
    }),
    activeChannel () {
      return this.$store.state.channels.active
    },
    channelsJoined: {
      get (): Array<ChannelModel> {
        return this.$store.state.channels.joinedChannels
      },
      set () {
        //
      }
    },
    channelsInvites: {
      get (): Array<ChannelModel> {
        return this.$store.state.channels.invitesChannels
      },
      set () {
        //
      }
    },
    channelsPublic: {
      get (): Array<ChannelModel> {
        return this.$store.state.channels.publicChannels
      },
      set () {
        //
      }
    },
  },
  components: { UserBlock, Server },
  mounted () {
    //
  }


});
</script>
