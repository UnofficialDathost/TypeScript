export interface IMetrics {
  all_time_players:     AllTimePlayers;
  maps_played:          MapsPlayed;
  players_online:       AllTimePlayers;
  players_online_graph: PlayersOnlineGraph;
}

export interface AllTimePlayers {
  duration: number;
  name:     string;
  score:    number;
}

export interface MapsPlayed {
  map:     string;
  seconds: number;
}

export interface PlayersOnlineGraph {
  timestamp: number;
  value:     number;
}
