<template>
 <div class="q-pa-md">
   <h5 style="color: #777777" class="q-pl-sm"> Create New Website</h5>
   <form class="q-pr-md q-pl-md" action="">
      <q-input v-model="email" type="email" label="Email" />
      <q-input v-model="website" label="Website" />
      <q-input v-model="business" label="Business Type" />
      <q-input v-model="CompanyName" label="Company Name" />
      <br>
      <small style="color:#777777">Paid:</small>

      <q-input
        v-model.number="price"
        type="number"
        filled
        style="max-width: 200px"
      />

      <br>
      <small  style="color:#777777">expiresAt: {{ expiresAtDate.getDate() + "/" +( expiresAtDate.getUTCMonth() + 1 ) + "/" + expiresAtDate.getFullYear() }}</small>

      <q-slider
        :model-value="mounthsPaid"
        @change="val => { mounthsPaid = val }"
        :min="0"
        :max="48"
        :step="1"
        color="secondary"
        label
      />
      <q-input v-model="username" label="Username" />
      <br>
      <small class="q-mt-md" style="color:#777777">Permissions:</small>
      <div class="q-gutter-sm">
          <q-checkbox v-model="addProduts" label="Add Produts" color="secondary" />
          <q-checkbox v-model="generalManager" label="General Manager" color="red" />
          <q-checkbox v-model="handleRequests" label="Handle Requests" color="secondary" />
          <q-checkbox v-model="finances" label="Finances" color="secondary" />
      </div>
      <q-input v-model="password" type="password" label="Password" />
      <q-input v-model="password_confirm" type="password" label="Confirm Password" />
      <q-btn :loading="loading" color="secondary" class="q-mt-md" @click="submit()" unelevated :disable="passwordConfirmation" text-color="black" label="Submit" />
      <div class="errors_sucess">
        <p :class=" passwordConfirmation ? '' : 'isVisible'" style="color: red"> Password does not match </p>
        <p style="color: red"> {{ error }} </p>
        <p style="color: blue"> {{ sucess }} </p>
      </div>
      <br>
    <h5 style="color: #777777"> Websites </h5>
    <div class=" row items-start q-gutter-md">
      <WebsitesCreatedFrom
        v-for=" { email, username, CompanyName, website, expiresAt, isActive, isProduction, maxProducts, MaxDataTransfer, Paid } in createdWebs "
        :key="website" 
        :MaxDataTransfer="MaxDataTransfer"
        :maxProducts="maxProducts"
        :email="email"
        :username="username"
        :businessType="CompanyName"
        :website="website"
        :refresh="refresh"
        :expiresAt="expiresAt"
        :active="isActive"
        :production="isProduction"
        :Paid="Paid"
      />
    </div>
   </form>
 </div>
</template>

<script>
import { ref } from 'vue'
import WebsitesCreatedFrom from "../components/WebsitesIcreated.vue"
import Connection_ from 'src/fetch/Connection'


export default {
  components: {
    WebsitesCreatedFrom
  },  
  computed: {
    expiresAtDate: function ( ) {
      let d = new Date()
      d.setMonth(d.getMonth() + this.mounthsPaid)
      return d
    },
    passwordConfirmation (  ) {
      if (this.password == this.password_confirm && this.password.length > 0 ) {
        return false
      } else {
        return true
      }
    }
  },
  setup () {
    return {
      email: ref(''),
      website: ref(''),
      username: ref(""),
      business: ref(''),
      CompanyName: ref(''),
      mounthsPaid: ref(6),
      price: ref(8000),
      createdWebs: ref([]),
      addProduts: ref(true),
      finances: ref(true),
      handleRequests: ref(true),
      generalManager: ref(true),
      password_confirm: ref(""),
      password: ref(""),
      error: ref(""),
      sucess: ref(""),
      loading: ref(false)
    }
  },
  methods: {
    submit: async function () {
       let web = this.website.split(" ").reduce(( prev, curr ) => {
          return prev.concat(curr)
        },)
        this.loading = true
        let webdata = {
              website: web.toString().toLowerCase(),
              expiresAt: this.expiresAtDate.getTime(),
              mounthsPaid:this.mounthsPaid,
              Paid: this.price,
              Business: this.business,
              CompanyName: this.CompanyName,

              email:  this.email, 
              password: this.password,
              username: this.username,

              permissions: {
                addProduts: this.addProduts,
                manageMoney: this.finances,
                handleRequests: this.handleRequests,
                Manager: this.handleRequests,
              }
            }
        let CreatedWeb = await Connection_.AddWebsite( webdata )
        if ( CreatedWeb.sucess ) {
          let website = await Connection_.GetWebsites()
          this.sucess = CreatedWeb.sucess
          this.createdWebs = website.sucess
          this.loading = false
          
        } else {
            this.error = CreatedWeb.err
            this.loading = false
        }
       
    },
    refresh: async function (  ) {
      let data = await Connection_.GetWebsites()
      this.createdWebs = data.sucess
    }
  },
  async mounted () {
      let data = await Connection_.GetWebsites()
      this.createdWebs = data.sucess
  }
}
</script>
<style lang="scss" scoped>
  .errors_sucess {
    height: 3rem;
    padding-top: 1rem;
  }
  .isVisible {
    display: none;
  }
</style>