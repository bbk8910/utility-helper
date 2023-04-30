export function calculateTotalConsumeUnitInKWh(watt, useHour, daysByTimeUnit) {
  return (watt * useHour * daysByTimeUnit) / 1000;
}
