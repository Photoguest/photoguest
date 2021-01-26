export function checkContains(arr, value, param="token") {
  return arr.some(item => item[param] === value)
}