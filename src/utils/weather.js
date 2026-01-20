export function getManilaTemperature(date = new Date()) {
  const hour = date.getHours();

  let baseTemp;

  if (hour >= 5 && hour < 9) {
    baseTemp = 27;
  } else if (hour >= 9 && hour < 15) {
    baseTemp = 32;
  } else if (hour >= 15 && hour < 18) {
    baseTemp = 33;
  } else if (hour >= 18 && hour < 22) {
    baseTemp = 30;
  } else {
    baseTemp = 27;
  }

  const variation = Math.floor(Math.random() * 3) - 1;
  return baseTemp + variation;
}
