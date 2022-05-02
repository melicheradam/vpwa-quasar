
<template>
  <q-form
    @submit="onSubmit"
    autofocus
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
    <q-select
      @keydown.enter="onSubmit"
      ref="select"
      type="text"
      dark
      class="q-px-md"
      name="message"
      placeholder="Type a message or command"
      borderless
      v-model="input"
      @input-value="setModel"
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
        <q-btn round dense color="grey-5" flat icon="code" @click="toggleCommandList" />
      </template>
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">No results</q-item-section>
        </q-item>
      </template>
    </q-select>
  </q-form>
</template>

<script lang="ts">
import { QSelect } from 'quasar';
import { ref, defineComponent } from 'vue';
import CommandItem from './CommandItem.vue';
import { MessageModel } from 'components/models'
import { mapActions, mapGetters, mapMutations } from 'vuex'

interface CommandObj {
  label: string,
  value: string,
  description: string,
}
const commandList: CommandObj[] = [
  {
    label: '/quit',
    value: '/quit',
    description: 'Delete channel'
  },
  {
    label: '/cancel',
    value: '/cancel',
    description: 'Exit channel'
  },
  {
    label: '/join',
    value: '/join',
    description: 'Join or create channel'
  },
  {
    label: '/invite',
    value: '/invite',
    description: 'Invite user to this channel'
  },
  {
    label: '/revoke',
    value: '/revoke',
    description: 'Remove user from server'
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

  data () {
    return {
      options: ref(commandList),
      select: ref('select'),
      input: '',
      loading: false

    };
  },
  $refs!: {
    select: ref('select'),
  },
  computed: {
    activeChannel (): number | null {
      return this.$store.state.channels.active
    },
    channelID: {
      get (): number {
        return Number(this.$route.params.channelID)
      },
      set () {
        //
      }
    }
  },

  methods: {
    filterFunction (val: string, update: (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void, abort: () => void) {
      if (val.charAt(0) != '/') {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.options = commandList.filter(v => v.value.toLowerCase().indexOf(needle) > -1);
      });
    },
    toggleCommandList () {
      const item = this.$refs.select as QSelect
      item.updateInputValue('/')
    },
    async onSubmit () {
      //here we will post message
      //and store it to vuex store
      // if first character is command execute it against API
      if (this.input.charAt(0) == '/') {
        //
      }
      else {
        this.loading = true
        await this.addMessage({ channel: this.activeChannel, message: this.input })
        this.loading = false
      }
      const item = this.$refs.select as QSelect
      item.updateInputValue('')
    },
    ...mapActions('channels', ['addMessage']),
    setModel (val: string) {
      this.input = val
    },
  },
  components: { CommandItem }
})
</script>

