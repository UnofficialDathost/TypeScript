import HTTP from './http'
import { AxiosRequestConfig } from 'axios'

import { IAccount } from './interfaces/account'
import { IServer } from './interfaces/server'
import { IDomain } from './interfaces/domain'

import ServerSettings from './settings/server'

import Server from './server'
import Match from './match'


export default class Dathost {
    #http: HTTP

    constructor (email: string, password: string, apiUrl = 'https://dathost.net/api/0.1/', axiosConfig: AxiosRequestConfig = {}) {
        this.#http = new HTTP(email, password, apiUrl, axiosConfig)
    }

    public async account(): Promise<IAccount> {
        return <IAccount>await this.#http.get('/account')
    }

    public async* domains(): AsyncGenerator<string> {
        const domains: Array<IDomain> = await this.#http.get('/custom-domains')

        for (const element of domains) {
            yield element.name
        }
    }

    public server (serverId: string): Server {
        return new Server(serverId, this.#http)
    }

    public match(matchId: string): Match {
      return new Match(matchId, this.#http)
    }

    public async* servers(): AsyncGenerator<[IServer, Server]> {
        const servers: Array<IServer> = await this.#http.get('/game-servers')

        for (const server of servers) {
            yield [server, this.server(server.id)]
        }
    }

    public async createServer(settings: ServerSettings): Promise<[IServer, Server]> {
        const server: IServer = await this.#http.post('/game-servers', settings.payload)
        return [server, this.server(server.id)]
    }
}
