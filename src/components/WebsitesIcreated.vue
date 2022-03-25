<template>
  <q-card flat bordered class="my-card bg-grey-1">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <p style="margin-top: 0; margin-bottom: 0"> Username: {{ username }}</p>
            <p style="margin-top: 0; margin-bottom: 0">Company Name: {{ businessType }}</p>
            <p style="margin-top: 0; margin-bottom: 0">Email: {{ email }}</p>
            <p style="margin-top: 0; margin-bottom: 0">ExpiresAt: {{ expiresAt }}</p>
            <p style="margin-top: 0; margin-bottom: 0">Days Left: {{ daysLeft_ }}</p>          
            <p style="margin-top: 0; margin-bottom: 0">Website/ApiKey: {{ website }}</p>
            <p style="margin-top: 0; margin-bottom: 0">MaxDataTransfer: {{MaxDataTransfer}}MB</p>
            <p style="margin-top: 0; margin-bottom: 0">maxProducts: {{ maxProducts }}</p>
            <p style="margin-top: 0; margin-bottom: 0">Paid: {{ Paid }}Mzn</p>
          </div>

          <div class="col-auto">
            <q-btn color="grey-7" round flat icon="more_vert">
              <q-menu cover auto-close>
                <q-list>
                  <q-item clickable @click="Trash()">
                    <q-item-section>Remove User</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <EditWebsiteVue :website="website" :refresh="refresh" />
        <div>State:</div>
            <q-toggle
              label="Is Production"
              color="Primary"
              v-model="isProduction"
              @input="ToggleProduction"
              :ref="ToggleProduction"
            />
            <q-toggle
              @input="ToggleIsActive"
              :ref="ToggleIsActive"
              label="Is Active"
              color="Primary"
              v-model="isActive"
            />

        <div class="err"> {{ err }} </div>
      </q-card-section>
      
    </q-card>

</template>

<script>



import { ref } from "vue"
import Connection_ from 'src/fetch/Connection'
import EditWebsiteVue from './editWebsite.vue'


export default {
    components: {
      EditWebsiteVue   
    },
    props: {
      Paid: Number,
      MaxDataTransfer: Number,
      maxProducts: Number,
      expiresAt: String,
      username: String,
      businessType: String,
      email: String,
      website: String,
      refresh: Function,
      active: Boolean,
      production: Boolean
    },
    setup (props) {
        let D = new Date(props.expiresAt)
        let daysLeft = Math.floor((D.getTime() - Date.now()) /(1000*60*60*24))
        return {
          isProduction: ref(props.production),
          isActive: ref(props.active),
          err: ref(""),
          daysLeft_: ref(daysLeft)
        }
    },
    methods : {
      Trash: async function ( ) {
        let deleted = await Connection_.DeleteWebsite(this.website)
        if ( deleted.sucess ) {
          this.refresh()
        }    
      },
      ToggleProduction: async function ( ) {
        let isProd = await Connection_.isProduction(this.website, this.isProduction)
        if ( isProd.sucess ) {
          console.log("changed")
          this.refresh()
        }  
      },
      ToggleIsActive: async function ( ) {
        let isActive = await Connection_.isActive_(this.website, this.isActive)
        if ( isActive.sucess ) {
          console.log("Is active") 
          this.refresh   
        }
      }
    }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 350px
  min-width: 48%

  .err
    padding-top: 1rem
    color: red 
</style>