import React, { useEffect, useState , useContext}  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormDialog from '../components/NewCategory';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';

const useStyles = makeStyles( (theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"75px",
    marginRight:"15px",
    width:"450px",
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
    width:"67.5%",
    backgroundColor:"#69B5FF", 
    marginLeft:"420px",
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
  useEffect(() => {
    axios
      .get(API.CAT_LIST_INCOME,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[count,props.message]);

  const addCategory = () =>{
    setCount(count+1);
  }

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

  console.log('data',data);

  const list  = (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={openi} onClose={handleClose} >
    <div className={classes.categorylist}>
          <p style={{marginTop:"55px",color:"#f1f1f1",marginLeft:"75px"}}> Select Category</p>
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
    
        <React.Fragment >
             
            {list}
       
        </React.Fragment>
    
    </div>
  );
  
}
