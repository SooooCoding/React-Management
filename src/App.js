import React, { Component } from 'react';
import Customer from './components/Customer'
import './App.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { withStyles } from '@mui/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 24,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
{
  'id': 1,
  'image': 'https://randomuser.me/api/portraits/men/1.jpg',
  'name': 'John Smith',
  'birthday': '22/Dec/1996',
  'gender' : 'Male',
  'job' : 'Student'
},
{
  'id': 2,
  'image': 'https://randomuser.me/api/portraits/women/1.jpg',
  'name': 'Emma Wilson',
  'birthday': '15/Aug/1995',
  'gender' : 'Female',
  'job' : 'Software Developer'
},
{
  'id': 3,
  'image': 'https://randomuser.me/api/portraits/men/2.jpg',
  'name': 'James Brown',
  'birthday': '03/Apr/1997',
  'gender' : 'Male',
  'job' : 'Graphic Designer'
}
]

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} /> ) } ) }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
