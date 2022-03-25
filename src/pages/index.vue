<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-cardtwo" flat bordered>


      <q-card-section>
        <div class="text-overline text-secondary">General Manager</div>
        
        <div class="text-h5 q-mt-sm q-mb-xs">{{ username }}</div>
        <div class="text-caption text-grey">
          Email: {{ email }}
        </div>
        <p class="myProgects text-primary" style="margin-top: 0; margin-bottom: 1rem"> Welcome to our stupid painel </p>
        <div class=" row items-start q-gutter-md">

        </div>
      </q-card-section>

  
    </q-card>
  </div>
</template>
<script>

import { ref } from "vue"
import Connection_ from 'src/fetch/Connection'


export default {
  components: {
 
  },
  setup () {
    return {

      username: ref("empty"),
      email: ref("empty")
    }
  },
  async mounted ( ) {
        const response = await Connection_.GetUserData()
        if ( response.sucess ) {
            let { email, username } = response.sucess 
            this.email = email
            this.username = username  
        } else {
          console.log( response )
        }
  }, methods: {

  }
}
</script>

<style lang="scss" scoped>
  .my-cardtwo {
    width: 100%;
  }
  .myProgects {
    border-top: solid 1px #dddddd;
    padding-top: 1rem;
  }
</style>
