// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@material-ui/core";
// import { Details } from "@mui/icons-material";
// import { ServiceButton } from "../component/ServiceButton";
// export default function EmiSummary(props) {
//   const { emiResult, setEmiResult } = props;
//   function handleMoreDetail() {
//     setEmiResult((prevState) => ({
//       ...prevState,
//       enableMoreDetail: true,
//     }));
//   }
//   console.log("em lloan per", emiResult.loanPeriod);

//   return (
//     <div style={{ width: "100%" }}>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell id="table-header">Key</TableCell>
//               <TableCell id="table-header">Value</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow key={1}>
//               <TableCell>{"EMI monthly"}</TableCell>
//               <TableCell>{emiResult.emi}</TableCell>
//             </TableRow>

//             <TableRow key={2}>
//               <TableCell>{"Loan payment"}</TableCell>
//               <TableCell>{emiResult.loanPeriod} month</TableCell>
//             </TableRow>

//             <TableRow key={3}>
//               <TableCell>{"Loan Amount"}</TableCell>
//               <TableCell>
//                 {Number(emiResult.loanAmount)?.toLocaleString("en-IN")}
//               </TableCell>
//             </TableRow>

//             <TableRow key={4}>
//               <TableCell>{"Intrest Payable"}</TableCell>
//               <TableCell>
//                 {Number(emiResult.interestPayable)?.toLocaleString("en-IN")}
//               </TableCell>
//             </TableRow>

//             <TableRow key={5}>
//               <TableCell>{"Total Payment"}</TableCell>
//               <TableCell>
//                 {Number(emiResult.totalPayment)?.toLocaleString("en-IN")}
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </TableContainer>
// <div className="more-detail-btn">
//   <ServiceButton
//     onClick={handleMoreDetail}
//     loading={true}
//     color={"primary"}
//     name={"Details"}
//     type={"submit"}
//     disabled={emiResult.loanPeriod > 0 ? false : true}
//     icon={<Details />}
//   />
// </div>
//     </div>
//   );
// }

import React from "react";
import { Typography, Grid, Paper, makeStyles } from "@mui/material";
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

  // return (
  //   <Grid container spacing={3} sx={{ width: "100%" }}>
  // <Grid item xs={12}>
  //   <Paper className={classes.paper}>
  //     <Typography variant="h5" className={classes.title}>
  //       Loan Details
  //     </Typography>
  //         <Grid container spacing={2}>
  //           <Grid item xs={6}>
  //             <Typography variant="body1">
  //               Loan Amount: {emiResult.loanAmount || 0}
  //             </Typography>
  //             <Typography variant="body1">
  //               Interest Rate: {emiResult.interestRate || 0}
  //             </Typography>

  //             <Typography variant="body1">
  //               Interest Payable: {emiResult.interestPayable || 0}
  //             </Typography>
  //           </Grid>
  //           <Grid item xs={6}>
  //             <Typography variant="body1">
  //               Month: {emiResult.loanPeriod}
  //             </Typography>
  //             <Typography variant="body1">
  //               EMI monthly: {emiResult.emi}
  //             </Typography>
  //             <Typography variant="body1">
  //               Total Payment: {emiResult.totalPayment}
  //             </Typography>
  //           </Grid>
  //         </Grid>
  // <div className="more-detail-btn">
  //   <ServiceButton
  //     onClick={handleMoreDetail}
  //     loading={true}
  //     color={"primary"}
  //     name={"Details"}
  //     type={"submit"}
  //     disabled={emiResult.loanPeriod > 0 ? false : true}
  //     icon={<Info />}
  //   />
  // </div>
  //       </Paper>
  //     </Grid>
  //   </Grid>
  // );

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
