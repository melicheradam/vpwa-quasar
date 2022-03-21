<!--
<template>
  <q-input dark color="primary" class="q-px-md" borderless v-model="input" placeholder="Type a message or command">
    <template v-slot:append>
      <q-btn round dense color="grey-5" flat icon="send" />
    </template>
    <template v-slot:prepend>
      <q-btn round dense color="grey-5" flat icon="code" />
    </template>
  </q-input>
</template>
-->
<template>
      <q-select
        dark
        class="q-px-md"
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
        <template v-slot:append>
          <q-btn round dense color="grey-5" flat icon="send" />
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
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

const commandList = [
        'command1', 'command2', 'command3'
      ]

export default defineComponent({

  data() {
    return {
      options: ref(commandList),
      input: '',
    }
  },

  methods:{
    filterFunction (val: string, update: (callbackFn: () => void, afterFn?: () => void) => void, abort: () => void) {
        if (val.charAt(0) != '/') {
          abort()
          return
        }

        update(() => {
          const needle = val.substring(1).toLowerCase()
          this.options = commandList.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }
  },
})
</script>

