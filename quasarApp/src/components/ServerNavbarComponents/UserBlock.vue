<template>
    <q-item class="user">

      <q-item-section>
        <q-avatar rounded size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-badge floating class="badge">
            <q-icon style="background-color: #1e2033; border-radius: 50%" @click="toggle_status" right size="xs" :color="colors[index]" name="trip_origin"/>
          </q-badge>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label >{{ currentUser.firstName }} {{ currentUser.lastName }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn @click="prompt = true" dense flat round class="">
          <q-icon name="add_circle_outline"/>
          <q-tooltip :offset="[0, 8]">Add channel</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn dense flat round class="">
          <q-icon name="settings"/>
          <q-tooltip :offset="[0, 8]">Settings</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn dense flat round @click="logout">
          <q-icon name="logout"/>
          <q-tooltip :offset="[0, 8]">Logout</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Channel name</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input dense v-model="channel_name" autofocus @keyup.enter="createChannel"/>
          </q-card-section>

          <q-card-section align="right">
            <q-checkbox v-model="private" label="Private" color="negative"></q-checkbox>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Channel" v-close-popup @click="createChannel" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ChannelModel, ChannelModelForm, UserModel } from '../models';

export default defineComponent({
  name: 'UserBlock',
  props: {
  },
  data () {
    return {
      private : false,
      channel_name : '',
      prompt : false,
      index : 0,
      colors : ['positive', 'negative', 'grey-5']
    }
  },
  computed: {
    currentUser: {
      get (): UserModel {
        if(this.$store.state.auth.user === null)
          return {
            id: -1,
            nickName: 'null',
            firstName: 'null',
            lastName: 'null',
            email: 'null',
            status: 'null'
          }
        else
          return this.$store.state.auth.user
      },
      set () {
        //do nothing
      }

    }
  },
  components: {},
  methods : {
    toggle_status() : void {
      this.index = (this.index + 1) %3
    },
    createChannel(){
      this.prompt = false
      const payload = {
        name: this.channel_name,
        private: this.private,
        owner: this.currentUser.id
      } as ChannelModelForm

      void this.$store.dispatch('channels/create', payload).then(
        (value: ChannelModel) => {
          void this.$store.dispatch('channels/joindb', {channel:value.id})
        }
      )
    },
    logout(){
      void this.$store.dispatch('auth/logout').then(
        void this.$router.push('/auth/login')
      )

    }
  }

});
</script>

<style scoped>
*{
  color: #afb0bb
}
.user {
  background-color: #1e2033;
}
.badge  {
  background-color: transparent;
}
</style>
