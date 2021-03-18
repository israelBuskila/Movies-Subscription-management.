import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Grid,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { useStyles } from "../style/style";
//import {LockOutlinedIcon} from "@material-ui/icons/LockOutlinedIcon";

function Login() {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const submit = async () => {
    let obj = {
      UserName: userName,
      Password: password,
    };
    let response = await axios.post("http://localhost:3001/", obj);

    if (response.data === true) {
      let resp = await axios.post(
        "http://localhost:3001/users/getPermissions",
        {
          userName: userName,
        }
      );

      let userInfo = {
        UserName: obj.UserName,
        FirstName: resp.data.FirstName,
        Login: true,
        Permissions: resp.data.Permissions,
      };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      return history.push("/main");
    } else if (response.data === "User does not exist !") {
      alert(response.data);
      return history.push("/");
    } else {
      alert("Incorrect password !");
      return history.push("/");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
          label="Enter your username"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoFocus
          autoComplete="username"
        />
        <TextField
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Enter your password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          autoComplete="current-password"
        />
        <Button
          className={classes.submit}
          type="button"
          value="login"
          onClick={submit}
          color="primary"
          variant="contained"
          fullWidth
        >
          Login
        </Button>
        <Grid item>
          <Link to={"/createAccount"} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </div>
      {/* <Typography component="h5" variant="h5">
      {err}
    </Typography> */}
    </Container>
  );
}

export default Login;
