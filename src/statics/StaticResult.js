import { Paper } from "@material-ui/core";
import { Grid } from "@mui/material";
import * as React from "react";
import { useStyles } from "../constant/ThemeProvider";
export default function StaticResult(props) {
  const { result } = props;
  console.log("Result: {}", result);
  let mode = result.mode;
  if (mode) {
    mode =
      result.mode.value + ", appeared " + result.mode.occurrence + " times";
  } else {
    mode = "";
  }

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <div className={"emi-summary-info-head-txt"}>
        <span>STATICS RESULT </span>
      </div>
      <div className={"emi-summary-info-txt"}>
        <div>
          <span>Count</span>
          <span className="detail-value"> {result.count || "--"}</span>
        </div>
        <div>
          <span>sum</span>
          <span className="detail-value"> {result.sum || "--"}</span>
        </div>
        <div>
          <span>Mean(Average)</span>
          <span className="detail-value"> {result.mean || "--"}</span>
        </div>
        <div>
          <span>Median</span>
          <span className="detail-value">{result.median || "--"}</span>
        </div>
        <div>
          <span>Mode</span>
          <span className="detail-value">{mode || "--"}</span>
        </div>
        <div>
          <span>Largest</span>
          <span className="detail-value">{result.max || "--"}</span>
        </div>
        <div>
          <span>Smallest</span>
          <span className="detail-value">{result.min || "--"}</span>
        </div>

        <div>
          <span>Range</span>
          <span className="detail-value">{result.range || "--"}</span>
        </div>
        <div>
          <span>Geometric Mean</span>
          <span className="detail-value">{result.geometricMean || "--"}</span>
        </div>
        <div>
          <span>Population Variance</span>
          <span className="detail-value">{result.variance || "--"}</span>
        </div>
        <div>
          <span>Population Standard Deviation</span>
          <span className="detail-value">{result.populationSD || "--"}</span>
        </div>
        <div>
          <span>Sample Variance</span>
          <span className="detail-value">{result.sampleVariance || "--"}</span>
        </div>
        <div>
          <span>Sample Standard Deviation</span>
          <span className="detail-value">{result.sampleSD || "--"}</span>
        </div>
      </div>
    </Grid>
  );
}
