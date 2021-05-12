import { SteamID } from './steam'

export const formatAdmins = (admins: Array<string | number>, format32 = true): Array<string> => {
  const formattedIds: Array<string> = []
  for (const admin of admins) {
    const sid = new SteamID(admin.toString())
    if (format32)
      formattedIds.push(sid.steam2(true))
    else
      formattedIds.push(sid.steam64())
  }
  return formattedIds
}

export const paramGiven = (value: unknown): boolean => {
  return typeof value !== 'undefined'
}
