export function movingAverage(values: number[], windowSize: number) {
  if (values.length === 0 || windowSize <= 0) {
    return [];
  }

  const result: number[] = [];
  let windowSum = 0;

  for (let index = 0; index < values.length; index += 1) {
    windowSum += values[index];

    if (index >= windowSize) {
      windowSum -= values[index - windowSize];
    }

    result.push(windowSum / Math.min(windowSize, index + 1));
  }

  return result;
}
