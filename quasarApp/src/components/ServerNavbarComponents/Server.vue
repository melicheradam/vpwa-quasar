<template>
  <q-item clickable>

    <template v-if="type == 'invite'">
      <q-item-section side>
        <q-btn rounded flat dense>
          <q-icon color="positive" name="add"/>
        </q-btn>
      </q-item-section>

      <q-item-section side>
        <q-btn rounded dense flat>
          <q-icon color="negative" name="remove"/>
        </q-btn>
      </q-item-section>
    </template>

    <template v-else>
      <q-item-section side>
        <q-btn rounded flat dense>
          <q-icon  name="clear"/>
        </q-btn>
      </q-item-section>

      <q-item-section v-if="private" side>
        <q-icon  name="lock"/>
      </q-item-section>

      <q-item-section v-else side>
        <q-icon  name="public"/>
      </q-item-section>
    </template>

    <q-item-section class="server_name" @click="redirect">
      {{ name }}
    </q-item-section>
  </q-item>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Server',
    props: {
      type : {
        type : String,
        required : true,
      },
      name: {
          type: String,
          required : true,
      },
      channel_id: {
        type: Number,
        requred: true
      },
      private : {
        type : Boolean,
        required : true,
      }
    },
    methods: {
      redirect(evt: Event){
        evt.preventDefault();
        void this.$router.push('/channel/' + String(this.channel_id))
      },
      delete(){
        this.$store.commit('app/storeChannel',{ type : this.channel_id, id: this.type })
      }
    }
});
</script>

<style scoped>
.server_name {
  margin-left: 45%;
}
</style>
