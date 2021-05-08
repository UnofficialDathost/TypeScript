export interface ISettings {
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

export interface ICsgo {
  slots?: number
  tickrate?: number
  gameToken?: string
  rconPassword?: string
  gameMode?: string
  autoloadConfigs?: Array<string>
  disableBots?: boolean
  workshopStartMapId?: number
  csayPlugin?: boolean
  gotv?: boolean
  sourcemod?: boolean
  insecure?: boolean
  mapGroup?: string
  startMap?: string
  password?: string
  pure?: boolean
  admins?: Array<string|number>
  plugins?: Array<string>
  steamKey?: string
  workshopId?: number
  mapSource?: string
}
