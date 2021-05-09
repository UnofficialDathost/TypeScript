import HTTP from '../http'
import Server from './'

export default class File {
  serverId: string
  path: string
  #http: HTTP

  constructor(serverId: string, path: string, http: HTTP) {
    this.serverId = serverId
    this.path = path
    this.#http = http
  }

  public get url(): string {
    return `/game-servers/${this.serverId}/files/${this.path}`
  }

  public async unzip(destination: string = null): Promise<void> {
    let payload: URLSearchParams
    if (destination != null) {
      payload = new URLSearchParams()
      payload.append('destination', destination)
    } else
      payload = null

    await this.#http.post(`/game-servers/${this.serverId}/unzip/${this.path}`, payload)
  }

  public async delete(): Promise<void> {
    await this.#http.delete(this.url)
  }

  public async move(destination: string): Promise<void> {
    const payload = new URLSearchParams()
    payload.append('destination', destination)
    await this.#http.put(this.url, payload)
  }

  public async download(asText = false): Promise<ArrayBuffer> {
    return await this.#http.get(`${this.url}?as_text=${asText.toString()}`)
  }

  public async upload(data: FormData): Promise<void> {
    await this.#http.post(`https://upload.dathost.net/api/0.1/game-servers/${this.serverId}/files/${this.path}`, data)
  }
}
