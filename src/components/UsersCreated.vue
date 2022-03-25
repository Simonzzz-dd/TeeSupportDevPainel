<template>
  <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ username }}</div>
            <p class="text">{{ email }}</p>
            <p class="text-subtitle2" style="margin-bottom:0">Permissions:</p>
            <p v-if="permissions.createWebsite" style="margin-bottom:0"> Manage Websites </p>
            <p v-if="permissions.finances" style="margin-bottom:0"> Manage Finances </p>
            <p v-if="permissions.generalManager" style="margin-bottom:0"> General Manager </p>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="deleteUser()">
                    <q-item-section>Remove User</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn 
          push 
          color="primary" 
          padding="0"
          label="Update"
          flat
          text-color="secondary"
          no-caps
        >
          <q-popup-proxy>
            <q-card class="my-card">
              <q-card-section>
                <q-input v-model="email_" label="Email" /> 
                <q-input v-model="username_" label="Username" /> 
                <p class="q-pt-md text-subtitle1">Permissions</p>
                <div class="q-gutter-sm">
                  <q-checkbox v-model="Finances_" label="Finances" color="secondary" />
                  <q-checkbox v-model="GeneralManager_" label="GeneralManager" color="red" />
                  <q-checkbox v-model="WebCreation_" label="WebCreation" color="secondary" />
                </div>
                <div>
                <q-btn @click="submit" :loading="loading" color="primary" class="q-mt-md" label="Update" />
                </div>
              </q-card-section>
            </q-card>
          </q-popup-proxy>
        </q-btn>
      </q-card-section>

    </q-card>

</template>

<script>
import Connection_ from "../fetch/Connection"
import { ref } from 'vue'



export default {
    props: {
        id: String,
        username: String,
        email: String,
        permissions: Object,
        fetchUsersAgain: Function
    },
    setup (props) {
      return {
        email_: ref( props.email ),
        username_: ref( props.username ),
        Finances_: ref( props.permissions.finances ),
        GeneralManager_: ref( props.permissions.generalManager ),
        WebCreation_: ref( props.permissions.createWebsite ),
        loading: ref(false)
      }
    },
    methods: {
      async submit ( ) {
        let ToggleLoading = ( ) => this.loading = !this.loading
        ToggleLoading()
        let UserData = {
            id: this.id,
            email: this.email_,
            username: this.username_,
            finances: this.Finances_,
            generalManager: this.GeneralManager_,
            createWebsite: this.WebCreation_
        }
        let updateDeveloper = await Connection_.UpdateDeveloper( UserData )
        if ( updateDeveloper.sucess ) {
          setTimeout(( ) => ToggleLoading() , 300)
          this.fetchUsersAgain()
        } else {
           setTimeout(()=>ToggleLoading(),300)
           console.log( updateDeveloper )
        }
      
      },
      async deleteUser ( ) {
        let deleteDeveloper_ = await Connection_.deleteDev(this.id)

        if ( deleteDeveloper_.sucess ) {
          this.fetchUsersAgain()
        }
      }
    }

}
</script>

<style lang="sass" scoped>
.my-card
  width: 350px
  min-width: 48%
</style>