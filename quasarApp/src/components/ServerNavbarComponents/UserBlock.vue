<template>
    <q-item class="user">

      <q-item-section side>
        <q-avatar rounded size="48px">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-badge floating class="badge">
            <q-icon style="background-color: #1e2033; border-radius: 50%" @click="toggle_status" right size="xs" :color="colors[index]" name="trip_origin"/>
          </q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label >Mary</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn dense flat round class="">
          <q-icon name="settings"/>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn dense flat round @click="$router.push('/login/')">
          <q-icon name="logout"/>
        </q-btn>
      </q-item-section>

    </q-item>
</template>

<script lang="ts">
import { colors } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserBlock',
  props: {
  },
  data () {
    return {
      index : 0,
      colors : ['positive', 'negative', 'grey-5']
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
  margin-left: 10%;
}
</style>
