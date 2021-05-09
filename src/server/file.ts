import HTTP from '../http'

export default class File {
  serverId: string
  path: string
  #http: HTTP

  constructor(serverId: string, path: string, http: HTTP) {
    this.serverId = serverId
    this.path = path
    this.#http = http
  }
}
