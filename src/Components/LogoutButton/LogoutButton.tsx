/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;