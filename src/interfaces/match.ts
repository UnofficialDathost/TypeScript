export interface IMatch {
  cancel_reason:              string;
  connect_time:               number;
  enable_knife_round:         boolean;
  enable_playwin:             boolean;
  finished:                   boolean;
  game_server_id:             string;
  id:                         string;
  match_end_webhook_url:      string;
  player_stats:               PlayerStat[];
  playwin_result:             Record<string, string>;
  playwin_result_webhook_url: string;
  round_end_webhook_url:      string;
  rounds_played:              number;
  spectator_steam_ids:        string[];
  team1_stats:                TeamStats;
  team1_steam_ids:            string[];
  team2_stats:                TeamStats;
  team2_steam_ids:            string[];
  wait_for_spectators:        boolean;
  warmup_time:                number;
  enable_pause:               boolean;
  enable_ready:               boolean;
  enable_tech_pause:          boolean;
  ready_min_players:          number;
  team1_coach_steam_id:       string;
  team2_coach_steam_id:       string;
  wait_for_coaches:           boolean;
}

export interface PlayerStat {
  assists:  number;
  deaths:   number;
  kills:    number;
  steam_id: string;
}

export interface TeamStats {
  score: number;
}
