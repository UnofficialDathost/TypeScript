import {
    IServerSettings, ICsgoSettings, ITf2Settings, IValheimSettings, ITeamspeak
} from '../interfaces/settings'
import { formatAdmins } from '../helpers/misc'

const validTickrates: Array<number> = [
  64,
  85,
  100,
  102.4,
  128
]

export default class ServerSettings {
  payload: URLSearchParams
  private gameSelected: boolean

  constructor(settings: IServerSettings = {}) {
    this.payload = new URLSearchParams()
    this.gameSelected = false

    if (typeof settings.name !== 'undefined')
        this.payload.append('name', settings.name)
    if (typeof settings.location !== 'undefined')
        this.payload.append('location', settings.location)
    if (typeof settings.customDomain !== 'undefined')
        this.payload.append('custom_domain', settings.customDomain)
    if (typeof settings.autostop !== 'undefined')
        this.payload.append('autostop', settings.autostop.toString())
    if (typeof settings.autostopMinutes !== 'undefined')
        this.payload.append('autostop_minutes', settings.autostopMinutes.toString())
    if (typeof settings.mysql !== 'undefined')
        this.payload.append('enable_mysql', settings.mysql.toString())
    if (typeof settings.scheduledCommands !== 'undefined')
        this.payload.append('scheduled_commands', JSON.stringify(settings.scheduledCommands))
    if (typeof settings.userData !== 'undefined')
        this.payload.append('user_data', settings.userData)
    if (typeof settings.rebootOnCrash !== 'undefined')
        this.payload.append('reboot_on_crash', settings.rebootOnCrash.toString())
    if (typeof settings.maxDiskUsageGb !== 'undefined') {
        if (settings.maxDiskUsageGb > 100 || settings.maxDiskUsageGb < 30)
                throw Error(`${settings.maxDiskUsageGb} isn't a valid size.`)
        this.payload.append('max_disk_usage_gb', settings.maxDiskUsageGb.toString())
    }
    if (typeof settings.manualSortOrder !== 'undefined')
        this.payload.append('manual_sort_order', settings.manualSortOrder.toString())
    if (typeof settings.coreDump !== 'undefined')
        this.payload.append('enable_core_dump', settings.coreDump.toString())
    if (typeof settings.preferDedicated !== 'undefined')
        this.payload.append('prefer_dedicated', settings.preferDedicated.toString())
  }

  private checkGameSelected (): void {
    if (this.gameSelected)
        throw Error('Game already selected.')

    this.gameSelected = true
  }

