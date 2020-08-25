import React, { useEffect, useState , useContext}  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormDialog from '../components/ICategory';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles( (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"100px",
    marginRight:"20px",
    width:"450px",
    
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"35px",
    textAlign:"center",
    color:"#69B5FF",
    padding:"10px",
    height:"95px",width:"95px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#e6f3ff",
  },
  drawerPaper:{
    width:"67%",
    backgroundColor:"#69B5FF", 
    marginLeft:"31.5%",
    height:"100%",
   },
textField: {
  marginLeft: -5,
  marginRight: theme.spacing.unit,
  width: 470,
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
}));
  



export default  function  IncomeCategory(props) {
 const [count,setCount] = useState(1);
 const {openi,setOpeni,setCatname,setSelex} = useContext(UserContext);
  const [data, setData] = useState([]);

  //list categories api
  useEffect(() => {
    axios
      .get(API.CAT_LIST_INCOME,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[count,props.message]);

  const addCategory = () =>{
    setCount(count+1);
  }

  //set category name and category id on clicking drawer component
 const onPaperClick = (text) =>{
    console.log({text});
    setCatname(text.CATEGORY_NAME);
    setSelex(text.ID);
    setOpeni(false); 
  }

  const classes = useStyles();
  
  const handleClose = () =>{
    setOpeni(false);
}

 

  const list  = (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={openi} onClose={handleClose} >
    <div className={classes.categorylist}>
          <p style={{marginTop:"55px",color:"#f1f1f1",marginLeft:"100px"}}> Select Category</p>
          <Grid container className={classes.root} >
      <Grid item xs={8}>
        <Grid container justify="center" spacing={0.5}>
          {data.map((text) => (
            <Grid key={text.ID} item>
             <Paper  className={classes.paper} onClick={() =>onPaperClick(text)} >
              <Typography  variant='body2'> {text.CATEGORY_NAME} </Typography>
                </Paper>
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
    
        <React.Fragment >
             
            {list}
       
        </React.Fragment>
    
    </div>
  );
  
}
