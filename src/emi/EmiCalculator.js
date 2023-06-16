import { Box } from "@mui/material";
import { EmiForm } from "./EmiForm";
import { calculate } from "./EmiService";
import EmiSummary from "./EmiSummary";
import React from "react";
import { EmiDetail } from "./EmiDetail";

export function EmiCalculator(prps) {
  const [emiResult, setEmiResult] = React.useState({
    emi: 0,
    loanAmount: "",
    interestRate: "",
    year: "",
    month: "",
    loanPeriod: "--",
    interestPayable: 0,
    totalPayment: 0,
    details: [],
    enableMoreDetail: false,
  });
  const [snackBarController, setSnackBarController] = React.useState({
    message: "",
    severity: "",
  });

  return (
    <Box className="page-wrapper">
      <div className="page-form">
        <EmiForm
          setEmiResult={setEmiResult}
          snackBarController={snackBarController}
          setSnackBarController={setSnackBarController}
        />
      </div>
      <div className="page-view">
        <EmiSummary emiResult={emiResult} setEmiResult={setEmiResult} />
      </div>
    </Box>
  );
}
