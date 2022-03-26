<template>
  <div>
    <q-list padding>
        <template v-for="row in rows" :key="row.icon">
          <CategoryExpansion :icon="row.icon" :title="row.title" ></CategoryExpansion>
        </template>
    </q-list>

    <UserBlock></UserBlock>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryExpansion from './CategoryExpansion.vue';
import UserBlock from './UserBlock.vue'

export default defineComponent({
  name: 'ServerNavbar',
  props: {
  },
  data () {
    return {
      rows : [
        {
          icon : 'priority_high',
          title : 'Invites'
        },
        {
          icon : 'tag',
          title : 'Channels'
        },
        {
          icon : 'travel_explore',
          title : 'Public Channels'
        }
      ]
    }
  },
  components: { CategoryExpansion, UserBlock },


});
</script>
