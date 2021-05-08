import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'

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

    private handleResp(res: AxiosResponse): Promise<unknown> {
        return res.data
    }

    public async get(url: string, config: AxiosRequestConfig = null): Promise<unknown> {
        return this.handleResp(await this.#request.get(url, config))
    }

    public async delete(url: string, config: AxiosRequestConfig = null): Promise<unknown> {
        return this.handleResp(await this.#request.delete(url, config))
    }

    public async post(url: string, config: AxiosRequestConfig = null): Promise<unknown> {
        return this.handleResp(await this.#request.post(url, config))
    }

    public async put(url: string, config: AxiosRequestConfig = null): Promise<unknown> {
        return this.handleResp(await this.#request.put(url, config))
    }
}
