import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Beenhere } from "@material-ui/icons";
const pages = [];
const settings = [
  { name: "Profile", route: "/profile" },
  { name: "Logout", route: "" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);

  return (
    <nav>
      <div className="nav-inner">
        <div class="logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              // display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            UTILITY HELPER
          </Typography>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
