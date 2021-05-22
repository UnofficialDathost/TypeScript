import HTTP from '../http'

import { IServer } from '../interfaces/server'
import { IMetrics } from '../interfaces/metrics'
import { IBackup } from '../interfaces/backup'
import { IFile } from '../interfaces/file'
import { IFileSettings } from '../interfaces/settings'
import { IMatch } from '../interfaces/match'

import Backup from './backup'
import File from './file'
import Match from '../match'

import ServerSettings from '../settings/server'
import MatchSettings from '../settings/match'

export default class Server {
  serverId: string
  private http: HTTP

  constructor(serverId: string, http: HTTP) {
    this.http = http
    this.serverId = serverId
  }

  public get url(): string {
    return `/game-servers/${this.serverId}`
  }

  public async createMatch(settings: MatchSettings): Promise<[IMatch, Match]> {
    settings.addServer(this.serverId)
    const match: IMatch = await this.http.post('/matches', settings.payload)
    return [match, new Match(match.id, this.http)]
  }

  public backup(backupName: string): Backup {
    return new Backup(this.serverId, backupName, this.http)
  }

  public file(path: string): File {
    return new File(this.serverId, path, this.http)
  }

  public async get(): Promise<IServer> {
    return <IServer>await this.http.get(this.url)
  }

  public async delete(): Promise<void> {
    await this.http.delete(this.url)
  }

  public async start(allowHostReassignment?: boolean): Promise<void> {
    let payload: URLSearchParams

    if (typeof allowHostReassignment !== 'undefined') {
      payload = new URLSearchParams()
      payload.append('allow_host_reassignment', allowHostReassignment.toString())
      await this.http.post(`${this.url}/start`, payload)
    } else
      await this.http.post(`${this.url}/start`)
  }

  public async reset(): Promise<void> {
    await this.http.post(`${this.url}/reset`)
  }

  public async stop(): Promise<void> {
    await this.http.post(`${this.url}/stop`)
  }

  public async metrics(): Promise<IMetrics> {
    return <IMetrics>await this.http.get(`${this.url}/metrics`)
  }

  public async update(settings: ServerSettings): Promise<void> {
    await this.http.put(this.url, settings.payload)
  }

  public async regenerateFtpPassword(): Promise<void> {
    await this.http.post(`${this.url}/regenerate-ftp-password`)
  }

  public async syncFiles(): Promise<void> {
      await this.http.post(`${this.url}/sync-files`)
  }

  public async consoleRetrieve(maxLines?: number): Promise<string[]> {
    let url = `${this.url}/console`

    if (typeof maxLines !== 'undefined') {
        if (maxLines < 1 || maxLines > 100000)
            throw Error(`Max lines of ${maxLines} is out of range.`)
        url += `?max_lines=${maxLines}`
    }

    return (await this.http.get(url))['lines']
  }

  public async consoleSend(line: string): Promise<void> {
    const payload = new URLSearchParams()
    payload.append('line', line)
    await this.http.post(`${this.url}/console`, payload)
  }

  public async duplicate(): Promise<[IServer, Server]> {
    const server: IServer = <IServer>await this.http.post(`${this.url}/duplicate`)
    return [server, new Server(server.id, this.http)]
  }

  public async* backups(): AsyncGenerator<[IBackup, Backup]> {
    const backups: Array<IBackup> = await this.http.get(`${this.url}/backups`)
    for (const backup of backups) {
        yield [backup, this.backup(backup.name)]
    }
  }

  public async* files(settings: IFileSettings = {}): AsyncGenerator<[IFile, File]> {
    let files: Array<IFile>
    if (settings) {
        const payload = new URLSearchParams()
        if (typeof settings.hideDefaultFiles !== 'undefined')
            payload.append('hide_default_files', settings.hideDefaultFiles.toString())
        if (typeof settings.deletedFiles !== 'undefined')
            payload.append('include_deleted_files', settings.deletedFiles.toString())
        if (typeof settings.path !== 'undefined')
            payload.append('path', settings.path)
        if (typeof settings.fileSizes !== 'undefined')
            payload.append('with_filesizes', settings.fileSizes.toString())

        files = await this.http.get(`${this.url}/files?${payload.toString()}`)
    } else
        files = await this.http.get(`${this.url}/files`)
    
    for (const file of files) {
        yield [file, this.file(file.path)]
    }
  }
}
