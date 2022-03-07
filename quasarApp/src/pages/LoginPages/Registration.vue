<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row justify-end">
        <h5 class="text-h5 text-white q-my-md">Registration</h5>
      </div>
      <div class="row">
        <q-card class="transparent no-shadow">
          <q-card-section class="text-white">
            <q-form class="q-gutter-md text-white">
              <q-input dark class="text-white" type="email" color="grey-5" label-color="grey-5" outlined v-model="email" label="Email"/>
              <q-input dark v-model="password" outlined :type="isPwd ? 'password' : 'text'" label="Password" color="grey-5" label-color="grey-5">
                <template v-slot:append>
                    <q-icon
                        :name="!isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
              </q-input>
              <q-input dark v-model="password_c" outlined :type="isPwd_c ? 'password' : 'text'" label="Confirm Password" color="grey-5" label-color="grey-5">
                <template v-slot:append>
                    <q-icon
                        :name="!isPwd_c ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd_c = !isPwd_c"
                    />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <div class="col"></div>
            <q-btn to="/login/create-user" unelevated color="secondaryc" padding="xs lg" size="md" label="Continue" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>



<script>
export default {
  name: 'Register1',
  data () {
    return {
      isPwd: true,
      isPwd_c: true,  
      email: '',
      password: ''
    }
  }
}
</script>