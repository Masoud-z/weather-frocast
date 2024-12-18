import { Units } from "../enums/units";

export default function getUnitSign(unit: Units) {
  const units = {
    [Units.Metric]: "C",
    [Units.Scientific]: "K",
    [Units.Fahrenheit]: "F",
  };
  return units[unit];
}
