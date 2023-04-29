import React, { useState } from "react";
import { Paper, Box, IconButton } from "@material-ui/core";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { DeleteForever } from "@material-ui/icons";
import { deleteData, E_UNIT_STORE } from "../dao/utilityDao";
import {
  Pagination,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

export default function EUCTable(props) {
  const { columns, dataList, setDataList, setFormData, formData, action } =
    props;

  const [selectedIds, setSelectionModel] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        <GridToolbarExport />

        {action ? (
          <IconButton
            onClick={() => {
              deleteData(E_UNIT_STORE, selectedIds).then(() => {
                setDataList((r) =>
                  r.filter((x) => !selectedIds.includes(x.id))
                );
              });
            }}
          >
            <DeleteForever
              style={{ color: selectedIds.length ? "red" : "grey" }}
            />
          </IconButton>
        ) : null}
      </GridToolbarContainer>
    );
  }

  function CustomFooter() {
    const totalPages = Math.ceil(dataList.length / pageSize);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    return (
      <div>
        <div
          style={{
            display: "flex",

            alignItems: "center",
            justifyContent: "right",
          }}
        >
          <span>
            Showing {Math.min(pageSize * page, dataList.length)} of{" "}
            {dataList.length}
          </span>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    );
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const visibleRows = [...dataList].slice(startIndex, endIndex);

  return (
    <Box style={{ width: "100%" }} component={Paper}>
      <DataGrid
        rows={visibleRows}
        columns={columns}
        checkboxSelection
        components={{
          Toolbar: CustomToolbar,
          Footer: CustomFooter,
        }}
        onRowSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        renderFooter={() => <CustomFooter />}
      />

      <TableContainer component={Paper}>
        <table>
          <TableBody>
            <TableRow key={"key"}>
              <TableCell>{"Weekly"}</TableCell>
              <TableCell>{dataList.totalInWeek || 0}Kwh</TableCell>
            </TableRow>

            <TableRow key={"key2"}>
              <TableCell>{"Monthly"}</TableCell>
              <TableCell>{dataList.totalInMonth || 0}Kwh</TableCell>
            </TableRow>
          </TableBody>
        </table>
      </TableContainer>
    </Box>
  );
}
