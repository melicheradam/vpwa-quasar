
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
import { QSelect, useQuasar } from 'quasar';
import { ref, defineComponent } from 'vue';
import CommandItem from './CommandItem.vue';
import { ChannelModel, MessageModel } from 'components/models'
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

]

export default defineComponent({

  data () {
    return {
      options: ref(commandList),
      select: ref('select'),
      input: '',
      loading: false,
      $q: useQuasar(),

    };
  },
  $refs!: {
    select: ref('select'),
  },
  computed: {
    ...mapGetters('channels', {
      currentChannel: 'activeChannelModel'
    }),
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
      const activeChannel = this.currentChannel as ChannelModel
      if (this.input.charAt(0) == '/') {
        let splitted = this.input.split(' ')
        console.log(splitted)
        switch(splitted[0]) {
          case('/list'):
            this.$store.commit('app/EXPAND_RIGHT_DRAWER')
            break
          case('/quit'):
            if(activeChannel.ownerId !== this.$store.state.auth.user?.id) {
              this.$q.notify({
              type: 'negative',
              message: 'You are not the owner of this channel'
              })
            }
            else {
              //this.$store.dispatch('channesl/delete', {channel : this.activeChannel.id})
            }
            break
          case('/invite'): {
            const activeChannelId = Number(activeChannel.id)
            if(activeChannel.private && activeChannel?.ownerId !== this.$store.state.auth.user?.id) {
              this.$q.notify({
              type: 'negative',
              message: 'This channel is private and you are not the owner'
              })
            }
            else if(this.$store.state.channels.users[activeChannelId].some(user => user.nickName === splitted[1])) {
              this.$q.notify({
              type: 'negative',
              message: 'User is already in channel'
              })
            }
            break
          }
          default:
              this.$q.notify({
              type: 'negative',
              message: 'Command doesn\'t exist'
              })
        }
      }
      else {
        this.loading = true
        const activeChannel = this.currentChannel as ChannelModel
        await this.addMessage({ channel: activeChannel.id, message: this.input })
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

