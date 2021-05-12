import HTTP from './http'
import { IMatch } from './interfaces/match'

export default class Match {
    matchId: string
    #http: HTTP

    constructor(matchId: string, http: HTTP) {
        this.#http = http
        this.matchId = matchId
    }

    public async get(): IMatch {
        return <IMatch> await this.#http.get(`/matches/${this.matchId}`)
    }
}
