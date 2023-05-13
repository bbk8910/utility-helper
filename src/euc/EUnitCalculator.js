import { Box } from "@material-ui/core";
import React, { useEffect } from "react";

import MyTable from "./EUCTable";
import { E_UNIT_STORE, getAllData } from "../dao/utilityDao";
import AddEUnitDataForm from "./AddEUnitDataForm";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Edit } from "@material-ui/icons";
import { ServiceButton } from "../component/ServiceButton";

export default function EUnitCalculator(prosp) {
  const [dataList, setDataList] = React.useState([]);
  const [formData, setFormData] = React.useState({});
  const action = true;

  useEffect(() => {
    getDataFromDB();
  }, []);

  function getDataFromDB() {
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

  function onActionCompleted() {
    getDataFromDB();
  }

  const columns = [
    { field: "id", headerName: "Deivece_Name", width: 180 },
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
            <ServiceButton
              size="small"
              variant="contained"
              color="primary"
              icon={<Edit />}
              onClick={() => {
                setFormData(params.row || {});
              }}
            />
          ) : null}
        </Stack>
      ),
    },
  ];

  return (
    <Box className="page-wrapper">
      <div className="my-form">
        <AddEUnitDataForm
          formData={formData}
          onActionCompleted={onActionCompleted}
        />
      </div>
      <div className="eu-table">
        <MyTable
          columns={columns}
          dataList={dataList}
          setDataList={setDataList}
          setFormData={setFormData}
          formData={formData}
          action={action}
        />
      </div>
    </Box>
  );
}
