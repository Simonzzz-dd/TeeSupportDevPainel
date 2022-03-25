<template>
 
      <q-btn 
        color="primary" 
        label="Create"
        unelevated
        class="q-ml-sm "
        padding="lg"
   
      >
        <q-popup-proxy>
          <q-card class="my-card">
            <q-card-section>
              <q-input v-model="username"  label="Username" /> 
              <q-input v-model="email_" type="email" label="Email" /> 
              <q-input v-model="password" type="password" label="Password" /> 
              <q-input v-model="password_confirm" type="password" label="Password Confirm" /> 
              <p class="q-pt-md text-subtitle1">Permissions</p>
              <div class="q-gutter-sm">
                <q-checkbox v-model="Finances_" label="Finances" color="secondary" />
                <q-checkbox v-model="GeneralManager_" label="GeneralManager" color="red" />
                <q-checkbox v-model="WebCreation_" label="WebCreation" color="secondary" />
              </div>

              <q-btn :loading="loading" color="primary" @click="createEmail_( )" class="q-mt-md" label="Create" :disable="passwordConfirmation" />
              <div style="height: 4rem; padding-top: 1rem">
                <p class="text-red">{{ error_ }}</p> <p class="text-blue">{{ sucess }}</p> 
                <p :class=" passwordConfirmation ? '' : 'isVisible'"> <span class="text-red">Passoword does'nt much </span></p>
              </div>
            </q-card-section>
          </q-card>
        </q-popup-proxy>
      </q-btn>
    

</template>

<script>
import { ref } from 'vue'
import Connection_ from 'src/fetch/Connection'
export default {
    props: {
      fetchUsersAgain: Function
    },
    methods: {
      createEmail_: async function( ) {
        
        let ToggleLoading= ( ) => this.loading = !this.loading
        ToggleLoading()

        let developerData = {
          email:  this.email_, 
          password: this.password,
          username: this.username,
          permissions: {
              createWebsite: this.WebCreation_,
              generalManager: this.GeneralManager_,
              finances: this.Finances_
          }
        }

        let createdDev = await Connection_.createDeveloper( developerData )
        if ( createdDev.sucess ) {
          this.sucess = createdDev.sucess
          this.fetchUsersAgain()
          setTimeout(()=>ToggleLoading(),300)
        } else if ( createdDev.err ) {
          this.fetchUsersAgain()
          this.err = createdDev.err
          setTimeout(()=>ToggleLoading(),300)
        } else{ 
          this.err = "err"
          setTimeout(()=>ToggleLoading(),300)
        }
        
      }
    },
    setup () {
        return {
          email_: ref(''),
          Finances_: ref(true),
          GeneralManager_: ref(false),
          WebCreation_: ref(false),
          password:  ref(""),
          username: ref(""),
          error_: ref(""),
          sucess: ref(""),
          password_confirm: ref(""),
          loading: ref(false)
        }
    },
    computed: {
      passwordConfirmation (  ) {
        if (this.password == this.password_confirm && this.password.length > 0 ) {
          return false
        } else {
          return true
        }
      }
    }

}
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
    min-width: 48%;
  max-width: 250px
}

.isVisible {
  display: none;
  
}
</style>