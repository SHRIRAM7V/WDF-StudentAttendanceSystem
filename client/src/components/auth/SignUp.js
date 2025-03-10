import React, {useState, useContext, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import {ErrorContext} from '../../context/ErrorContext'
import Alert from '@material-ui/lab/Alert';
import types from '../../actions/types'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {signup} from '../../actions/lecturerAction'
import {LecturerContext} from '../../context/LecturerContext'
import {useHistory} from 'react-router-dom'

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()

  const [logup, setLogup] = useState({
    fullName: null,
    email: null,
    password: null,
    phone: null,
    course: null
  })

  const {state, dispatch} = useContext(LecturerContext)

  const handleChange = (event) => {
    setLogup({...logup, [event.target.name]: event.target.value})
  }


  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = () => {
    const {fullName, email, password, phone, course} = logup
    // console.log(logup, !(!fullName || !email || !password || !phone || !course))
    if(!fullName || !email || !password || !phone || !course){
      setErrorMsg("You must enter all fields")
      return;
    }
    signup({errorDispatch, dispatch, logup})
    if(state.isAuthenticated){
      history.push("/dashboard")
    }
  }

  const {errorState, errorDispatch} = useContext(ErrorContext)

  useEffect(() => {
    setErrorMsg("")
    errorDispatch({
      type: types.CLEAR_ERRORS
    })
  }, [logup])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {errorState.length > 0 || errorMsg ? <Alert severity="error">{[...errorState, errorMsg]}</Alert> : ""}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={logup.fullName}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={logup.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={logup.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                value={logup.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="course"
                label="Course Code (e.g MCT504)"
                name="course"
                autoComplete="course"
                value={logup.course}
                onChange={handleChange}
              />
            </Grid>
            
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}