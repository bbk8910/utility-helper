import { LoadingButton } from "@mui/lab";

export function ServiceButton(props) {
  const { loading, onClick, type, name, className, icon, variant } = props;
  return (
    <LoadingButton
      className={className}
      onClick={onClick}
      endIcon={icon}
      loading={loading}
      loadingPosition="end"
      variant={variant || "contained"}
      type={type}
    >
      <span>{name}</span>
    </LoadingButton>
  );
}
