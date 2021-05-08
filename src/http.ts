import axios, { AxiosInstance } from 'axios'

export default class HTTP {
    #request: AxiosInstance

    constructor (email: string, password: string, apiUrl: string) {
        this.#request = axios.create({
            baseURL: apiUrl,
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`
            }
        })
    }
}
