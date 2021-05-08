import HTTP from '../http'

export default class Server {
    #http
    serverId: string

    constructor (serverId: string, http: HTTP) {
        this.#http = http
        this.serverId = serverId
    }
}
