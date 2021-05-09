import SteamID from 'steamid'

export const formatAdmins = (admins: Array<string | number>, format32 = true): Array<string> => {
  const admins32: Array<string> = []
  for (const admin in admins) {
      admins32.push(
          SteamID(admin).getSteam2RenderedID() ? format32 :
          (SteamID(admin).getSteamID64()).toString()
      )
  }
  return admins32
}

export const paramGiven = (value: unknown): boolean => {
  return typeof value !== 'undefined'
}
