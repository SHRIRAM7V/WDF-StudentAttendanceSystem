import React, {useContext, useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import types from '../../actions/types'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {signin} from '../../actions/lecturerAction'
import {LecturerContext} from '../../context/LecturerContext'
import {useHistory} from 'react-router-dom'

import {ErrorContext} from '../../context/ErrorContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor:"#3f51b5";
  },
}));

export default function SignIn() {
  const history = useHistory()

  const [login, setLogin] = useState({
    email: null,
    password: null
  })

  const {state, dispatch} = useContext(LecturerContext)
  const {errorState, errorDispatch} = useContext(ErrorContext)

  const classes = useStyles();

  const handleSignin = (event) => {
    setLogin({...login, [event.target.name]: event.target.value})
  }

  const handleSigninSubmit = () => {
    signin({errorDispatch, dispatch, login})
    if(state.isAuthenticated){
      history.push("/dashboard")
    }else{
      // console.log(errorState)
    }

  }

  useEffect(() => {
    errorDispatch({
      type: types.CLEAR_ERRORS
    })
  }, [login])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {errorState.length > 0 ? <Alert severity="error">{errorState}</Alert> : ""}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={login.email}
            onChange={handleSignin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={login.password}
            onChange={handleSignin}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSigninSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}