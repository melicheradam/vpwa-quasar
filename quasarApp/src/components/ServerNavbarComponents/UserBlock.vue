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
        <q-item-label >{{ currentUser.firstname }} {{ currentUser.lastname }}</q-item-label>
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
        <q-btn dense flat round @click="$router.push('/login/')">
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
            <q-input dense v-model="channel_name" autofocus @keyup.enter="prompt = false"/>
          </q-card-section>

          <q-card-section align="right">
            <q-checkbox v-model="private" label="Private" color="negative"></q-checkbox>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Channel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
      get () {
        return this.$store.state.app.currentUser
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
