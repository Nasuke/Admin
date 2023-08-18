
import hyRequest from '..'

export function getUserList() {
  return hyRequest.post({
    url: "/users/list",
    data: {
      offset: 0,
      size: 100
    }
  })
}
