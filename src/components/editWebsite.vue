<template>
    <div>
      <q-btn label="Edit Website" color="primary" unelevated @click="prompt = true" />
      <br>
      <br>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Edit website</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input label="Max Data Transfer" dense v-model="MaxDataTransfer" autofocus @keyup.enter="prompt = false" type="number"/>
          <q-input label="Max Products" dense v-model="maxProducts" autofocus @keyup.enter="prompt = false"  type="number"/>
          <br>
          <small  style="color:#777777">expiresAt: {{ expiresAtDate.getDate() + "/" +( expiresAtDate.getUTCMonth() + 1 ) + "/" + expiresAtDate.getFullYear() }}</small>
          <q-slider
            :model-value="mounthsPaid"
            @change="val => { mounthsPaid = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label
          />
          <q-input label="Payment" type="number" dense v-model="Payment" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat @click="submitAndEdit()" label="Edit" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>      
    </div>
</template>


<script>
import { ref } from 'vue'
import Connection_ from 'src/fetch/Connection'

export default {
  props: {
    website: String,  
    refresh: Function
  },
  computed: {
    expiresAtDate: function ( ) {
      let d = new Date()
      d.setMonth(d.getMonth() + this.mounthsPaid)
      return d
    },
  },
  setup () {
    return {
      mounthsPaid: ref(6),
      prompt: ref(false),
      MaxDataTransfer: ref(''),
      Payment: ref(""),
      maxProducts: ref(""),
    }
  },
  methods: {
    async submitAndEdit( ) {
      console.log(this.website)
      console.log( this.expiresAtDate )
      let conn = await Connection_.EditWebsite({
        website: this.website, Paid: this.Payment, expiresAt: this.expiresAtDate, mounthsPaid: this.mounthsPaid, MaxDataTransfer: this.MaxDataTransfer, maxProducts: this.maxProducts
      })
      this.refresh()
      console.log(conn)
    },

  }
}
</script>