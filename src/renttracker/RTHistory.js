import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ArrowBack, DoneAllSharp } from "@material-ui/icons";
import {
  getCurrentNepaliDate,
  neplaiMonthNameMap,
  getHistory,
} from "./RentTrackerService";
import { Box, CircularProgress } from "@material-ui/core";
import { Chip, IconButton } from "@mui/material";

export function RTHistory(props) {
  const { handleCloseHistory } = props;
  const [historyList, setHistoryList] = React.useState([]);
  const [loadingList, setLoadingList] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setLoadingList(true);
    getHistory()
      .then((result) => {
        console.log("Year Response", result);
        setHistoryList(result);
        setTimeout(() => {
          setLoadingList(false);
        }, 1000);
      })
      .catch((error) => {
        setLoadingList(false);
      });
  }

  function getSubText(value) {
    if (value?.settled) {
      return `Paid Rs.15000 on ${value?.settledDate}`;
    }
    return "";
  }

  function getPrimaryText(key) {
    return `Settlement of ${neplaiMonthNameMap?.get(key)}`;
  }

  return (
    <Box className="page-wrapper">
      {loadingList ? (
        <Box sx={{ display: "flex" }} className="page-wrapper">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="page-wrapper">
          <List
            sx={{
              width: "100%",
              maxWidth: 500,
              bgcolor: "background.paper",
            }}
          >
            <div className="rt-head">
              <div className="rt-action">
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={handleCloseHistory}
                >
                  <ArrowBack />
                </IconButton>
              </div>
              <Typography>History</Typography>
            </div>
            {historyList?.map((data) => (
              <div key={data?.month}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box flex={true}>
                      <Chip
                        label={data?.settled ? "Settled" : "Settle"}
                        disabled={data?.settled}
                        color="success"
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
                    primary={getPrimaryText(data?.month)}
                    secondary={getSubText(data)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
