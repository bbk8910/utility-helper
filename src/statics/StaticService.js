export function getSum(values) {
  return values.reduce((acc, val) => acc + val, 0);
}

export function calculateMean(sum, lenght) {
  return sum / lenght;
}

//to  measure of central tendency in a set of data.
export function calculateMedian(values, lenght) {
  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(lenght / 2);

  if (lenght % 2 === 0) {
    return (values[half - 1] + values[half]) / 2;
  } else {
    return values[half];
  }
}

// defined as the value that has higher frequency in a given set of values. It is the value that appears the most number of times
export function calculateMode(values, lenght) {
  const counts = {};

  for (let i = 0; i < lenght; i++) {
    const value = values[i];
    counts[value] = counts[value] ? counts[value] + 1 : 1;
  }

  let maxCount = 0;
  let modes = [];

  for (const value in counts) {
    if (counts.hasOwnProperty(value)) {
      const count = counts[value];
      if (count > maxCount) {
        maxCount = count;
        modes = [value];
      } else if (count === maxCount) {
        modes.push(value);
      }
    }
  }

  return modes;
}

export function getLargest(values) {
  return Math.max(...values);
}

export function getSmallest(values) {
  return Math.min(...values);
}

// The range is a measure of dispersion in a set of data, which is defined as the difference between the maximum and minimum values in the set.
// In other words, it represents the spread or extent of the values in the data.

export function calculateRange(min, max) {
  return max - min;
}

export function calculateGeometricMean(values, length) {
  const product = values.reduce((acc, num) => acc * num);
  return Math.pow(product, 1 / length);
}

export function calculateSampleVariance(values, mean, length) {
  return (
    values.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / (length - 1)
  );
}

export function calculatePopulationVariance(values, mean, length) {
  return values.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / length;
}

export function calculatePopulationStandardDeviation(populationVariance) {
  return Math.sqrt(populationVariance);
}

export function calculateSampleStandardDeviation(sampleVariance) {
  return Math.sqrt(sampleVariance);
}
