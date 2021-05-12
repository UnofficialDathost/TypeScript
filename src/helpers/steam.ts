/* eslint-disable no-cond-assign */
import { UINT64 as UInt64 } from 'cuint';

// Taken from https://github.com/Smertos/node-steamid-ts
// In future rewrite would be nice.

// Universe constants
export enum Universe {
    INVALID,
    PUBLIC,
    BETA,
    INTERNAL,
    DEV
}

// Type constants
export enum Type {
    INVALID,
    INDIVIDUAL,
    MULTISEAT,
    GAMESERVER,
    ANON_GAMESERVER,
    PENDING,
    CONTENT_SERVER,
    CLAN,
    CHAT,
    P2P_SUPER_SEEDER,
    ANON_USER
}

// Instance constants
export enum Instance {
    ALL,
    DESKTOP,
    CONSOLE,
    WEB
}

export const TypeChar: { [index: number]: string } = {
    [Type.INVALID]: 'I',
    [Type.INDIVIDUAL]: 'U',
    [Type.MULTISEAT]: 'M',
    [Type.GAMESERVER]: 'G',
    [Type.ANON_GAMESERVER]: 'A',
    [Type.PENDING]: 'P',
    [Type.CONTENT_SERVER]: 'C',
    [Type.CLAN]: 'g',
    [Type.CHAT]: 'T',
    [Type.ANON_USER]: 'a'
};

export const AccountIDMask = 0xFFFFFFFF;
export const AccountInstanceMask = 0x000FFFFF;

export const ChatInstanceFlags = {
    Clan: (AccountInstanceMask + 1) >> 1,
    Lobby: (AccountInstanceMask + 1) >> 2,
    MMSLobby: (AccountInstanceMask + 1) >> 3
};

export class SteamID {

    private static reSteamID2 = /^STEAM_([0-5]):([0-1]):([0-9]+)$/;
    private static reSteamID3 = /^\[([a-zA-Z]):([0-5]):([0-9]+)(:[0-9]+)?\]$/;

    private universe: Universe = Universe.INVALID;
    private type: Type = Type.INVALID;
    private instance: Instance = Instance.ALL;
    private accountID = 0;

    constructor(input?: string) {
        if (!input) return;

        let matches;
        if (matches = input.match(SteamID.reSteamID2)) {
            // Steam2 ID
            this.universe = Number(matches[1]) || Universe.PUBLIC; // If it's 0, turn it into 1 for public
            this.type = Type.INDIVIDUAL;
            this.instance = Instance.DESKTOP;
            this.accountID = Number(matches[3]) * 2 + Number(matches[2]);
        } else if(matches = input.match(SteamID.reSteamID3)) {
            // Steam3 ID
            const typeChar = matches[1];
            this.universe = Number(matches[2]);
            this.accountID = Number(matches[3]);

            if (matches[4]) {
                this.instance = Number(matches[4].substring(1));
            } else if (typeChar === 'U') {
                this.instance = Instance.DESKTOP;
            }

            switch(typeChar) {
                case 'c':
                    this.instance |= ChatInstanceFlags.Clan;
                    this.type = Type.CHAT;
                    break;

                case 'L':
                    this.instance |= ChatInstanceFlags.Lobby;
                    this.type = Type.CHAT;
                    break;

                default:
                    this.type = this.getTypeFromChar(typeChar);
            }
        } else {
            // TS doesn't know that isNaN can accept string *shrug*
            if (isNaN(Number(input))) throw new Error(`Unknown SteamID input format "${input}"`);

            const num = new UInt64(input, 10);

            this.accountID = (num.toNumber() & 0xFFFFFFFF) >>> 0;
            this.instance = num.shiftRight(32).toNumber() & 0xFFFFF;
            this.type = num.shiftRight(20).toNumber() & 0xF;
            this.universe = num.shiftRight(4).toNumber();
        }
    }

    /**
    * Create an individual SteamID in the public universe given an accountid
    * @param {number} accountID - The user's account ID
    * @return {SteamID}
    */
    static fromIndividualAccountID (accountID: number): SteamID {
      const sid = new SteamID();

        sid.universe = Universe.PUBLIC;
        sid.type = Type.INDIVIDUAL;
        sid.instance = Instance.DESKTOP;
        sid.accountID = isNaN(accountID) ? 0 : Number(accountID);

        return sid;
    }

    /**
    * Backports TypeChars to Type
    * @param {string} typeChar
    * @returns {Type}
    */
    private getTypeFromChar(typeChar: string): Type {
        for(const type in TypeChar) {
            if(TypeChar[type] === typeChar) {
                return Number(type);
            }
        }

        return Type.INVALID;
    }

    /**
    * Check whether this SteamID is valid (according to Steam's rules)
    * @type {boolean}
    */
    get isValid (): boolean {
        return [
            this.type <= Type.INVALID || this.type > Type.ANON_USER,
            this.universe <= Universe.INVALID || this.universe > Universe.DEV,
            this.type === Type.INDIVIDUAL && (this.accountID === 0 || this.instance > Instance.WEB),
            this.type === Type.CLAN && (this.accountID === 0 || this.instance !== Instance.ALL),
            this.type === Type.GAMESERVER && this.accountID === 0
        ].every(e => !e)
    }

    /**
    * Check whether this chat SteamID is tied to a Steam group.
    * @type {boolean}
    */
    get isGroupChat (): boolean {
        return [
            this.type === Type.CHAT,
            this.instance & ChatInstanceFlags.Clan
        ].every(e => !!e);
    }

    /**
    * Check whether this chat SteamID is a Steam lobby.
    * @type {boolean}
    */
    get isLobby (): boolean {
        return [
            this.type === Type.CHAT,
            (this.instance & ChatInstanceFlags.Lobby || this.instance & ChatInstanceFlags.MMSLobby)
        ].every(e => !!e);
    }

    /**
    * Render this SteamID into Steam2 textual format
    * @param {boolean} [newerFormat=false] - true if you want to use 1 in place of the leading 0 for the public universe
    * @return {string}
    */
    steam2 (newerFormat = false): string {
        if(this.type !== Type.INDIVIDUAL) {
            throw new Error('Can\'t get Steam2 rendered ID for non-individual ID');
        }

        if(!newerFormat && this.universe === Universe.PUBLIC) {
            this.universe = 0;
        }

        return `STEAM_${this.universe}:${this.accountID & 1}:${Math.floor(this.accountID / 2)}`;
    }

    /**
    * Render this SteamID into Steam3 textual format
    * @return {string}
    */
    steam3 (): string {
        let typeChar: string = TypeChar[this.type] || 'i';

        if(this.instance & ChatInstanceFlags.Clan) typeChar = 'c';
        else if(this.instance & ChatInstanceFlags.Lobby) typeChar = 'L';

        const renderInstance = [
            this.type === Type.ANON_GAMESERVER,
            this.type === Type.MULTISEAT,
            this.type === Type.INDIVIDUAL && this.instance !== Instance.DESKTOP
        ].some(e => e);

        return `[${typeChar}:${this.universe}:${this.accountID}${renderInstance ? ':' + this.instance : ''}]`;
    }

    /**
    * Render this SteamID into 64-bit numeric format
    * @return {string}
    */
    steam64(): string {
        return new UInt64(
            this.accountID,
            (this.universe << 24) | (this.type << 20) | (this.instance)
        ).toString();
    }

    toString (): string {
        return this.steam64();
    }
}