  public csgo(settings: ICsgoSettings = {}): this {
    this.checkGameSelected()
    this.payload.append('game', 'csgo')

    if (typeof settings.slots !== 'undefined') {
      if (settings.slots < 5 || settings.slots > 64)
        throw Error(`Slots ${settings.slots} is invalid.`)

      this.payload.append('csgo_settings.slots', settings.slots.toString())
    }
    if (typeof settings.tickrate !== 'undefined') {
      if (validTickrates.indexOf(settings.tickrate) === -1)
        throw Error(`Tickrate ${settings.tickrate} is invalid.`)

      this.payload.append('csgo_settings.tickrate', settings.tickrate.toString())
    }
    if (typeof settings.gameToken !== 'undefined')
        this.payload.append('csgo_settings.steam_game_server_login_token', settings.gameToken.toString())
    if (typeof settings.rconPassword !== 'undefined')
        this.payload.append('csgo_settings.rcon', settings.rconPassword)
    if (typeof settings.gameMode !== 'undefined')
        this.payload.append('csgo_settings.game_mode', settings.gameMode)
    if (typeof settings.autoloadConfigs !== 'undefined')
        this.payload.append('csgo_settings.autoload_configs', JSON.stringify(settings.autoloadConfigs))
    if (typeof settings.disableBots !== 'undefined')
        this.payload.append('csgo_settings.disable_bots', settings.disableBots.toString())
    if (typeof settings.workshopStartMapId !== 'undefined')
        this.payload.append('csgo_settings.workshop_start_map_id', settings.workshopStartMapId.toString())
    if (typeof settings.csayPlugin !== 'undefined')
        this.payload.append('csgo_settings.enable_csay_plugin', settings.csayPlugin.toString())
    if (typeof settings.gotv !== 'undefined')
        this.payload.append('csgo_settings.enable_gotv', settings.gotv.toString())
    if (typeof settings.sourcemod !== 'undefined')
        this.payload.append('csgo_settings.enable_sourcemod', settings.sourcemod.toString())
    if (typeof settings.insecure !== 'undefined')
        this.payload.append('csgo_settings.insecure', settings.insecure.toString())
    if (typeof settings.mapGroup !== 'undefined')
        this.payload.append('csgo_settings.mapgroup', settings.mapGroup)
    if (typeof settings.startMap !== 'undefined')
        this.payload.append('csgo_settings.mapgroup_start_map', settings.startMap)
    if (typeof settings.password !== 'undefined')
        this.payload.append('csgo_settings.password', settings.password)
    if (typeof settings.pure !== 'undefined')
        this.payload.append('csgo_settings.pure_server', settings.pure.toString())
    if (typeof settings.admins !== 'undefined')
        this.payload.append('csgo_settings.sourcemod_admins', JSON.stringify(formatAdmins(settings.admins)))
    if (typeof settings.plugins !== 'undefined')
        this.payload.append('csgo_settings.sourcemod_plugins', JSON.stringify(settings.plugins))
    if (typeof settings.steamKey !== 'undefined')
        this.payload.append('csgo_settings.workshop_authkey', settings.steamKey)
    if (typeof settings.workshopId !== 'undefined')
        this.payload.append('csgo_settings.workshop_id', settings.workshopId.toString())
    if (typeof settings.mapSource !== 'undefined')
        this.payload.append('csgo_settings.maps_source', settings.mapSource)

    return this
  }

  public tf2(settings: ITf2Settings = {}): this {
    this.checkGameSelected()
    this.payload.append('game', 'teamfortress2')

    if (typeof settings.slots !== 'undefined') {
        if (settings.slots < 5 || settings.slots > 500)
            throw Error(`Slots ${settings.slots} is invalid.`)
        this.payload.append('teamfortress2_settings.slots', settings.slots.toString())
    }
    if (typeof settings.rconPassword !== 'undefined')
        this.payload.append('teamfortress2_settings.rcon', settings.rconPassword)
    if (typeof settings.gotv !== 'undefined')
        this.payload.append('teamfortress2_settings.enable_gotv', settings.gotv.toString())
    if (typeof settings.sourcemod !== 'undefined')
        this.payload.append('teamfortress2_settings.enable_sourcemod', settings.sourcemod.toString())
    if (typeof settings.insecure !== 'undefined')
        this.payload.append('teamfortress2_settings.insecure', settings.insecure.toString())
    if (typeof settings.password !== 'undefined')
        this.payload.append('teamfortress2_settings.password', settings.password)
    if (typeof settings.admins !== 'undefined')
        this.payload.append('teamfortress2_settings.sourcemod_admins', JSON.stringify(formatAdmins(settings.admins)))

    return this
  }

  public valheim(settings: IValheimSettings = {}): this {
    this.checkGameSelected()
    this.payload.append('game', 'valheim')

    if (typeof settings.password !== 'undefined')
        this.payload.append('valheim_settings.password', settings.password)
    if (typeof settings.worldName !== 'undefined')
        this.payload.append('valheim_settings.world_name', settings.worldName)
    if (typeof settings.plus !== 'undefined')
        this.payload.append('valheim_settings.enable_valheimplus', settings.plus.toString())
    if (typeof settings.admins !== 'undefined')
        this.payload.append('valheim_settings.admins_steamid64', JSON.stringify(formatAdmins(settings.admins, false)))
    
    return this
  }

  public teamspeak(settings: ITeamspeak = {}): this {
    this.checkGameSelected()
    this.payload.append('game', 'teamspeak3')

    if (typeof settings.slots !== 'undefined') {
        if (settings.slots < 5 || settings.slots > 500)
            throw Error(`Slots ${settings.slots} is invalid.`)
        this.payload.append('teamspeak3_settings.slots', settings.slots.toString())
    }

    return this
  }
}
