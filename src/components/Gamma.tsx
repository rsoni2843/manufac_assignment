import data from "../data.json";
import ".././App.css";

// Function to calculate Gamma for each point in the dataset
const calculateGamma = (entry: any) => {
  const { Ash, Hue, Magnesium } = entry;
  return (Ash * Hue) / Magnesium;
};

// Function to calculate mean
const calculateMean = (values: number[]) => {
  if (values.length === 0) return 0; // Handle empty array
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// Function to calculate median
const calculateMedian = (values: number[]) => {
  if (values.length === 0) return 0; // Handle empty array
  const sortedValues = values.sort((a, b) => a - b);
  const mid = Math.floor(sortedValues.length / 2);
  return sortedValues.length % 2 !== 0
    ? sortedValues[mid]
    : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
};

// Function to calculate mode
const calculateMode = (values: number[]) => {
  if (values.length === 0) return 0; // Handle empty array
  const counts: Record<number, number> = {};
  values.forEach((value) => {
    counts[value] = (counts[value] || 0) + 1;
  });
  let mode: number | null = null;
  let maxCount = 0;
  Object.entries(counts).forEach(([value, count]) => {
    if (count > maxCount) {
      mode = parseFloat(value);
      maxCount = count;
    }
  });
  return mode !== null ? mode : 0; // Return 0 if mode is not found
};

// Function to calculate statistics for each class
const calculateStatistics = (data: any[]) => {
  const statistics: any = {};

  data.forEach((entry) => {
    const alcoholClass = `Class ${entry.Alcohol}`;
    const gamma = calculateGamma(entry);
    if (!statistics[alcoholClass]) {
      statistics[alcoholClass] = {
        Mean: [],
        Median: [],
        Mode: [],
      };
    }
    statistics[alcoholClass].Mean.push(gamma);
  });

  // Calculate mean, median, and mode for each class
  for (const alcoholClass in statistics) {
    if (statistics.hasOwnProperty(alcoholClass)) {
      const values = statistics[alcoholClass].Mean;
      statistics[alcoholClass].Mean = calculateMean(values);
      statistics[alcoholClass].Median = calculateMedian(values);
      statistics[alcoholClass].Mode = calculateMode(values);
    }
  }

  return statistics;
};

// React component to display statistics in a table
export const GammaStatisticsTable = () => {
  const statistics = calculateStatistics(data);
  const alcoholClasses = Object.keys(statistics);
  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th></th>
          {alcoholClasses.map((alcoholClass, index) => (
            <th key={index}>{alcoholClass}</th>
          ))}
        </tr>
        <tr>
          <th>Mean</th>
          {alcoholClasses.map((alcoholClass, index) => (
            <td key={index}>{statistics[alcoholClass].Mean.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Median</th>
          {alcoholClasses.map((alcoholClass, index) => (
            <td key={index}>{statistics[alcoholClass].Median.toFixed(3)}</td>
          ))}
        </tr>
        <tr>
          <th>Mode</th>
          {alcoholClasses.map((alcoholClass, index) => (
            <td key={index}>{statistics[alcoholClass].Mode.toFixed(3)}</td>
          ))}
        </tr>
      </thead>
    </table>
  );
};
