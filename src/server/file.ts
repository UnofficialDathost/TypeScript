import { AxiosRequestConfig } from 'axios'

import HTTP from '../http'
import FormData from '../helpers/formData'

export default class File {
  serverId: string
  path: string
  private http: HTTP

  constructor (serverId: string, path: string, http: HTTP) {
    this.serverId = serverId
    this.path = path
    this.http = http
  }

  public get url(): string {
    return `/game-servers/${this.serverId}/files/${this.path}`
  }

  public async unzip(destination?: string): Promise<void> {
    const unzipUrl = `/game-servers/${this.serverId}/unzip/${this.path}`
      if (typeof destination !== 'undefined') {
        const payload = new URLSearchParams()
        payload.append('destination', destination)
        await this.http.post(unzipUrl, payload)
      } else
        await this.http.post(unzipUrl)
  }

  public async delete(): Promise<void> {
    await this.http.delete(this.url)
  }

  public async move(destination: string): Promise<void> {
    const payload = new URLSearchParams()
    payload.append('destination', destination)
    await this.http.put(this.url, payload)
  }

  public async download(asText = false, config: AxiosRequestConfig = {}): Promise<Blob | string> {
    if (!asText) {
      config.responseType = 'blob'
    }

    return await this.http.get(`${this.url}?as_text=${asText.toString()}`, config)
  }

  public async upload(data: Blob, config: AxiosRequestConfig = {}): Promise<void> {
    const payload = new FormData()
    payload.append('file', data)
    await this.http.post(`/game-servers/${this.serverId}/files/${this.path}`, payload, config, true)
  }
}
