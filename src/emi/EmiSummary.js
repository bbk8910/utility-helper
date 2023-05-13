import React from "react";
import { Grid, Paper } from "@mui/material";
import { useStyles } from "../constant/ThemeProvider";
import { ServiceButton } from "../component/ServiceButton";
import { Info } from "@material-ui/icons";

export default function EmiSummary(props) {
  const { emiResult, setEmiResult } = props;
  function handleMoreDetail() {
    setEmiResult((prevState) => ({
      ...prevState,
      enableMoreDetail: true,
    }));
  }
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={"emi-summary-info-head-txt"}>
          <span>LOAN PAYMENT SUMMARY </span>
        </div>
        <div className={"emi-summary-info-txt"}>
          <div>
            <span>EMI Monthly</span>
            <span className="detail-value"> {emiResult.emi}</span>
          </div>
          <div>
            <span>Loan Period</span>
            <span className="detail-value"> {emiResult.loanPeriod} month</span>
          </div>
          <div>
            <span>Loan Amount</span>
            <span className="detail-value"> {emiResult.loanAmount}</span>
          </div>
          <div>
            <span>Intrest Payable</span>
            <span className="detail-value">{emiResult.interestPayable}</span>
          </div>
          <div>
            <span>Total Payment</span>
            <span className="detail-value">{emiResult.totalPayment}</span>
          </div>
        </div>
        <div className="more-detail-btn">
          <ServiceButton
            onClick={handleMoreDetail}
            loading={true}
            color={"primary"}
            name={"Details"}
            type={"submit"}
            size={"small"}
            disabled={emiResult.loanPeriod > 0 ? false : true}
            icon={<Info />}
          />
        </div>
      </Paper>
    </Grid>
  );
}
