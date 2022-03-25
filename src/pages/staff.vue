<template>
 <div class="q-pa-md">
   <h5 style="color: #777777" class="q-pl-sm"> Create New User</h5>
    <Create :fetchUsersAgain="fetchUsersAgain"/>
    <h5 style="color: #777777" class="q-pl-sm"> Staff </h5>
   <form class="q-pr-md q-pl-md" action="">
    <div class=" row items-start q-gutter-md">
      <UsersCreated
        v-for=" ({ email, username, permissions, _id } ) in createdUsersArray "
        :fetchUsersAgain="fetchUsersAgain"
        :key="email" 
        :email="email"
        :username="username"
        :permissions="permissions"
        :id="_id"
      />
    </div>
   </form>
 </div>
</template>

<script>
import { ref } from 'vue'
import UsersCreated from "../components/UsersCreated.vue"
import Create from "../components/CreateUser.vue"
import Connection_ from 'src/fetch/Connection'




export default {
  components: {
    UsersCreated, Create
  },
  setup () {
    return {
      createdUsersArray: ref([]),
      
    }
  },
  methods: {
    async fetchUsersAgain () {
      let listOfUsers = await Connection_.FetchUsers()
      if ( listOfUsers.sucess ) {
            this.createdUsersArray = listOfUsers.sucess
            console.log(this.createdUsersArray)
      }
    },

  }, 
  async mounted () {
      let listOfUsers = await Connection_.FetchUsers()
      console.log( listOfUsers )
      if ( listOfUsers.sucess ) {
            this.createdUsersArray = listOfUsers.sucess
            console.log(this.createdUsersArray)
      }
    }
}
</script>

<style>

</style>