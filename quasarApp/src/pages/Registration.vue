<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row justify-end">
        <h5 class="text-h5 q-my-md">Registration</h5>
      </div>
      <div class="row">
        <q-card class="transparent no-shadow">
          <Registration ></Registration>
        </q-card>
      </div>
    </div>
  </q-page>
</template>



<script lang="ts">
import Registration from 'src/components/AuthComponents/Registration.vue';

export default {
    name: 'Register1',
    data() {
        return {
          email:'',
          email_ok: false,
        };
    },
    components: { Registration }
}
</script>