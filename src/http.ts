/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export default class HTTP {
    #request: AxiosInstance

    constructor (email: string, password: string, apiUrl: string, config: AxiosRequestConfig) {
        this.#request = axios.create({
            baseURL: apiUrl,
            headers: {
                'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            ...config
        })

        this.#request.interceptors.response.use(
            response => response.data,
            error => {
                console.log(
                    `Request failed with status code ${error.response.status}`,
                    '\n',
                    error.response.data
                )
                return Promise.reject(error)
            }
        )
    }

    public async get(url: string): Promise<any> {
        return await this.#request.get(url)
    }

    public async delete(url: string): Promise<any> {
        return await this.#request.delete(url)
    }

    public async post(url: string, data: URLSearchParams = null): Promise<any> {
        return await this.#request.post(url, data)
    }

    public async put(url: string, data: URLSearchParams = null): Promise<any> {
        return await this.#request.put(url, data)
    }
}
