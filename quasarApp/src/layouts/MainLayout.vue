<template>

  <q-layout view="hHh lpR lFr">



    <q-header class="bg-primary text-white" height-hint="98">

      <q-toolbar>

        <q-btn dense flat round  @click="toggleLeftDrawer">
          <q-avatar v-if="leftDrawerOpen">
            <q-icon name="chevron_left"/>
          </q-avatar>
          <q-avatar v-else>
            <q-icon name="chevron_right"/>
          </q-avatar>
        </q-btn>




        <q-toolbar-title>

          <q-avatar>

            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">

          </q-avatar>

          Title

        </q-toolbar-title>



        <q-btn dense flat round  @click="toggleRightDrawer">
          <q-avatar v-if="rightDrawerOpen">
            <q-icon name="chevron_right"/>
          </q-avatar>
          <q-avatar v-else>
            <q-icon name="chevron_left"/>
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

      <!--<router-view /> -->

      <MessagesContainer></MessagesContainer>

    </q-page-container>



    <q-footer class="text-white">

      <InputText></InputText>

    </q-footer>

  </q-layout>

</template>



<script>

import { ref } from 'vue'

import Navbar from 'src/components/UserNavbarComponents/Navbar.vue'
import InputText from 'src/components/TextInputComponents/InputText.vue'
import MessagesContainer from 'src/components/MessageComponents/MessagesContainer.vue'
import ServerNavbar from 'src/components/ServerNavbarComponents/ServerNavbar.vue'


export default {

  setup () {

    const leftDrawerOpen = ref(false)

    const rightDrawerOpen = ref(false)



    return {

      leftDrawerOpen,

      toggleLeftDrawer () {

        leftDrawerOpen.value = !leftDrawerOpen.value

      },



      rightDrawerOpen,

      toggleRightDrawer () {

        rightDrawerOpen.value = !rightDrawerOpen.value

      }

    }

  },

  components: { Navbar, MessagesContainer, InputText, ServerNavbar },

}

</script>

