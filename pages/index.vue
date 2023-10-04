<template>
  <v-row justify="center" align="center">
    <Form :users="users" type="create" @onCreateUser="onCreateUser" @onDeleteUser="onDeleteUser" />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'IndexPage',

  computed: {
    ...mapState('users', ['user', 'users'])
  },

  mounted () {
    this.onFindAllUsers()
  },

  methods: {
    ...mapActions({
      findAllUsers: 'users/findAllUsers',
      deleteUser: 'users/deleteUser',
      createUser: 'users/createUser'
    }),

    async onFindAllUsers () {
      try {
        await this.findAllUsers()
      } catch (error) {
        alert(error)
      }
    },

    async onCreateUser (user) {
      try {
        await this.createUser({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password
        })
        this.onFindAllUsers()
      } catch (error) {
        alert(error)
      }
    },

    onDeleteUser (id) {
      this.$dialog({
        title: 'Are you sure you want to delete this item?',
        type: 'warn',
        click: async () => {
          await this.confirmDeleteItem(id)
        }
      })
    },

    async confirmDeleteItem (id) {
      try {
        await this.deleteUser(id)
        this.onFindAllUsers()
      } catch (error) {
        alert(error)
      }
    }

  }
}
</script>
