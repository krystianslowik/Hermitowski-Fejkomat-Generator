import { FejkomatKeys } from "../types/FejkomatValuesKeys.types";
import { FakingSettings } from "../types/HermitowskiFejkomat.types";
export const defaultSettings: FakingSettings = {
  safeguard: {},

  fill_exact: false,
  fill_troops: "spear,sword,axe,spy,light,ram,catapult",
  coords: "",
  players: "",
  player_ids: "",
  allies: "",
  ally_ids: "",
  ally_tags: "",
  exclude_players: "",
  exclude_player_ids: "",
  exclude_allies: "",
  exclude_ally_tags: "",
  exclude_ally_ids: "",
  include_barbarians: false,
  boundaries_circle: [],
  boundaries_box: [],
  blocking_enabled: false,
  skip_night_bonus: false,
  date_ranges: [],
  changing_village_enabled: true,
};

export const fejkomatyFields: FejkomatKeys[] = [
  "coords",
  "troops_templates",
  "fill_troops",
  "safeguard",
  "players",
  "player_ids",
  "allies",
  "ally_ids",
  "ally_tags",
  "exclude_players",
  "exclude_player_ids",
  "exclude_allies",
  "exclude_ally_tags",
  "exclude_ally_ids",
  "boundaries_circle",
  "boundaries_box",
  "blocking_local",
  "blocking_global",
  "date_ranges",
  "blocking_enabled",
  "fill_exact",
  "include_barbarians",
  "skip_night_bonus",
  "changing_village_enabled",
];
