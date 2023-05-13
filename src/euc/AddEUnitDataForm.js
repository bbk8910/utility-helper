import React from "react";
import { Grid, TextField, Box } from "@material-ui/core";

import { SaveAltSharp } from "@material-ui/icons";
import { Stack } from "@mui/material";

import { useForm } from "react-hook-form";
import { E_UNIT_STORE, saveData } from "../dao/utilityDao";
import { ServiceButton } from "../component/ServiceButton.js";
import MySnackBar from "../component/SnackBar.js";
import { calculateTotalConsumeUnitInKWh } from "./EUnitService";
import { MONTH_IN_DAYS, WEEK_IN_DAYS } from "../constant/Constant";
import { useStyles } from "../constant/ThemeProvider";
import { ClearAll } from "@mui/icons-material";

export default function AddEUnitDataForm(props) {
  const { formData, setFormData, onActionCompleted } = props;
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formData,
  });

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
        onActionCompleted();
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
    <Box>
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
              className={classes.textField}
              label="Watt"
              name="watt"
              inputProps={{ type: "number", step: ".01" }}
              fullWidth
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

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <ServiceButton
                className={classes.button}
                onClick={handleSubmit}
                loading={loading}
                color={"primary"}
                name={"save"}
                type={"submit"}
                icon={<SaveAltSharp sx={{ mr: 1 }} />}
              />
              <ServiceButton
                variant="outlined"
                type="reset"
                name={"Reset"}
                color={""}
                icon={<ClearAll sx={{ mr: 1 }} />}
              />
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
