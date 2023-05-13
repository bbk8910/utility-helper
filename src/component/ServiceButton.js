import { LoadingButton } from "@mui/lab";
import { Fab } from "@mui/material";

export function ServiceButton(props) {
  const {
    loading,
    onClick,
    type,
    name,
    className,
    icon,
    variant,
    color,
    disabled,
    size,
  } = props;
  return (
    <Fab
      variant="extended"
      // className={className}
      onClick={onClick}
      loading={loading}
      size={size || "medium"}
      color={color}
      aria-label="add"
      type={type}
      disabled={disabled}
    >
      {icon}
      {name}
    </Fab>
  );
}
