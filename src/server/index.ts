import HTTP from '../http'

import { IServer } from '../interfaces/server'

export default class Server {
    #http
    serverId: string

    constructor (serverId: string, http: HTTP) {
        this.#http = http
        this.serverId = serverId
    }

    public async get(): Promise<IServer> {
        return <IServer>await this.#http.get(`/game-servers/${this.serverId}`)
    }
}
