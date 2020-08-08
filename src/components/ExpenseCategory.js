import React, { useEffect, useState, useContext }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import { TextField } from '@material-ui/core';
import FormDialog from '../components/Category';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';

const useStyles = makeStyles( (theme) => ({
 
  drawerPaper:{
   width:"80.5%",
   backgroundColor:"#F35B8C",
   //marginLeft:"120px",
   //marginRight:"50px",
   height:"100%",
  },
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 445,
    paddingTop: 10,
    marginTop: 20,
    color: "white",
    '& .MuiInput-input':{ color: "white"},
    multilineColor:{
    color:'white'
    },
    '& label.Mui-focused': {
    color: 'white',
    },
    '& label': {
    color: 'white',
    },
    '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
    },
    
    '&:hover fieldset': {
    borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
    borderColor: 'white',
    },
    '&& .MuiInput-root:hover::before': {
    borderColor: 'white',
    } 
    }, 
  root: {
    flexGrow: 1,
    //marginLeft:"55px",
    marginRight:"35px",
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"10px",
    textAlign:"center",
    position:"justify",
    color:"#F35B8C",
    padding:"20px",
    height:"75px",width:"75px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ecc1c1"
  },
}));
  
export default  function  ExpenseCategory(props) {
  const [number,setNumber] = useState(1);
  const {catName} = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API.CAT_LIST_EXPENSE,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[number,props.message]);

  const addCategory = () =>{
    setNumber(number+1);
  }

 const onPaperClick = (text) =>{
    console.log({text});
    props.onCategoryChange(text);
    setState ({category: text.CATEGORY_NAME});
  }

  const classes = useStyles();
  const [state, setState] = React.useState(
    {left:false,
      newChange:false,
      }
  );
 
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  
  const list = (anchor) => (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='temporary' anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} > 
    <div className={classes.categorylist}>
          <p style={{marginTop:"35px",color:"#f1f1f1",marginRight:"150px"}}> Select Category</p>
          <Grid container className={classes.root} >
      <Grid item xs={10}>
        <Grid container justify="center" spacing={0.5}>
          {data.map((text) => (
            <Grid key={text.ID} item>
              <Card className={classes.paper} onClick={() =>onPaperClick(text)} >
          <h6>{text.CATEGORY_NAME}</h6>
                </Card>
            </Grid>
          ))}
          <FormDialog message={props.message} onNewChange = {addCategory}/>
        </Grid>
      </Grid>
     </Grid>
    </div>
    </Drawer>
    </div>
  );

  return (
    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
         <TextField label="Category" name='category' id='category' autoComplete="off"
            required InputLabelProps={{required:false}}
            value={catName}          
            className={classes.textField} onClick={toggleDrawer(anchor, true)} />
          
            {list(anchor)}
       
        </React.Fragment>
      ))}
     
    </div>
  );
  
}