import {
  BlockingGlobal,
  BlockingLocal,
  BoundaryBox,
  BoundaryCircle,
  DateRange,
  DateRangePart,
  FakingResult,
  Target,
  Troops,
} from "../types/HermitowskiFejkomat.types";

export function isTroops(value: any): value is Troops {
  const troopTypes = [
    "spear",
    "sword",
    "axe",
    "archer",
    "spy",
    "light",
    "marcher",
    "heavy",
    "ram",
    "catapult",
    "knight",
    "snob",
  ];
  return (
    value &&
    Object.keys(value).every(
      (key) =>
        troopTypes.includes(key) &&
        (typeof value[key] === "number" || value[key] === undefined)
    )
  );
}
export function isTarget(value: any): value is Target {
  return (
    value &&
    typeof value.x === "number" &&
    typeof value.y === "number" &&
    typeof value.player_name === "string" &&
    typeof value.ally_tag === "string" &&
    value.arrival_date instanceof Date
  );
}
export function isFakingResult(value: any): value is FakingResult {
  return value && isTarget(value.target) && isTroops(value.troops);
}
export function isBoundaryCircle(value: any): value is BoundaryCircle {
  return (
    value &&
    typeof value.r === "number" &&
    typeof value.x === "number" &&
    typeof value.y === "number"
  );
}
export function isBoundaryBox(value: any): value is BoundaryBox {
  return (
    value &&
    typeof value.min_x === "number" &&
    typeof value.max_x === "number" &&
    typeof value.min_y === "number" &&
    typeof value.max_y === "number"
  );
}
export function isBlockingLocal(value: any): value is BlockingLocal {
  return (
    value &&
    typeof value.time_s === "number" &&
    typeof value.count === "number" &&
    typeof value.block_players === "boolean" &&
    (typeof value.scope === "string" || value.scope === undefined)
  );
}
export function isBlockingGlobal(value: any): value is BlockingGlobal {
  return (
    value &&
    typeof value.time_s === "number" &&
    typeof value.count === "number" &&
    typeof value.block_players === "boolean" &&
    typeof value.name === "string"
  );
}
export function isDateRangePart(value: any): value is DateRangePart {
  return (
    Array.isArray(value) &&
    value.length === 5 &&
    value.every((item) => typeof item === "number")
  );
}

export function isDateRange(value: any): value is DateRange {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    isDateRangePart(value[0]) &&
    isDateRangePart(value[1])
  );
}
