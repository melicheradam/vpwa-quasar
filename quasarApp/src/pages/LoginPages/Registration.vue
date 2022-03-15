<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row justify-end">
        <h5 class="text-h5 q-my-md">Registration</h5>
      </div>
      <div class="row">
        <q-card class="transparent no-shadow">
          <RegistrationFirst  v-if="!email_ok" v-model:email_ok="email_ok"></RegistrationFirst>
          <RegistrationSecond  v-if="email_ok" v-model:email_ok="email_ok"></RegistrationSecond>
        </q-card>
      </div>
    </div>
  </q-page>
</template>



<script>
import RegistrationFirst from 'src/components/LoginComponents/RegistrationFirst.vue';
import RegistrationSecond from 'src/components/LoginComponents/RegistrationSecond.vue';

export default {
    name: 'Register1',
    data() {
        return {
          email_ok: false,
        };
    },
    components: { RegistrationFirst, RegistrationSecond }
}
</script>