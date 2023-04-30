export function getSum(values) {
  return values.reduce((acc, val) => acc + val, 0);
}

export function calculateMean(sum, lenght) {
  return (sum / lenght).toFixed(2);
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
export function calculateMode(arr, lenght) {
  const mode = {};
  let max = 0,
    count = 0;

  for (let i = 0; i < lenght; i++) {
    const item = arr[i];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }

  return { value: max, occurrence: count };
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
  return Math.pow(product, 1 / length).toFixed(2);
}

export function calculateSampleVariance(values, mean, length) {
  return (
    values.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) /
    (length - 1)
  ).toFixed(2);
}
//  It measures the average of the squared differences from the mean. A high variance indicates that the data points are far from the mean, while a low variance indicates that the data points are close to the mean.

// The formula to calculate variance is:

// Variance = (1/n) * Σ(xi - x̄)^2

// where n is the number of data points, xi is the i-th data point, x̄ is the mean of the data, and Σ is the sum from i=1 to n.

// In other words, you calculate the difference between each data point and the mean, square each difference, sum the squared differences, and divide by the number of data points.

// Variance is often used in conjunction with standard deviation to provide a more complete picture of the spread of a data set. The standard deviation is the square root of the variance.

export function calculatePopulationVariance(values, mean, length) {
  const result =
    values.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / length;
  return result.toFixed(2);
}

export function calculatePopulationStandardDeviation(populationVariance) {
  return Math.sqrt(populationVariance).toFixed(2);
}

export function calculateSampleStandardDeviation(sampleVariance) {
  return Math.sqrt(sampleVariance).toFixed(2);
}
