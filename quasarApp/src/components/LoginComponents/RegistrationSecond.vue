<template>
<q-card-section class="text-white">
    <q-form class="q-gutter-md text-white" @submit="register">
        <TextInput label="First name" v-model:input="firstname"></TextInput>
        <TextInput label="Last name" :input="lastname"></TextInput>
        <TextInput label="Application nickname" :input="nickname"></TextInput>
        <q-card-actions class="q-px-md">
            <div class="col">
                <q-btn
                onclickunelevated
                color="secondaryc"
                @click="go_back"
                padding="xs lg"
                size="md"
                label="Back"
                />
            </div>
            <div class="col">
                <q-btn
                onclickunelevated
                color="secondaryc"
                type="submit"
                padding="xs lg"
                size="md"
                label="Register"
                />
            </div>
        </q-card-actions>
    </q-form>
</q-card-section>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { useQuasar } from 'quasar'
import TextInput from './TextInput.vue'

export default defineComponent({
    name: 'RegistrationForm',
    props: {
      email_ok: {
          type: Boolean,
          required: true
      },
    },  
    data() {
        return {
            firstname: '',
            lastname: '',
            nickname: '',
            $q: useQuasar(),
        };
    },
    methods: {
        //here check api if email is not taken
        go_back: function(){
            this.$emit('update:email_ok', false)
        },
        register: function () {
            this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Account created'
            })

            void this.$router.push('/login') 
        },
    },
    components: { TextInput }
});
</script>
