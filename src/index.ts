import HTTP from './http'

import { IAccount } from './interfaces/account'


export default class Dathost {
    #http: HTTP

    constructor (email: string, password: string, apiUrl = 'https://dathost.net/api/0.1/') {
        this.#http = new HTTP(email, password, apiUrl)
    }

    public async account(): Promise<IAccount> {
        return <IAccount>await this.#http.get('/account')
    }
}
