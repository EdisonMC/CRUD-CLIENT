<!-- Please remove this file from your project -->
<template>
  <v-col cols="8" class="d-flex flex-column">
    <v-row>
      <v-col cols="12">
        <v-card elevation="0" class="d-flex justify-center">
          <h1>CRUD</h1>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-text-field
          v-model="form.firstName"
          label="Firts Name"
          outlined
          light
          class="ma-2"
        />

        <v-text-field
          v-model="form.lastName"
          label="Last Name"
          outlined
          light
          class="ma-2"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex">
        <v-text-field
          v-model="form.email"
          type="email"
          label="Email"
          outlined
          light
          class="ma-2"
        />

        <v-text-field
          v-model="form.password"
          type="password"
          label="Password"
          outlined
          light
          class="ma-2"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        light
        @click="onCreateOurUpdate()"
      >
        {{ isCreate ? 'CREATE' : 'UPDATE' }}
      </v-btn>
    </v-row>
    <v-row v-if="users.length">
      <v-col cols="12">
        <v-list>
          <v-row>
            <v-col>
              <h2 class="mx-4"> Users </h2>
            </v-col>
          </v-row>
          <v-list-item v-for="item in users" :key="item._id">
            <v-row>
              <v-col cols="11">
                <v-list-item-title> {{ item.firstName }} {{ item.lastName }}</v-list-item-title>
              </v-col>
              <v-col cols="1" class="d-flex justify-end">
                <v-btn icon :to="`user/${item._id}`">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn icon @click="onDeleteUser(item._id)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { objectDeepClone } from '~/helpers'
export default {
  name: 'CrudUser',

  props: {
    users: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    user: {
      type: Object,
      required: false,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  },

  data: () => ({
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }),

  computed: {
    isCreate () {
      return this.type === 'create'
    }
  },

  watch: {
    user (value) {
      this.form = objectDeepClone(value)
    }
  },

  mounted () {
    if (!this.isCreate) {
      this.form = objectDeepClone(this.user)
    }
  },

  methods: {
    onCreateOurUpdate () {
      if (this.isCreate) {
        this.onCreateUSer()
      } else {
        this.onUpdateUser()
      }
    },

    onCreateUSer () {
      this.$emit('onCreateUser', this.form)
    },

    onUpdateUser () {
      this.$emit('onUpdateUser', this.form)
    },

    onDeleteUser (id) {
      this.$emit('onDeleteUser', id)
    }
  }
}
</script>
