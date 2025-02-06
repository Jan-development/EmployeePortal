/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import {
  AppBar, Toolbar, Typography, Box
} from "@mui/material";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth } from "../../Context/AuthContext";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        {isAuthenticated && (
          <Box>
            <LogoutButton />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
