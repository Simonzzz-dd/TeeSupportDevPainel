<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <div class="q-pa-md">
        <q-list  padding class="rounded-borders text-primary">
          <router-link
          v-for="it_ in list_" 
          :key="it_.sections"
          :to="it_.link">
            <q-item
             
              clickable
              v-ripple
              v-if="it_.visible"
              :active="link === it_.link"
              @click="link = it_.link"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon :name="it_.icon" />
              </q-item-section>
              <q-item-section>{{ it_.section }}</q-item-section>
            </q-item>
          </router-link>
         
        </q-list>
      </div>
    </q-drawer>

    <q-page-container style="background-color: #ddddddd">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>

import Cookies from 'js-cookie'
import Connection_ from 'src/fetch/Connection'


import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    return {
      list_: [
        {
          link: "/",
          icon: "person",
          section: "My Profile",
          visible: true
        },
        {
          link: "/createNew",
          icon: "add",
          section: "Create new Website",
          visible: true
        },
        {
          link: "/staff",
          icon: "construction",
          section: "Staff",
          visible: ref(false)
        },
      ],
      link: ref('inbox'),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      generalManager: ref(false)
    }
  },
  async mounted ( ) {
    let authState = await Connection_.AuthState()
    if ( authState.sucess ) {
      console.log("authenticated")
      this.list_[2].visible = authState.sucess.generalManager
    } else {
       this.$router.push({ path: "/sign" })
    }  
  }
})
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  * {
    font-family: 'Montserrat Alternates', sans-serif;
  }
  p {
    color: $primary;
  }

  a {
    text-decoration: none;
    color: $primary;
    }
</style>