<template>
    <q-form @submit="onSubmit" autofocus autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false">
      <q-select
        type="text"
        dark
        class="q-px-md"
        name="message"
        placeholder="Type a message or command"
        borderless
        v-model="input"
        use-input
        hide-selected
        fill-input
        hide-dropdown-icon
        input-debounce="0"
        :options="options"
        @filter="filterFunction"
      >
        <template v-slot:option="scope">
          <CommandItem :commandObj="scope"></CommandItem>
        </template>
        <template v-slot:append>
          <q-btn type="submit" round dense color="grey-5" flat icon="send" @click="onSubmit" />
        </template>
        <template v-slot:prepend>
          <q-btn round dense color="grey-5" flat icon="code" />
        </template>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-form>
</template>

<script lang="ts">
import { QSelect } from 'quasar';
import { ref, defineComponent } from 'vue';
import CommandItem from './CommandItem.vue';


interface CommandObj{
  label: string,
  value: string,
  description: string,
}
const commandList: CommandObj[] = [
  {
    label: '',
    value: '',
    description: ''
  },
  {
    label: '/kick',
    value: '/kick',
    description: 'Kick user from server'
  },
  {
    label: '/list',
    value: '/list',
    description: 'List users'
  },
  {
    label: '/create',
    value: '/create',
    description: 'Create new channel'
  }
]

export default defineComponent({
    data() {
        return {
            options: ref(commandList),
            input: '',
        };
    },
    methods: {
        filterFunction(val: string, update: (callbackFn: () => void,  afterFn?: (ref: QSelect) => void) => void, abort: () => void) {
            if (val.charAt(0) != '/') {
                abort();
                return;
            }
            update(() => {
                const needle = val.toLowerCase();
                this.options = commandList.filter(v => v.value.toLowerCase().indexOf(needle) > -1);
            });
        },
        onSubmit(evt: Event | SubmitEvent){
          console.log(this.input)
          this.input = ''
        }
    },
    components: { CommandItem }
})
</script>

