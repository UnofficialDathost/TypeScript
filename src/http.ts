/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import path from 'path/posix'
import FormData from './helpers/formData'

export default class HTTP {
  private request: AxiosInstance
  private uploadUrl: string

  constructor (email: string, password: string, apiUrl: string, uploadUrl: string, config: AxiosRequestConfig) {
    this.request = axios.create({
      baseURL: apiUrl,
      headers: {
          'Authorization': `Basic ${Buffer.from(`${email}:${password}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      ...config
    })

    this.request.interceptors.response.use(
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

    this.uploadUrl = uploadUrl
  }

  public async get(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return await this.request.get(url, config)
  }

  public async delete(url: string, config: AxiosRequestConfig = {}): Promise<any> {
    return await this.request.delete(url, config)
  }

  public async post(url: string, data?: URLSearchParams | FormData, config: AxiosRequestConfig = {}, useUploadUrl = false): Promise<any> {
    if (data instanceof FormData)
        return await this.request.post(!useUploadUrl ? url : this.uploadUrl + path, data, {headers: {'Content-Type': 'multipart/form-data'}, ...config})
    return await this.request.post(url, data, config)
  }

  public async put(url: string, data: URLSearchParams, config: AxiosRequestConfig = {}): Promise<any> {
    return await this.request.put(url, data, config)
  }
}
