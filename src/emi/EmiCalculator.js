import { Box } from "@mui/material";
import { EmiForm } from "./EmiForm";
import { calculate } from "./EmiService";
import EmiSummary from "./EmiSummary";
import React from "react";
import { EmiDetail } from "./EmiDetail";

export function EmiCalculator(prps) {
  const [emiResult, setEmiResult] = React.useState({
    emi: 0,
    open: false,
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
  const enableMoreDetail = emiResult.enableMoreDetail;
  const [snackBarController, setSnackBarController] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  function getComponent() {
    return enableMoreDetail ? (
      <Box className="page-wrapper">
        <EmiDetail emiResult={emiResult} setEmiResult={setEmiResult} />
      </Box>
    ) : (
      <Box className="page-wrapper">
        <div className="emi-form">
          <EmiForm
            setEmiResult={setEmiResult}
            snackBarController={snackBarController}
            setSnackBarController={setSnackBarController}
          />
        </div>
        <div className="emi-summary">
          <EmiSummary emiResult={emiResult} setEmiResult={setEmiResult} />
        </div>
      </Box>
    );
  }

  return getComponent();
}
