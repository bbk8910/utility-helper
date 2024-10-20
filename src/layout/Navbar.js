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
  return (
    <nav>
        <div class="logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/utility-helper"
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

    </nav>
  );
}
export default Navbar;
