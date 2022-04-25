<template>
<q-card-section>
    <q-form class="q-gutter-md" @submit="check_mail">
        
        <q-card-actions class="q-px-md">
            <div class="col">
                <q-btn
                onclickunelevated
                color="secondary"
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
import { defineComponent, PropType } from 'vue';
import { useQuasar } from 'quasar'
import { UserModel } from '../models';

export default defineComponent({
    name: 'RegistrationForm',
    props: {
      email_ok: {
          type: Boolean,
          required: true
      },
      emailProp: {
          type: String,
          required: true
      }
    },
    data() {
        return {
            email: this.emailProp,
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
    components: { }
});
</script>
