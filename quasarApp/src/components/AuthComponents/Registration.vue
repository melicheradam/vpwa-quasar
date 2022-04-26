<template>
    <q-card-section>
        <q-form class="q-gutter-md" @submit="register">
            <EmailInput ref="email_ref" label="E-mail" v-model:input="email"></EmailInput>
            <TextInput label="First name" v-model:input="firstname"></TextInput>
            <TextInput label="Last name" v-model:input="lastname"></TextInput>
            <TextInput label="Application nickname" v-model:input="nickname"></TextInput>
            <PasswordInput label="Password" v-model:input="password"></PasswordInput>
            <PasswordInput label="Confirm password" v-model:input="password_c"></PasswordInput>
            <q-card-actions class="q-px-md">
                <div class="col">
                    <q-btn
                        onclickunelevated
                        color="secondary"
                        @click="$router.push('/auth/login')"
                        padding="xs lg"
                        size="md"
                        label="Back"
                    />
                </div>
                <div class="col">
                    <q-btn
                        onclickunelevated
                        color="secondary"
                        type="submit"
                        padding="xs lg"
                        size="md"
                        label="Register"
                        :loading="loading"
                    />
                </div>
            </q-card-actions>
        </q-form>
    </q-card-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar'
import TextInput from './TextInput.vue'
import PasswordInput from './PasswordInput.vue';
import EmailInput from './EmailInput.vue';



export default defineComponent({
    name: 'RegistrationForm',

    data () {
        return {
            email: '',
            password: '',
            password_c: '',
            firstname: '',
            lastname: '',
            nickname: '',
            
            $q: useQuasar(),
        };
    },
    computed: {
        loading (): boolean {
            return this.$store.state.auth.status === 'pending'
        }
    },
    methods: {
        register: function () {
            const form = {
                password: this.password,
                nickName: this.nickname,
                email: this.email,
                firstName: this.firstname,
                lastName: this.lastname
            }
            void this.$store.dispatch('auth/register', form).then(
                () => {
                        this.$q.notify({
                        type: 'positive',
                        message: 'Account created!'
                    })

                    void this.$router.push('/auth/login')
                }
            ).catch(() => {
                this.$q.notify({
                type: 'negative',
                message: 'Please fill all fields!'
                })
            })
            
        },
    },
    components: { EmailInput, TextInput, PasswordInput }
});
</script>
