<template>
  <div>
    <q-list padding bordered class="rounded-borders">
      <template v-for="row in rows" :key="row.icon">
        <CategoryExpansion :icon="row.icon" :title="row.title" ></CategoryExpansion>
      </template>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoryExpansion from './CategoryExpansion.vue';

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
          title : 'Servers'
        },
        {
          icon : 'travel_explore',
          title : 'Public Servers'
        }
      ]
    }
  },
  components: { CategoryExpansion },


});
</script>
