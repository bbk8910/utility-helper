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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {/* <TableRow>
            <TableCell className="table-header">Key</TableCell>
            <TableCell className="table-header">Value</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {/* {Object.entries(result).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))} */}
          <TableRow key={1}>
            <TableCell>{"Count"}</TableCell>
            <TableCell>{result.count}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Sum"}</TableCell>
            <TableCell>{result.sum}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Mean(Average)"}</TableCell>
            <TableCell>{result.mean}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Median"}</TableCell>
            <TableCell>{result.median}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Mode"}</TableCell>
            <TableCell>{result.mode}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Largest"}</TableCell>
            <TableCell>{result.max}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Smallest"}</TableCell>
            <TableCell>{result.min}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Range"}</TableCell>
            <TableCell>{result.range}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Geometric_Mean"}</TableCell>
            <TableCell>{result.geometricMean}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Standard_Deviation"}</TableCell>
            <TableCell>{result.populationSD}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Variance"}</TableCell>
            <TableCell>{result.variance}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Sample_Standard_Deviation"}</TableCell>
            <TableCell>{result.sampleSD}</TableCell>
          </TableRow>

          <TableRow key={2}>
            <TableCell>{"Sample_Variance"}</TableCell>
            <TableCell>{result.sampleVariance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
