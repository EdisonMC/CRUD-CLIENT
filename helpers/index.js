export function objectDeepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}
