<template>
  <q-layout view="hHh lpR lFr">
    <q-header class="bg-primary text-white" height-hint="98" style="height:50px">
      <q-toolbar>
        <q-btn dense flat round @click="toggleLeftDrawer">
          <q-avatar v-if="leftDrawerOpen">
            <q-icon name="chevron_left" />
          </q-avatar>
          <q-avatar v-else>
            <q-icon name="chevron_right" />
          </q-avatar>
        </q-btn>

        <q-toolbar-title>
          <q-avatar class="q-mx-md">
            <q-icon size="md" name="speaker_notes"/>
          </q-avatar>IRC
        </q-toolbar-title>

        <q-btn dense flat round @click="toggleRightDrawer">
          <q-avatar v-if="rightDrawerOpen">
            <q-icon name="chevron_right" />
          </q-avatar>
          <q-avatar v-else>
            <q-icon name="chevron_left" />
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <ServerNavbar></ServerNavbar>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <!-- drawer content -->
      <Navbar></Navbar>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="text-white" style="height:50px">
      <FooterInput></FooterInput>
    </q-footer>
  </q-layout>
</template>



<script lang="ts">

import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Navbar from 'src/components/UserNavbarComponents/Navbar.vue'
import FooterInput from 'src/components/FooterInputComponents/FooterInput.vue'
import ServerNavbar from 'src/components/ServerNavbarComponents/ServerNavbar.vue'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: false,
    }
  },
  computed: {
    ...mapGetters('channels', {
      channels: 'joinedChannels',
      lastMessageOf: 'lastMessageOf'
    }),
    activeChannel () {
      return this.$store.state.channels.active
    }
  },
  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    toggleRightDrawer () {
      this.rightDrawerOpen = !this.rightDrawerOpen
    },
  },
  components: { Navbar, FooterInput, ServerNavbar },
})

</script>

