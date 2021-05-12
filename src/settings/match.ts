import { paramGiven } from '../helpers/misc'
import { IMatchSettings, IWebhookSettings } from '../interfaces/settings'
import { SteamID } from '../helpers/steam'

export default class MatchSettings {
    #payload: URLSearchParams

    constructor(settings: IMatchSettings = {}) {
        if (paramGiven(settings.connectionTime))
            this.#payload.append('connection_time', settings.connectionTime.toString())
        if (paramGiven(settings.knifeRound))
            this.#payload.append('enable_knife_round', settings.knifeRound.toString())
        if (paramGiven(settings.waitForSpectators))
            this.#payload.append('wait_for_spectators', settings.waitForSpectators.toString())
        if (paramGiven(settings.warmupTime))
            this.#payload.append('warmup_time', settings.warmupTime.toString())
    }

    public get payload(): URLSearchParams {
        return this.#payload
    }

    public playwin(webhook: string = null): this {
        this.#payload.append('enable_playwin', 'true')
        if (webhook != null)
            this.#payload.append('playwin_result_webhook_url', webhook)
        return this
    }

    public webhook(settings: IWebhookSettings): this {
        this.#payload.append('match_end_webhook_url', settings.matchEnd)
        this.#payload.append('round_end_webhook_url', settings.roundEnd)
        if (paramGiven(settings.authorization))
            this.#payload.append('webhook_authorization_header', settings.authorization)
        return this
    }

    private formatPlayers(players: Array<string | number>): Promise<string> {
        let formattedPlayers = ''
        for (const player of players) {
            const sid = new SteamID(player.toString())
            formattedPlayers += `,${sid.steam2(true)}`
        }
        return formattedPlayers.substring(1)
    }

    public spectators(players: Array<string | number>): this {
        this.#payload.append('spectator_steam_ids', this.formatPlayers(players))
        return this
    }

    public team_1(players: Array<string | number>): this {
        this.#payload.append('team1_steam_ids', this.formatPlayers(players))
        return this
    }

    public team_2(players: Array<string | number>): this {
        this.#payload.append('team2_steam_ids', this.formatPlayers(players))
        return this
    }
}
