<template>
  <v-row justify="center" align="center">
    <Form v-if="user._id" :user="user" type="update" @onUpdateUser="onUpdateUser" />
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {

  computed: {
    ...mapState('users', ['user']),

    getId () {
      return this.$route.params.id
    }
  },

  async mounted () {
    await this.onFindOne()
  },

  methods: {
    ...mapActions({
      findOne: 'users/findOne',
      updateUser: 'users/updateUser'
    }),

    async onFindOne () {
      try {
        await this.findOne(this.getId)
      } catch (error) {
        alert(error)
      }
    },

    async onUpdateUser (user) {
      try {
        await this.updateUser({
          id: user._id,
          payload: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password
          }
        })
      } catch (error) {
        alert(error)
      }
    }

  }
}
</script>
