<template>
  <q-item clickable right>
    <template v-if="serverType === 'invite'">
      <q-item-section side>
        <q-btn rounded flat dense>
          <q-icon color="positive" name="done" @click="accept"/>
          <q-tooltip :offset="[0, 2]">Accept</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn rounded dense flat @click="decline">
          <q-icon color="negative" name="close" />
          <q-tooltip :offset="[0, 2]">Decline</q-tooltip>
        </q-btn>
      </q-item-section>
    </template>

    <template v-else-if="serverType === 'joined'">
      <q-item-section v-if="serverObj.private" side>
        <q-btn rounded dense flat>
          <q-icon name="lock" />
          <q-tooltip :offset="[0, 2]">Make public</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-item-section v-else side>
        <q-btn rounded dense flat>
          <q-icon name="public" />
          <q-tooltip :offset="[0, 2]">Make private</q-tooltip>
        </q-btn>
      </q-item-section>
    </template>

    <q-item-section @click="redirect">{{ serverObj.name }}</q-item-section>
  </q-item>
  <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">To view contents of this channel you must join it.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Join channel" color="primary" v-close-popup @click="accepted = true" />
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>


<script lang="ts">
import { QDialog } from 'quasar';
import { channelService } from 'src/services'
import { defineComponent, ref } from 'vue';
import { ChannelModel } from '../models';

export default defineComponent({
  name: 'Server',
  props: {
    serverObj: {
      type: Object,
      required: true
    },
    serverType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showDialog: false,
      accepted: false
    };
  },
  watch : {
    accepted() {
      if(this.accepted)
      {
        this.accepted = false

        void this.$store.dispatch('channels/joindb', { channel: (this.serverObj as ChannelModel).id }).then(
          () => void this.$router.push('/channel/' + String(this.serverObj.id)).then(
            () => void channelService.addMember(Number(this.serverObj.id))
            )
        )
        
        
      }
    }
  },
  methods: {
    redirect (evt: Event) {
      evt.preventDefault();
      if(this.serverType === 'public'){
        this.showDialog = true
      }
      else
        void this.$router.push('/channel/' + String(this.serverObj.id))
    },
    decline(evt : Event) {
      evt.preventDefault();
      void this.$store.dispatch('app/declineInvite',this.serverObj)
      },
    accept(evt : Event) {
      evt.preventDefault();
      void this.$store.dispatch('app/acceptInvite',this.serverObj)
      }
  },
});
</script>

