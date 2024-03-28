export interface Troops {
  spear?: number;
  sword?: number;
  axe?: number;
  archer?: number;
  spy?: number;
  light?: number;
  marcher?: number;
  heavy?: number;
  ram?: number;
  catapult?: number;
  knight?: number;
  snob?: number;
}
export interface Target {
  x: number;
  y: number;
  player_name: string;
  ally_tag: string;
  arrival_date: Date;
}

export interface FakingResult {
  target: Target;
  troops: Troops;
}

export interface BoundaryCircle {
  r: number;
  x: number;
  y: number;
}

export interface BoundaryBox {
  min_x: number;
  max_x: number;
  min_y: number;
  max_y: number;
}

export type DateRangePart = [number, number, number, number, number];
export type DateRange = [DateRangePart, DateRangePart];
export type BlockingLocal = {
  time_s: number;
  count: number;
  block_players: boolean;
  scope?: string;
};
export type BlockingGlobal = {
  time_s: number;
  count: number;
  block_players: boolean;
  name: string;
};

export type Coords = [number, number];

export interface FakingSettings {
  safeguard?: Troops;
  troops_templates?: Troops[];
  fill_exact?: boolean; // TODO?: change to fill_all (?)

  fill_troops?: string; //'spear,sword,axe,archer,spy,light,marcher,heavy,ram,catapult',

  coords?: string;
  players?: string;
  player_ids?: string;
  allies?: string;
  ally_tags?: string;
  ally_ids?: string;

  exclude_players?: string;
  exclude_player_ids?: string;
  exclude_allies?: string;
  exclude_ally_tags?: string;
  exclude_ally_ids?: string;

  include_barbarians?: boolean;
  boundaries_circle?: BoundaryCircle[];
  boundaries_box?: BoundaryBox[];

  blocking_enabled?: boolean;
  blocking_local?: BlockingLocal;
  blocking_global?: BlockingGlobal[];

  skip_night_bonus?: boolean;
  date_ranges?: DateRange[];

  changing_village_enabled: boolean;
}
