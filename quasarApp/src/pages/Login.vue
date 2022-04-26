<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row justify-end">
        <h5 class="text-h5 q-my-md">Login</h5>
      </div>
      <div class="row">
        <q-card class="transparent no-shadow">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input type="email" outlined v-model="creds.email" label="Email" />
              <q-input
                v-model="creds.password"
                outlined
                :type="isPwd ? 'password' : 'text'"
                label="Password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="!isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="secondary"
                  padding="xs lg"
                  size="md"
                  label="Login"
                  @click="authorize"
                />
                <div class="col"></div>
                <q-btn
                  to="/auth/register"
                  unelevated
                  color="secondary"
                  padding="xs lg"
                  size="md"
                  label="Create account"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script lang="ts">

import { useQuasar } from 'quasar'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  data () {
    return {
      creds: {
        email: '',
        password: '',
        remember: false
      },
      isPwd: true,
      $q: useQuasar(),
    }
  },

  methods: {
    authorize () {
      // add api authorize function
      // succesfull
      void this.$store.dispatch('auth/login', this.creds).then(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Authorized',
        })
        void this.$router.push('/channel')
      })
      .catch(() => {
        this.$q.notify({
          type: 'negative',
          message: 'Username or password invalid!'
        })
      })
    }
  }
})
</script>

<style>
.q-card {
  width: 360px;
}
</style>