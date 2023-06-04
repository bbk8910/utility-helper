import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DialogContentText } from "@material-ui/core";
import { Button } from "@mui/material";
export function EmiDetail(props) {
  const { details, open, closeOpen } = props;

  return (
    <Dialog
      open={open}
      onClose={closeOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={1000}
    >
      <DialogTitle id="alert-dialog-title">Stock Detail</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={"table-header"}>
                  <TableCell align={"center"}>Month</TableCell>
                  <TableCell align="center" className={"table-header"}>
                    Intrest
                  </TableCell>
                  <TableCell align="center" className={"table-header"}>
                    Principal
                  </TableCell>
                  <TableCell align="center" className={"table-header"}>
                    Total Payable
                  </TableCell>
                  <TableCell align="center" className={"table-header"}>
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
          </TableContainer>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeOpen} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
