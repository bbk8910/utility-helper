import { Box } from "@material-ui/core";
import React, { useEffect } from "react";

import MyTable from "../component/table/MyTable";
import { E_UNIT_STORE, getAllData } from "../dao/utilityDao";
import AddEUnitDataForm from "../component/AddEUnitDataForm";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Edit } from "@material-ui/icons";

export default function EUnitCalculator(prosp) {
  const [dataList, setDataList] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const action = true;

  useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    getAllData(E_UNIT_STORE).then((data) => {
      let totalInWeek = 0;
      let totalInMonth = 0;
      data?.forEach((item) => {
        totalInWeek += item.totalConsumeUnitInWeek;
        totalInMonth += item.totalConsumeUnitInMonth;
      });

      data.totalInWeek = totalInWeek.toFixed(2);
      data.totalInMonth = totalInMonth.toFixed(2);
      setDataList(data);
    });
  }

  const columns = [
    { field: "id", headerName: "Deivece_Name" },
    { field: "watt", headerName: "Watts" },
    { field: "useTimeInHour", headerName: "Use(hour)" },
    {
      field: "totalConsumeUnitInWeek",
      headerName: "Kwh(week)",
    },
    {
      field: "totalConsumeUnitInMonth",
      headerName: "Kwh(month)",
    },
    {
      field: "view",
      headerName: "Actions",
      width: 165,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {action ? (
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => {
                setFormData(params.row || {});
              }}
            >
              Edit
            </Button>
          ) : null}
        </Stack>
      ),
    },
  ];

  const footer = () => {
    return (
      <div>
        <div>
          <span className="span-key">Weekly: </span>
          <span className="span-value">{200} Kwh</span>
        </div>
        <div>
          <span className="span-key">Monthly: </span>
          <span className="span-value">{200} Kwh</span>
        </div>
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%" }} className="page-wrapper">
      <div className="my-form">
        <AddEUnitDataForm formData={formData} />
      </div>
      <div className="my-table">
        <MyTable
          columns={columns}
          dataList={dataList}
          setDataList={setDataList}
          setFormData={setFormData}
          formData={formData}
          action={action}
          footer={footer}
        />
      </div>
    </Box>
  );
}
