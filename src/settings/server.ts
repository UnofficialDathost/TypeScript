import { ISettings, ICsgo } from '../interfaces/settings'
import { formatAdmins, paramGiven } from './helper'

const validTickrates: Array<number> = [
    64,
    85,
    100,
    102.4,
    128
]


export default class ServerSettings {
    #payload: URLSearchParams
    #gameSelected: boolean

    constructor (settings: ISettings = {}) {

        this.#payload = new URLSearchParams()
        this.#gameSelected = false

        if (paramGiven(settings.name))
            this.#payload.append('name', settings.name)
        if (paramGiven(settings.location))
            this.#payload.append('location', settings.location)
        if (paramGiven(settings.customDomain))
            this.#payload.append('custom_domain', settings.customDomain)
        if (paramGiven(settings.autostop))
            this.#payload.append('autostop', settings.autostop.toString())
        if (paramGiven(settings.autostopMinutes))
            this.#payload.append('autostop_minutes', settings.autostopMinutes.toString())
        if (paramGiven(settings.mysql))
            this.#payload.append('enable_mysql', settings.mysql.toString())
        if (paramGiven(settings.scheduledCommands))
            this.#payload.append('scheduled_commands', settings.scheduledCommands.toString())
        if (paramGiven(settings.userData))
            this.#payload.append('user_data', settings.userData)
        if (paramGiven(settings.rebootOnCrash))
            this.#payload.append('reboot_on_crash', settings.rebootOnCrash.toString())
        if (paramGiven(settings.maxDiskUsageGb)) {
            if (settings.maxDiskUsageGb > 100 || settings.maxDiskUsageGb < 30)
                    throw Error(`${settings.maxDiskUsageGb} isn't a valid size.`)

            this.#payload.append('max_disk_usage_gb', settings.maxDiskUsageGb.toString())
        }
        if (paramGiven(settings.manualSortOrder))
            this.#payload.append('manual_sort_order', settings.manualSortOrder.toString())
        if (paramGiven(settings.coreDump))
            this.#payload.append('enable_core_dump', settings.coreDump.toString())
        if (paramGiven(settings.preferDedicated))
            this.#payload.append('prefer_dedicated', settings.preferDedicated.toString())
    }

    get payload(): URLSearchParams {
        return this.#payload
    }

    private checkGameSelected (): void {
        if (this.#gameSelected)
            throw Error('Game already selected.')

        this.#gameSelected = true
    }

    public csgo (settings: ICsgo = {}): this {
        this.checkGameSelected()
        this.#payload.append('game', 'csgo')

        if (paramGiven(settings.slots))
            if (settings.slots < 5 || settings.slots > 64)
                throw Error(`Slots ${settings.slots} is invalid.`)
            this.#payload['csgo_settings.slots'] = settings.slots
            this.#payload.append('csgo_settings.slots', settings.slots.toString())
        if (paramGiven(settings.tickrate))
            if (validTickrates.indexOf(settings.tickrate) === -1)
                throw Error(`Tickrate ${settings.tickrate} is invalid.`)
            this.#payload.append('csgo_settings.tickrate', settings.tickrate.toString())
        if (paramGiven(settings.gameToken))
            this.#payload.append('csgo_settings.steam_game_server_login_token', settings.gameToken.toString())
        if (paramGiven(settings.rconPassword))
            this.#payload.append('csgo_settings.rcon', settings.rconPassword)
        if (paramGiven(settings.gameMode))
            this.#payload.append('csgo_settings.game_mode', settings.gameMode)
        if (paramGiven(settings.autoloadConfigs))
            this.#payload.append('csgo_settings.autoload_configs', settings.autoloadConfigs.toString())
        if (paramGiven(settings.disableBots))
            this.#payload.append('csgo_settings.disable_bots', settings.disableBots.toString())
        if (paramGiven(settings.workshopStartMapId))
            this.#payload.append('csgo_settings.workshop_start_map_id', settings.workshopStartMapId.toString())
        if (paramGiven(settings.csayPlugin))
            this.#payload.append('csgo_settings.enable_csay_plugin', settings.csayPlugin.toString())
        if (paramGiven(settings.gotv))
            this.#payload.append('csgo_settings.enable_gotv', settings.gotv.toString())
        if (paramGiven(settings.sourcemod))
            this.#payload.append('csgo_settings.enable_sourcemod', settings.sourcemod.toString())
        if (paramGiven(settings.insecure))
            this.#payload.append('csgo_settings.insecure', settings.insecure.toString())
        if (paramGiven(settings.mapGroup))
            this.#payload['csgo_settings.mapgroup'] = settings.mapGroup
        if (paramGiven(settings.startMap))
            this.#payload.append('csgo_settings.mapgroup_start_map', settings.startMap)
        if (paramGiven(settings.password))
            this.#payload.append('csgo_settings.password', settings.password)
        if (paramGiven(settings.pure))
            this.#payload.append('csgo_settings.pure_server', settings.pure.toString())
        if (paramGiven(settings.admins))
            this.#payload.append('csgo_settings.sourcemod_admins', formatAdmins(settings.admins).toString())
        if (paramGiven(settings.plugins))
            this.#payload.append('csgo_settings.sourcemod_plugins', settings.plugins.toString())
        if (paramGiven(settings.steamKey))
            this.#payload.append('csgo_settings.workshop_authkey', settings.steamKey)
        if (paramGiven(settings.workshopId))
            this.#payload.append('csgo_settings.workshop_id', settings.workshopId.toString())
        if (paramGiven(settings.mapSource))
            this.#payload.append('csgo_settings.maps_source', settings.mapSource)

        return this
    }

    public tf2 (): this {
        this.checkGameSelected()
        this.#payload.append('game', 'teamfortress2')
        return this
    }

    public valheim (): this {
        this.checkGameSelected()
        this.#payload.append('game', 'valheim')
        return this
    }

    public teamspeak (): this {
        this.checkGameSelected()
        this.#payload.append('game', 'teamspeak3')
        return this
    }
}
