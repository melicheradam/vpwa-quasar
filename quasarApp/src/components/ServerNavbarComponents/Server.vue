<template>
  <q-item clickable right>
    <template v-if="serverObj.type == 'invite'">
      <q-item-section side>
        <q-btn rounded flat dense>
          <q-icon color="positive" name="done" />
          <q-tooltip :offset="[0, 2]">Accept</q-tooltip>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn rounded dense flat>
          <q-icon color="negative" name="close" />
          <q-tooltip :offset="[0, 2]">Decline</q-tooltip>
        </q-btn>
      </q-item-section>
    </template>

    <template v-else-if="serverObj.type == 'joined'">
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
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { UserModel } from '../models';

export default defineComponent({
  name: 'Server',
  props: {
    serverObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    redirect (evt: Event) {
      evt.preventDefault();
      void this.$router.push('/channel/' + String(this.serverObj.id))
    }
  },
  computed: {
    currentUser: {
      get (): UserModel {
        return this.$store.state.app.currentUser
      },
      set () {
        //
      }
    }
  }

});
</script>

