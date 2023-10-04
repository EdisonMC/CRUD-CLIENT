const BASE_URL = 'http://localhost:8080'

export default {
  async findAllUsers ({ commit }) {
    const { data } = await this.$api.get(
      `${BASE_URL}/users`
    )

    commit('SET_USERS', data)
  },

  async findOne ({ commit }, id) {
    const { data } = await this.$api.get(`${BASE_URL}/users/${id}`)
    commit('SET_USER', data)
  },

  async updateUser ({ commit }, { id, payload }) {
    await this.$api.put(`${BASE_URL}/users/${id}`, payload)
  },

  async createUser ({ commit }, payload) {
    await this.$api.post(`${BASE_URL}/users`, payload)
  },

  async deleteUser ({ commit }, id) {
    await this.$api.delete(`${BASE_URL}/users/${id}`)
  }
}
