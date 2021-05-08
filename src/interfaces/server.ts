export interface IServer {
    id:                                   string;
    name:                                 string;
    user_data:                            string;
    game:                                 string;
    location:                             string;
    players_online:                       number;
    status:                               Status[];
    booting:                              boolean;
    server_error:                         string;
    ip:                                   string;
    raw_ip:                               string;
    private_ip:                           string;
    match_id:                             string;
    on:                                   boolean;
    ports:                                Ports;
    confirmed:                            boolean;
    max_disk_usage_gb:                    number;
    cost_per_hour:                        number;
    max_cost_per_hour:                    number;
    month_credits:                        number;
    month_reset_at:                       number;
    max_cost_per_month:                   number;
    subscription_cycle_months:            number;
    subscription_renewal_failed_attempts: number;
    enable_mysql:                         boolean;
    autostop:                             boolean;
    autostop_minutes:                     number;
    enable_core_dump:                     boolean;
    prefer_dedicated:                     boolean;
    enable_syntropy:                      boolean;
    reboot_on_crash:                      boolean;
    manual_sort_order:                    number;
    mysql_username:                       string;
    mysql_password:                       string;
    ftp_password:                         string;
    disk_usage_bytes:                     number;
    default_file_locations:               string[];
    custom_domain:                        string;
    scheduled_commands:                   ScheduledCommand[];
    added_voice_server:                   string;
    duplicate_source_server:              string;
    csgo_settings:                        CsgoSettings;
    mumble_settings:                      MumbleSettings;
    teamfortress2_settings:               Teamfortress2Settings;
    teamspeak3_settings:                  Teamspeak3Settings;
    valheim_settings:                     ValheimSettings;
}

export interface CsgoSettings {
    slots:                         number;
    steam_game_server_login_token: string;
    rcon:                          string;
    password:                      string;
    maps_source:                   string;
    mapgroup:                      string;
    mapgroup_start_map:            string;
    workshop_id:                   string;
    workshop_start_map_id:         string;
    workshop_authkey:              string;
    autoload_configs:              string[];
    sourcemod_admins:              string;
    sourcemod_plugins:             string[];
    enable_gotv:                   boolean;
    enable_sourcemod:              boolean;
    enable_csay_plugin:            boolean;
    game_mode:                     string;
    tickrate:                      number;
    pure_server:                   boolean;
    insecure:                      boolean;
    disable_bots:                  boolean;
}

export interface MumbleSettings {
    slots:              number;
    password:           string;
    superuser_password: string;
    welcome_text:       string;
}

export interface Ports {
    game:  number;
    gotv:  number;
    query: number;
}

export interface ScheduledCommand {
    name:    string;
    action:  string;
    command: string;
    run_at:  number;
    repeat:  number;
}

export interface Status {
    key:   string;
    value: string;
}

export interface Teamfortress2Settings {
    slots:            number;
    rcon:             string;
    password:         string;
    sourcemod_admins: string;
    enable_gotv:      boolean;
    enable_sourcemod: boolean;
    insecure:         boolean;
}

export interface Teamspeak3Settings {
    slots:          number;
    ts_admin_token: string;
    ts_server_id:   string;
}

export interface ValheimSettings {
    admins_steamid64:   string[];
    enable_valheimplus: boolean;
    slots:              number;
    password:           string;
    world_name:         string;
}
