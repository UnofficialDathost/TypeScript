const validTickrates: Array<number> = [
    64,
    85,
    100,
    102.4,
    128
]

export default class ServerSettings {
    #payload: Record<string, unknown>
    #gameSelected: boolean

    constructor (name: string = null, location: string = null,
                 customDomain: string = null, autostop: boolean = null,
                 autostopMinutes: number = null, mysql: boolean = null,
                 scheduledCommands: Array<string> = null,
                 userData: string = null, rebootOnCrash: boolean = null,
                 maxDiskUsageGb: number = null, manualSortOrder: number = null,
                 coreDump: boolean = null, preferDedicated: boolean = null) {

        this.#payload = {}
        this.#gameSelected = false

        if (name != null)
            this.#payload['name'] = name
        if (location != null)
            this.#payload['location'] = location
        if (customDomain != null)
            this.#payload['custom_domain'] = customDomain
        if (autostop != null)
            this.#payload['autostop'] = autostop
        if (autostopMinutes != null)
            this.#payload['autostop_minutes'] = autostopMinutes
        if (mysql != null)
            this.#payload['enable_mysql'] = mysql
        if (scheduledCommands != null)
            this.#payload['scheduled_commands'] = scheduledCommands
        if (userData != null)
            this.#payload['user_data'] = userData
        if (rebootOnCrash != null)
            this.#payload['reboot_on_crash'] = rebootOnCrash
        if (maxDiskUsageGb != null)
            if (maxDiskUsageGb > 100 || maxDiskUsageGb < 30)
                    throw Error(`${maxDiskUsageGb} isn't a valid size.`)

            this.#payload['max_disk_usage_gb'] = maxDiskUsageGb
        if (manualSortOrder != null)
            this.#payload['manual_sort_order'] = manualSortOrder
        if (coreDump != null)
            this.#payload['enable_core_dump'] = coreDump
        if (preferDedicated != null)
            this.#payload['prefer_dedicated'] = preferDedicated
    }

    get payload(): Record<string, unknown> {
        return this.#payload
    }

    private checkGameSelected (): void {
        if (this.#gameSelected)
            throw Error('Game already selected.')

        this.#gameSelected = true
    }

    public csgo (slots: number = null, tickrate: number = null,
                 gameToken: string = null, rconPassword: string = null,
                 gameMode: string = null, autoloadConfigs: Array<string> = null): this {
        this.checkGameSelected()
        this.#payload['game'] = 'csgo'

        if (slots != null)
            if (slots < 5 || slots > 64)
                throw Error(`Slots ${slots} is invalid.`)
            this.#payload['csgo_settings.slots'] = slots
        if (tickrate != null)
            if (!(tickrate in validTickrates))
                throw Error(`Tickrate ${tickrate} is invalid.`)
            this.#payload['csgo_settings.tickrate'] = tickrate
        if (gameToken != null)
            this.#payload['csgo_settings.steam_game_server_login_token'] = gameToken
        if (rconPassword != null)
            this.#payload['csgo_settings.rcon'] = rconPassword
        if (gameMode != null)
            this.#payload['csgo_settings.game_mode'] = gameMode
        if (autoloadConfigs != null)
            this.#payload['csgo_settings.autoload_configs'] = autoloadConfigs

        return this
    }

    public tf2 (): this {
        this.checkGameSelected()
        this.#payload['game'] = 'teamfortress2'
        return this
    }

    public valheim (): this {
        this.checkGameSelected()
        this.#payload['game'] = 'valheim'
        return this
    }

    public teamspeak (): this {
        this.checkGameSelected()
        this.#payload['game'] = 'teamspeak3'
        return this
    }
}
