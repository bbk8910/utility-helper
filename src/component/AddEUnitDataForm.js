import React from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

import { Save } from "@material-ui/icons";
import { Stack } from "@mui/material";

import { useForm } from "react-hook-form";
import { E_UNIT_STORE, saveData } from "../dao/utilityDao";
import { ServiceButton } from "./ServiceButton.js";
import MySnackBar from "./SnackBar.js";
import { calculateTotalConsumeUnitInKWh } from "../service/EUnitService";
import { MONTH_IN_DAYS, WEEK_IN_DAYS } from "../constant/Constant";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(0),
  },
  dynamicField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(2),
  },
  item: {
    padding: theme.spacing(2),
  },
}));

export default function AddEUnitDataForm(props) {
  const { formData, setFormData } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formData,
  });

  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);

  const [snackBarController, setSnackBarController] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name, vlaue", name, value);
    register(name, { required: true, value });
  };

  const save = (data) => {
    setLoading(true);
    formData.id = data.id;
    formData.watt = data.watt;
    formData.useTimeInHour = data.useTimeInHour;
    formData.totalConsumeUnitInWeek = calculateTotalConsumeUnitInKWh(
      data.watt,
      data.useTimeInHour,
      WEEK_IN_DAYS
    );
    formData.totalConsumeUnitInMonth = calculateTotalConsumeUnitInKWh(
      data.watt,
      data.useTimeInHour,
      MONTH_IN_DAYS
    );

    saveData(formData, E_UNIT_STORE)
      .then(() => {
        handleSuccessSnackBar("Success");
      })
      .catch((error) => {
        console.log("eroro---", error);
        handleErrorSnackBar("Error occurred");
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  function handleSuccessSnackBar(message) {
    setSnackBarController((prevState) => ({
      ...prevState,
      open: true,
      message: message,
      severity: "success",
    }));
  }

  function handleErrorSnackBar(message) {
    setSnackBarController((prevState) => ({
      ...prevState,
      open: true,
      message: message,
      severity: "error",
    }));
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Add Item
      </Typography>
      <form onSubmit={handleSubmit(save)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Device Name"
              name="id"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("id", { required: true })}
              error={errors.id ? true : false}
              helperText={
                errors.id?.type === "required" && "This filed is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Watt"
              name="watt"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("watt", { required: true })}
              error={errors.watt ? true : false}
              helperText={
                errors.watt?.type === "required" && "This field is required"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id="formatted-numberformat-input"
              variant="outlined"
              fullWidth
              className={classes.textField}
              label="Daily usage hours"
              name="useTimeInHour"
              inputProps={{ type: "number", step: ".01" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleInputChange}
              {...register("useTimeInHour", { required: true })}
              error={errors.useTimeInHour ? true : false}
              helperText={
                errors.useTimeInHour?.type === "required" &&
                "This field is required"
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Stack direction="row" spacing={1}>
              <ServiceButton
                className={classes.button}
                onClick={handleSubmit}
                loading={loading}
                name={"save"}
                icon={<Save />}
              />
              <Button variant="outlined" type="reset">
                Reset
              </Button>
            </Stack>
          </Grid>
          <MySnackBar
            snackBarController={snackBarController}
            setSnackBarController={setSnackBarController}
          />
        </Grid>
      </form>
    </Box>
  );
}
