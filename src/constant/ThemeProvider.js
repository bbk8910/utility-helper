import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  stickyButton: {
    position: "sticky",
    top: theme.spacing(2), // Adjust the top value as per your requirement
    zIndex: theme.zIndex.drawer + 1, // Ensure the button is above other elements
  },
}));
