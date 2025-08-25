import React, { Component } from 'react';
import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'
import './App.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';

import { styled, alpha } from '@mui/material/styles';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 0,
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    margin: 0,
    width: '100%',
  },
  table: {
    width: '100%',
  },
  progress: {
    margin: 20
  },
  tableHead: {
    fontSize: '1.0rem'
  }
});
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    customers: '',
    completed: 0,
    searchKeyword: ''
  }
}

stateRefresh = () => {
  this.setState({
    customers: '',
    completed: 0,
    searchKeyword: ''
  });
  this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
}

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));   
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >=100 ? 0 : completed + 1 });
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  render() {
    const filteredComponents = (data) => {
      data = data.filter((c) => {
        return c.name.indexOf(this.state.searchKeyword) > -1;
      });
      return data.map((c)=> {
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
      });
    }
    const { classes } = this.props;
    const cellList = ["Number", "Profile Image", "Name", "DOB", "Gender", "Job", "Setting"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Customer Management System
            </Typography>
              <Box sx={{ flex: 1, minWidth: 0, maxWidth: { xs: '100%', sm: 420 } }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={this.state.searchKeyword}
                  onChange={this.handleValueChange}
              />
            </Search>
            </Box>            
          </Toolbar>
        </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
        <TableContainer component={Paper} className={classes.paper} sx={{ overflowX: 'auto' }}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? 
                filteredComponents(this.state.customers) :
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(App);
