import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Close } from "@mui/icons-material";
import React, { useEffect } from "react";
import { ServiceButton } from "../component/ServiceButton";
import { calculateEMIDetails } from "./EmiService";
export function EmiDetail(props) {
  const { emiResult, setEmiResult } = props;
  const [details, setDetails] = React.useState([]);

  useEffect(() => {
    loadDetail();
  }, []);

  function loadDetail() {
    console.log("emi details", emiResult);
    // const details = await calculateEMIDetails(emiResult);

    calculateEMIDetails(
      emiResult.loanAmount,
      emiResult.interestRate,
      emiResult.loanPeriod
    ).then((result) => {
      console.log("details response", result);
      setDetails(result);
    });
    console.log("details---->", details);
  }

  function handleClose() {
    setEmiResult((prevState) => ({
      ...prevState,
      enableMoreDetail: false,
    }));
  }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow className={"table-head"}>
            <TableCell align={"center"}>Month</TableCell>
            <TableCell align="center" className={"table-head-cell"}>
              Intrest
            </TableCell>
            <TableCell align="center" className={"table-head-cell"}>
              Principal
            </TableCell>
            <TableCell align="center" className={"table-head-cell"}>
              Total Payable
            </TableCell>
            <TableCell align="center" className={"table-head-cell"}>
              Balance
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details?.map((data) => {
            return (
              <TableRow>
                <TableCell align="center">{data.month}</TableCell>
                <TableCell align="center">
                  {Number(data.interest)?.toLocaleString("en-IN")}
                </TableCell>
                <TableCell align="center">
                  {Number(data.principal)?.toLocaleString("en-IN")}
                </TableCell>
                <TableCell align="center">
                  {Number(data.totalPayable)?.toLocaleString("en-IN")}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  {Number(data.balance)?.toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="more-detail-btn">
        <ServiceButton
          onClick={handleClose}
          loading={true}
          color={"error"}
          name={"Close"}
          type={"submit"}
          icon={<Close />}
        />
      </div>
    </TableContainer>
  );
}
