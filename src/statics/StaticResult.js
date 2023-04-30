import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import * as React from "react";
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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell className="table-header">Key</TableCell>
            <TableCell className="table-header">Value</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell id="table-header">{"Count"}</TableCell>
            <TableCell id="table-header">{"Sum"}</TableCell>
            <TableCell id="table-header">{"Mean(Average)"}</TableCell>
            <TableCell id="table-header">{"Median"}</TableCell>
            <TableCell id="table-header">{"Mode"}</TableCell>
            <TableCell id="table-header">{"Largest"}</TableCell>
            <TableCell id="table-header">{"Smallest"}</TableCell>
            <TableCell id="table-header">{"Range"}</TableCell>
            <TableCell id="table-header">{"Geometric_Mean"}</TableCell>
            <TableCell id="table-header">{"Variance"}</TableCell>

            <TableCell id="table-header">{"Standard Deviation"}</TableCell>
            <TableCell id="table-header">{"Sample_Variance"}</TableCell>

            <TableCell id="table-header">
              {"Sample Standard_Deviation"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={1}>
            <TableCell>{result.count}</TableCell>
            <TableCell>{result.sum}</TableCell>
            <TableCell>{result.mean}</TableCell>
            <TableCell>{result.median}</TableCell>
            <TableCell>{mode}</TableCell>
            <TableCell>{result.max}</TableCell>
            <TableCell>{result.min}</TableCell>
            <TableCell>{result.range}</TableCell>
            <TableCell>{result.geometricMean}</TableCell>
            <TableCell>{result.variance}</TableCell>

            <TableCell>{result.populationSD}</TableCell>
            <TableCell>{result.sampleVariance}</TableCell>

            <TableCell>{result.sampleSD}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
