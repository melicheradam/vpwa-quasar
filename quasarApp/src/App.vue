<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from './store';

export default defineComponent({
  name: 'App',
  store: useStore(),
});

</script>
