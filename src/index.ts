import HTTP from './http'

import { IAccount } from './interfaces/account'
import { IServer } from './interfaces/server'

import Server from './server'


export default class Dathost {
    #http: HTTP

    constructor (email: string, password: string, apiUrl = 'https://dathost.net/api/0.1/') {
        this.#http = new HTTP(email, password, apiUrl)
    }

    public async account(): Promise<IAccount> {
        return <IAccount>await this.#http.get('/account')
    }

    public async* domains(): AsyncGenerator<string> {
        const domains: Array<string> = await this.#http.get('/custom-domains')

        for (const element of domains) {
            yield element['name']
        }
    }

    public async* servers(): AsyncGenerator<[IServer, Server]> {
        const servers: Array<unknown> = await this.#http.get('/game-servers')

        for (const server of servers) {
            yield [<IServer>server, new Server(server['id'], this.#http)]
        }
    }
}
