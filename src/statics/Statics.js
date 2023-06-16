import * as React from "react";

import { Stack, TextareaAutosize } from "@mui/material";
import { Calculate, ClearAll } from "@mui/icons-material";
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
    <div className="page-wrapper">
      <div className="page-form">
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
        >
          <TextareaAutosize
            placeholder="Enter your data set  eg: 1, 2, 3"
            name="staticsData"
            required
            style={{ width: "100%", minHeight: "275px" }}
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <ServiceButton
              className={classes.button}
              color={"primary"}
              loading={loading}
              name={"Calculate"}
              icon={<Calculate sx={{ mr: 1 }} />}
              type={"submit"}
            />
            <ServiceButton
              className={classes.button}
              color={""}
              variant="outlined"
              type="reset"
              name={"Reset"}
              icon={<ClearAll sx={{ mr: 1 }} />}
            />
          </Stack>
        </form>
      </div>
      <div className="page-view">
        <StaticResult result={result} />
      </div>
    </div>
  );
}
