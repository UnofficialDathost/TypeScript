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

    public async delete(): Promise<void> {
        await this.#http.delete(`/game-servers/${this.serverId}`)
    }

    public async start(allowHostReassignment: boolean = null): Promise<void> {
        let payload: URLSearchParams

        if (allowHostReassignment != null) {
            payload = new URLSearchParams()
            payload.append('allow_host_reassignment', allowHostReassignment.toString())
        } else
            payload = null

        await this.#http.post(`/game-servers/${this.serverId}/start`, payload)
    }

    public async reset(): Promise<void> {
        await this.#http.post(`/game-servers/${this.serverId}/reset`)
    }

    public async stop(): Promise<void> {
        await this.#http.post(`/game-servers/${this.serverId}/stop`)
    }
}
