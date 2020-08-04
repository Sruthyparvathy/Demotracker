import React, { useEffect, useState }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {TextField } from '@material-ui/core';
import FormDialog from '../components/NewCategory';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';

const useStyles = makeStyles( (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"45px",
    marginRight:"15px",
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"10px",
    textAlign:"center",
    position:"relative",
    color:"#69B5FF",
    padding:"10px",
    height:"75px",width:"75px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ecc1c1",
  },
  drawerPaper:{
    width:"520px",
    backgroundColor:"#69B5FF", 
    marginLeft:"555px",
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
 const [number,setNumber] = useState(1);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API.CAT_LIST_INCOME,{ params: {userId:props.message}})
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

  console.log('data',data);

  const list = (anchor) => (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='temporary' anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
    <div className={classes.categorylist}>
          <p style={{marginTop:"35px",color:"#f1f1f1",marginLeft:"10px"}}> Select Category</p>
          <Grid container className={classes.root} >
      <Grid item xs={8}>
        <Grid container justify="center" spacing={0.5}>
          {data.map((text) => (
            <Grid key={text.ID} item>
              <Paper className={classes.paper} onClick={() =>onPaperClick(text)} >
          <h6>{text.CATEGORY_NAME}</h6>
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
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <TextField   label= "Category" onClick={toggleDrawer(anchor, true)}  style={{color:"#f1f1f1", marginTop:"40px"}}> 

          </TextField> */}
          <TextField label="Category" name='category' id='category' autoComplete="off"
            required InputLabelProps={{required:false}}
            value={props.catName}          
            className={classes.textField} onClick={toggleDrawer(anchor, true)} />
          
            {list(anchor)}
       
        </React.Fragment>
      ))}
    </div>
  );
  
}
