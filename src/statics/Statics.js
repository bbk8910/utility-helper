import * as React from "react";

import { Grid, Stack, TextareaAutosize } from "@mui/material";
import { Calculate } from "@mui/icons-material";
import { useStyles } from "../constant/ThemeProvider";
import { ServiceButton } from "../component/ServiceButton";
import StaticResult from "./StaticResult";
import {
  calculateGeometricMean,
  calculateMean,
  calculateMedian,
  calculateMode,
  calculatePopulationStandardDeviation,
  calculatePopulationVariance,
  calculateRange,
  calculateSampleStandardDeviation,
  calculateSampleVariance,
  getLargest,
  getSmallest,
  getSum,
} from "./StaticService";
export default function Statics(props) {
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const [result, setResult] = React.useState({});

  function calculateStatics(values) {
    console.log(values);
    const length = values.length;
    const sum = getSum(values);
    const mean = calculateMean(sum, length);
    const median = calculateMedian(values, length);
    const mode = calculateMode(values, length);
    const largest = getLargest(values);
    const smallest = getSmallest(values);
    const range = calculateRange(smallest, largest);
    const geometricMean = calculateGeometricMean(values, length);
    const sampleVariance = calculateSampleVariance(values, mean, length);
    const variance = calculatePopulationVariance(values, mean, length);
    const populationSD = calculatePopulationStandardDeviation(variance);
    const sampleSD = calculateSampleStandardDeviation(sampleVariance);
    const staticsResult = {
      count: length,
      sum: sum,
      mean: mean,
      median: median,
      mode: mode,
      min: smallest,
      max: largest,
      range: range,
      geometricMean: geometricMean,
      sampleVariance: sampleVariance,
      variance: variance,
      populationSD: populationSD,
      sampleSD: sampleSD,
    };
    setResult(staticsResult);

    console.log("Statics result:", staticsResult);
  }
  return (
    <div className="static-wrapper">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const staticsData = new FormData(event.target).get("staticsData");
          const numberArray = staticsData
            .split(",")
            .filter((str) => !isNaN(str))
            .map((str) => parseInt(str));

          calculateStatics(numberArray);
        }}
        className="static-form"
      >
        <TextareaAutosize
          placeholder="Enter your data set in csv format eg: 1, 2, 3"
          name="staticsData"
          required
          style={{ width: "100%", minHeight: 174 }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", mt: 3 }}
        >
          <ServiceButton
            className={classes.button}
            loading={loading}
            name={"Calculate"}
            icon={<Calculate />}
            type={"submit"}
          />
          <ServiceButton
            className={classes.button}
            variant="outlined"
            type="reset"
            name={"Reset"}
            variant={"outlined"}
          />
        </Stack>
      </form>
      <div className="static-result">
        <StaticResult result={result} />
      </div>
    </div>
  );
}
