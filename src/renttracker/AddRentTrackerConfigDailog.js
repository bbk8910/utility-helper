import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { useStyles } from "../constant/ThemeProvider";
import { saveConfig } from "./RentTrackerService";
import { useForm } from "react-hook-form";
import { ServiceButton } from "../component/ServiceButton";
import MySnackBar from "../component/SnackBar";
import { ClearAll, SaveAltSharp } from "@material-ui/icons";
export function AddRentConfigDailogue(props) {
  const { formData, setFormData, onActionCompleted, open, closeOpen } = props;
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const [snackBarController, setSnackBarController] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: formData,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name, vlaue", name, value);
    register(name, { required: true, value });
  };

  function saveConfigData(obj) {
    saveConfig(obj).then((response) => {
      onActionCompleted();
      closeOpen();
    });
  }

  function resetForm() {
    setFormData({});
  }

  return (
    <Dialog
      open={open}
      onClose={closeOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={1000}
    >
      <DialogTitle id="alert-dialog-title">Save Config</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(saveConfigData)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="formatted-numberformat-input"
                variant="outlined"
                fullWidth
                className={classes.textField}
                label="Amount"
                name="amount"
                inputProps={{ type: "number", step: ".01" }}
                onChange={handleInputChange}
                {...register("amount", { required: true })}
                error={errors.amount ? true : false}
                helperText={
                  errors.amount?.type === "required" && "This filed is required"
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={1}>
                <ServiceButton
                  className={classes.button}
                  loading={loading}
                  color={"primary"}
                  name={"save"}
                  type={"submit"}
                  icon={<SaveAltSharp sx={{ mr: 1 }} />}
                />
                <ServiceButton
                  variant="outlined"
                  type="reset"
                  onClick={resetForm}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={closeOpen} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
