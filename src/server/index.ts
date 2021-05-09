import HTTP from '../http'

import { IServer } from '../interfaces/server'
import { IMetrics } from '../interfaces/metrics'

import ServerSettings from '../settings/server'

export default class Server {
    serverId: string
    #http: HTTP

    constructor(serverId: string, http: HTTP) {
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

    public async metrics(): Promise<IMetrics> {
        return <IMetrics>await this.#http.get(`/game-servers/${this.serverId}/metrics`)
    }

    public async update(settings: ServerSettings): Promise<void> {
        await this.#http.put(`/game-servers/${this.serverId}`, settings.payload)
    }
}
