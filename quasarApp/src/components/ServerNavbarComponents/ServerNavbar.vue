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
            <Server :serverObj="server"></Server>
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
          <template v-for="server in publicChannels" :key="server.id">
            <Server :serverObj="server"></Server>
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


export default defineComponent({
  name: 'ServerNavbar',
  props: {
  },
  data () {
    return {
      publicChannels: Array<ChannelModel>(),
    }
  },
  computed: {
    channelsJoined: {
      get (): Array<ChannelModel> {
        return this.$store.state.app.channels_joined
      },
      set () {
        //
      }
    },
    channelsInvites: {
      get (): Array<ChannelModel> {
        return this.$store.state.app.channels_invites
      },
      set () {
        //
      }
    }
  },
  components: { UserBlock, Server },
  mounted () {
    this.$store.commit('app/storeChannel', { id: 0, name: 'channel1', owner: 'whatever', type: 'joined' })
    this.$store.commit('app/storeChannel', { id: 1, name: 'channel2', owner: 'whatever', type: 'joined' })
    this.$store.commit('app/storeChannel', { id: 2, name: 'channel3', owner: 'whatever', type: 'joined' })
    this.$store.commit('app/storeChannel', { id: 3, name: 'channel4', owner: 'whatever', type: 'joined' })
    this.$store.commit('app/storeChannel', { id: 4, name: 'channel5', owner: 'whatever', type: 'invite' })
    this.$store.commit('app/storeChannel', { id: 5, name: 'channel6', owner: 'whatever', type: 'invite' })
  }


});
</script>
