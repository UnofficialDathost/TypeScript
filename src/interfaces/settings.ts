export interface IServerSettings {
  name?: string
  location?: string
  customDomain?: string
  autostop?: boolean
  autostopMinutes?: number
  mysql?: boolean
  scheduledCommands?: Array<string>
  userData?: string 
  rebootOnCrash?: boolean
  maxDiskUsageGb?: number
  manualSortOrder?: number
  coreDump?: boolean
  preferDedicated?: boolean
}

export interface ITf2Settings {
  slots?: number
  rconPassword?: string
  gotv?: boolean
  sourcemod?: boolean
  insecure?: boolean
  password?: string
  admins?: Array<string|number>
}

export interface ICsgoSettings extends ITf2Settings {
  tickrate?: number
  gameToken?: string
  gameMode?: string
  autoloadConfigs?: Array<string>
  disableBots?: boolean
  workshopStartMapId?: number
  csayPlugin?: boolean
  mapGroup?: string
  startMap?: string
  pure?: boolean
  plugins?: Array<string>
  steamKey?: string
  workshopId?: number
  mapSource?: string
}
