import HTTP from '../http'

export default class Backup {
    #http: HTTP
    serverId: string
    backupName: string

    constructor (serverId: string, backupName: string, http: HTTP) {
        this.serverId = serverId
        this.backupName = backupName
        this.#http = http
    }

    public get url(): string {
        return `/game-servers/${this.serverId}/backups/${this.backupName}/restore`
    }

    public async restore(): Promise<void> {
        await this.#http.post(this.url)
    }
}
