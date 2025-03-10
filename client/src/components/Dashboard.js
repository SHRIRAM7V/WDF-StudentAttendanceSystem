import React, {useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import PeopleIcon from '@material-ui/icons/People'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import TableChartIcon from '@material-ui/icons/TableChart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import AssessmentIcon from '@material-ui/icons/Assessment';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

import { Route, useHistory, Redirect, useRouteMatch} from 'react-router-dom'
import Students from './Students'
import Courses from './Courses';
import Logs from './Logs';
import Attendance from './Attendance';
import { signout } from '../actions/lecturerAction';
import {LecturerContext} from '../context/LecturerContext'
import Timetable from './Timetable'
import Assessment from './Assessment'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Dashboard() {
  const history = useHistory()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const {dispatch} = useContext(LecturerContext)

  const {path, url} = useRouteMatch()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignout = () => {
    // Set authentication to false
    signout({dispatch})
    history.push("/signin")
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Class Attendance
          </Typography>
          <Button variant="contained" color="secondary" style={{marginLeft: "auto"}} onClick={handleSignout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={() => history.push(`${url}/students`)}>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary={"Students"} />
            </ListItem>
            <ListItem button onClick={() => history.push(`${url}/attendance`)}>
              <ListItemIcon><SpellcheckIcon /></ListItemIcon>
              <ListItemText primary={"Attendace"} />
            </ListItem>
            <ListItem button onClick={() => history.push(`${url}/assessment`)}>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary={"Assessment"} />
            </ListItem>
            <ListItem button onClick={() => history.push(`${url}/logs`)}>
              <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
              <ListItemText primary={"User Logs"} />
            </ListItem>
            <ListItem button onClick={() => history.push(`${url}/timetable`)}>
              <ListItemIcon><TableChartIcon /></ListItemIcon>
              <ListItemText primary={"Timetable"} />
            </ListItem>
        </List>
        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Switch> */}
          <Route path="/dashboard">
            <Redirect to={`${url}/students`} />
          </Route>
          <Route path={`${path}/students`}>
            <Students />
          </Route>
          <Route path={`${path}/courses`}>
            <Courses />
          </Route>
          <Route path={`${path}/logs`}>
            <Logs />
          </Route>
          <Route path={`${path}/attendance`}>
            <Attendance />
          </Route>
          <Route path={`${path}/assessment`}>
            <Assessment />
          </Route>
          <Route path={`${path}/timetable`}>
            <Timetable />
          </Route>
        {/* </Switch> */}
      </main>
    </div>
  );
}
