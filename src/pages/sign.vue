<template>
  <div class="sign q-pa-md">

    <q-card class="my-card ">
        <h5 class="text-secondary q-ml-md">Zimmo Sign</h5>
      <q-card-section>
            <q-input v-model="Email" label="Email" />
            <q-input v-model="Password" type="password" label="Password" />
            <q-btn @click="Submit()" color="secondary" class="q-mt-md" style="width:6rem" label="Login" :loading="false" />
            <div class="errors">
                <p class="text-red err"></p> <p class="text-blue sucess"></p>
            </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'
import Cookies from 'js-cookie'
import Connection_ from 'src/fetch/Connection'


export default {
  setup () {
    return {
        Email: ref(''),
        Password: ref(''),     
    }
  },
  mounted ( ) {

   
    //   if ( Cookies.get() == "true" ) this.$router.push({ path: "/" })
  },

  methods: {
      async Submit ( ) {
            let Connection = await Connection_.Sign(this.Email, this.Password)
            if ( Connection.sucess ) {
                document.querySelector(".sucess").textContent = Connection.sucess.msg
                document.querySelector(".err").textContent = ""
                let authState = await Connection_.AuthState()
                console.log(authState)
                if ( authState.sucess.authenticated == true ) window.location.replace(window.location.protocol + '//' + window.location.host)
            } else {
                document.querySelector(".sucess").textContent =""
                document.querySelector(".err").textContent = Connection.err.msg  
            }
      }
  }
}
</script>

<style lang="scss" scoped>

    .sign {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #efefef;
    }

    .my-card {
        width: 100%;
        max-width: 450px;
    }

    .errors {
        padding: 1rem;
        padding-left: 0;
        height: 4rem;
        color: red;
    }
</style>    