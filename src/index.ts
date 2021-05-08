import HTTP from './http'

export default class Dathost {
    #http: HTTP

    constructor (email: string, password: string, apiUrl = 'https://dathost.net/api/0.1/') {
        this.#http = new HTTP(email, password, apiUrl)
    }
}
