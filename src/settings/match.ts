import { IMatchSettings, IWebhookSettings } from '../interfaces/settings'
import { SteamID } from '../helpers/steam'

export default class MatchSettings {
  payload: URLSearchParams

  constructor(settings: IMatchSettings = {}) {
    this.payload = new URLSearchParams()

    if (typeof settings.connectionTime !== 'undefined')
        this.payload.append('connection_time', settings.connectionTime.toString())
    if (typeof settings.knifeRound !== 'undefined')
        this.payload.append('enable_knife_round', settings.knifeRound.toString())
    if (typeof settings.waitForSpectators !== 'undefined')
        this.payload.append('wait_for_spectators', settings.waitForSpectators.toString())
    if (typeof settings.warmupTime !== 'undefined')
        this.payload.append('warmup_time', settings.warmupTime.toString())
    if (typeof settings.enablePause !== 'undefined')
        this.payload.append('enable_pause', settings.enablePause.toString())
    if (typeof settings.enableReady !== 'undefined')
        this.payload.append('enable_ready', settings.enableReady.toString())
    if (typeof settings.enableTechPause !== 'undefined')
        this.payload.append('enable_tech_pause', settings.enableTechPause.toString())
    if (typeof settings.readMinPlayers !== 'undefined')
        this.payload.append('ready_min_players', settings.readMinPlayers.toString())
    if (typeof settings.waitForCoaches !== 'undefined')
        this.payload.append('wait_for_coaches', settings.waitForCoaches.toString())
  }

  /** 
  * Used to add server to match, if using createMatch function this will be overwritten.
  */
  public addServer(serverId: string): void {
    this.payload.append('game_server_id', serverId)
  }

  public playwin(webhook?: string): this {
    this.payload.append('enable_playwin', 'true')
    if (typeof webhook !== 'undefined')
        this.payload.append('playwin_result_webhook_url', webhook)
    return this
  }

  public webhook(settings: IWebhookSettings): this {
    this.payload.append('match_end_webhook_url', settings.matchEnd)
    this.payload.append('round_end_webhook_url', settings.roundEnd)
    if (typeof settings.authorization !== 'undefined')
        this.payload.append('webhook_authorization_header', settings.authorization)
    return this
  }

  private formatPlayers(players: Array<string | number>): string {
    let formattedPlayers = ''
    for (const player of players) {
        const sid = new SteamID(player.toString())
        formattedPlayers += `,${sid.steam2(true)}`
    }
    return formattedPlayers.substring(1)
  }

  public spectators(players: Array<string | number>, coach?: string | number): this {
    this.payload.append('spectator_steam_ids', this.formatPlayers(players))
    if (coach !== 'undefined')
        this.payload.append('team1_coach_steam_id', new SteamID(coach.toString()).steam2(true))
    return this
  }

  public team_1(players: Array<string | number>, coach?: string | number): this {
    this.payload.append('team1_steam_ids', this.formatPlayers(players))
    if (coach !== 'undefined')
        this.payload.append('team1_coach_steam_id', new SteamID(coach.toString()).steam2(true))
    return this
  }

  public team_2(players: Array<string | number>): this {
    this.payload.append('team2_steam_ids', this.formatPlayers(players))
    return this
  }
}
