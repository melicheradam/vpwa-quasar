<template>
<q-card-section class="text-white">
    <q-form class="q-gutter-md text-white" @submit="check_mail">
        <EmailInput ref="email_ref" label="E-mail" v-model:input="email"></EmailInput>
        <PasswordInput label="Password" v-model:input="password"></PasswordInput>
        <PasswordInput label="Confirm password" v-model:input="password_c"></PasswordInput>
        <q-card-actions class="q-px-md">
            <div class="col">
                <q-btn
                onclickunelevated
                color="secondaryc"
                type="submit"
                padding="xs lg"
                size="md"
                label="Continue"
                />
            </div>
        </q-card-actions>
    </q-form>
</q-card-section>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import PasswordInput from './PasswordInput.vue';
import EmailInput from './EmailInput.vue';
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'RegistrationForm',
    props: {
      email_ok: {
          type: Boolean,
          required: true
      }
    },
    data() {
        return {
            email: '',
            password: '',
            password_c: '',
            $q: useQuasar(),
        };
    },
    methods: {
        //here check api if email is not taken
        check_mail: function () {

            let email = String(this.email);
            console.log(email)
            if (email.includes('ok')) {
                //if email is not taken redirect to next page of registration, or replace content of this page idk ..
                this.$emit('update:email_ok', true)
            }
            else {
                //display error
                this.$q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'Account with this email already exists!'
                })
            }
        },
    },
    components: { PasswordInput, EmailInput}
});
</script>
