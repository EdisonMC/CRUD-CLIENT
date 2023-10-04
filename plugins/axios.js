export default function ({ $axios, store }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        'access-control-allow-origin': '*'
      }
    }
  })

  inject('api', api)
}
