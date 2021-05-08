/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from 'axios'

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

    private handleResp(res: AxiosResponse): Promise<any> {
        return res.data
    }

    public async get(url: string): Promise<any> {
        return this.handleResp(await this.#request.get(url))
    }

    public async delete(url: string): Promise<any> {
        return this.handleResp(await this.#request.delete(url))
    }

    public async post(url: string, data: unknown): Promise<any> {
        return this.handleResp(await this.#request.post(url, data))
    }

    public async put(url: string, data: unknown): Promise<any> {
        return this.handleResp(await this.#request.put(url, data))
    }
}
