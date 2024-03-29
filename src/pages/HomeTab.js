import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EUnitCalculator from "../euc/EUnitCalculator";
import { CURRENT_TAB_KEY } from "../constant/Constant";
import Statics from "../statics/Statics";
import { EmiCalculator } from "../emi/EmiCalculator";
import Stock from "../stockanalyzer/Stock";
import { RentTrackerPage } from "../renttracker/RentTrackerPage";
import { GrowthCalculator } from "../growth/GrowthCalculator";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function HomeTab(props) {
  const saveTab = (value) => {
    localStorage.setItem(CURRENT_TAB_KEY, value);
  };

  const getCurrentTab = () => {
    return localStorage.getItem(CURRENT_TAB_KEY);
  };

  const [value, setValue] = React.useState(1);
  const currentTab = Number(getCurrentTab()) || 1;

  React.useEffect(() => {
    console.log("tab value", currentTab);
    setValue(currentTab);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    saveTab(newValue);
  };

  return (
    <Box className="tab-wrapper">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered={true}
          variant="scrollable"
          scrollButtons="auto"
        >
          {" "}
          <Tab label="EMI" value={4} />
          <Tab label="E-Unit" value={2} />
          <Tab label="Statics" value={3} />
          <Tab label="Stock" value={1} />
          <Tab label="Rent-Tracker" value={6} />
          <Tab label="Growth" value={7} />
          <Tab label="Probability" value={5} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={1}>
        <Stock />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EUnitCalculator />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Statics />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <EmiCalculator />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <div>Comming soon...</div>
      </TabPanel>

      <TabPanel value={value} index={6}>
        <RentTrackerPage />
      </TabPanel>

      <TabPanel value={value} index={7}>
        <GrowthCalculator />
      </TabPanel>
    </Box>
  );
}
