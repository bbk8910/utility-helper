import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { DoneAllSharp, History, Settings } from "@material-ui/icons";
import {
  getCurrentNepaliDate,
  neplaiMonthNameMap,
  getCurrentYearData,
  saveRentTracker,
  getFormatNepaliDate,
  yearMap,
  loadConfig,
  getFormaedBSDate,
} from "./RentTrackerService";
import { Box, Paper } from "@material-ui/core";
import { Chip, CircularProgress, IconButton } from "@mui/material";
import { AddRentConfigDailogue } from "./AddRentTrackerConfigDailog";
import { useConfirm } from "material-ui-confirm";
import { Link } from "react-router-dom";
import { get } from "react-hook-form";

export function RentTrackerPage(props) {
  const currentNepaliDate = getCurrentNepaliDate();
  const [currentYearMap, setCurrentYearMap] = React.useState(yearMap);
  const [formData, setFormData] = React.useState({});
  const [loadingList, setLoadingList] = React.useState(false);
  const confirm = useConfirm();

  useEffect(() => {
    console.log("Current yer date", currentNepaliDate);
    loadCurrentYearData();
    loadConfigData();
  }, []);

  function loadCurrentYearData() {
    setLoadingList(true);
    const currentYear = getCurrentNepaliDate().year;
    getCurrentYearData(currentYear)
      .then((result) => {
        console.log("Year Response", result);
        const dataList = result;
        Array.from(dataList).map((data) => {
          const month = data.month;

          if (!currentYearMap?.get(month)?.month) {
            const year = data.year;
            const obj = {
              year: year,
              month: month,
              settled: data.settled,
              settledDate: data.settledDate,
              amount: data.amount,
            };

            currentYearMap.set(month, obj);
          }
        });
        setCurrentYearMap(new Map(currentYearMap));
        console.log("current year map", currentYearMap);
        setTimeout(() => {
          setLoadingList(false);
        }, 1000);
      })
      .catch((error) => {
        setLoadingList(false);
      });
  }

  function loadConfigData() {
    loadConfig().then((data) => {
      setFormData(data);
    });
  }

  function handleSettlement(month, reqObj) {
    const nepaliDate = getFormaedBSDate();
    confirm({
      description: `Settlement of ${neplaiMonthNameMap.get(month)}`,
    })
      .then(() => {
        console.log("Month req obj", month, reqObj);
        reqObj.settled = true;
        reqObj.settledDate = nepaliDate;
        reqObj.month = month;
        saveRentTracker(reqObj).then(() => {
          window.location.reload();
        });
      })
      .catch(() => console.log("Deletion cancelled."));
  }

  function getSubText(value) {
    if (value?.settled) {
      return `Paid Rs.15000 on ${value?.settledDate}`;
    }
    return `You owe Rs.${formData?.amount}`;
  }

  function getPrimaryText(key) {
    return `Settlement of ${neplaiMonthNameMap?.get(key)}`;
  }

  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }

  function getStickyReminder() {
    const month = currentNepaliDate.monthIndex;
    const currMonthMapVal = currentYearMap.get(month);
    console.log("curr month---", currMonthMapVal, month);

    if (currMonthMapVal && !currMonthMapVal.settled) {
      return (
        <Box className="buttom-sticky" component={Paper} flex={true}>
          <Typography sx={{ p: 2 }}>
            {`Pending Settlement of ${neplaiMonthNameMap.get(month)}  `}
            <Chip
              label={currMonthMapVal?.settled ? "Settled" : "Settle"}
              disabled={currMonthMapVal?.settled}
              color="success"
              onClick={() => handleSettlement(month, currMonthMapVal)}
            />
          </Typography>
        </Box>
      );
    }
    return null;
  }

  return (
    <Box className="page-wrapper">
      {loadingList ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <List
            sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
          >
            <div className="rt-head">
              <Typography>{`Rent Tracker of ${currentNepaliDate?.year}`}</Typography>
              <div className="rt-action">
                <Link to="/utility-helper/rt/history">
                  <IconButton edge="end" aria-label="comments">
                    <History />
                  </IconButton>
                </Link>
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={handleOpen}
                >
                  <Settings />
                </IconButton>
              </div>
            </div>
            {Array.from(currentYearMap).map(([key, value]) => (
              <div key={key}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box flex={true}>
                      <Chip
                        label={value?.settled ? "Settled" : "Settle"}
                        disabled={value?.settled}
                        color="success"
                        onClick={() => handleSettlement(key, value)}
                      />
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DoneAllSharp style={{ color: "green" }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ paddingRight: 5 }}
                    primary={getPrimaryText(key)}
                    secondary={getSubText(value)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
          {getStickyReminder()}

          <AddRentConfigDailogue
            formData={formData}
            setFormData={setFormData}
            onActionCompleted={loadCurrentYearData}
            open={open}
            closeOpen={handleClose}
          />
        </Box>
      )}
    </Box>
  );
}
