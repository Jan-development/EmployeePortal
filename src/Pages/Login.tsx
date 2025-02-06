/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from "react";
import {
  TextField, Button, Box, Container, Paper, Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (login(credentials.username, credentials.password)) {
      navigate("/tasks");
    } else {
      setError("Invalid username or password");
    }
  };

  return (

    <Container maxWidth="xs">
      <Box mt={5}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            required
            fullWidth
            onChange={handleChange}
            margin="normal"
            name="username"
          />
          <TextField
            label="Password"
            type="password"
            required
            fullWidth
            onChange={handleChange}
            margin="normal"
            name="password"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
