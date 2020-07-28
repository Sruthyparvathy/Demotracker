import React, { useEffect, useState }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
//import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
//import { TextField } from '@material-ui/core';
import FormDialog from '../components/Category';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';

const useStyles = makeStyles( (theme) => ({
 
  drawerPaper:{
   width:"450px",
   backgroundColor:"#F35B8C", 
  },
 
textField: {
  marginLeft: theme.spacing.unit,
  marginRight: theme.spacing.unit,
  width: 390,
  paddingTop: 10,
  paddingBottom: 0,
  marginTop: 20,
  marginBottom:0,
  paddingLeft:10,
  paddingRight:10,
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
    marginLeft:"35px",
    marginRight:"15px",
  },
  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"10px",
    textAlign:"center",
    position:"justify",
    color:"#F35B8C",
    padding:"10px",
    height:"75px",width:"75px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ecc1c1"
  },
}));
  
export default  function  ExpenseCategory(props) {
  const [number,setNumber] = useState(1);

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
    <div className={classes.categorylist}>
          <p style={{marginTop:"35px",color:"#f1f1f1",marginLeft:"80px"}}> Select Category</p>
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
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <form  onClick={toggleDrawer(anchor, true)}  style={{color:"#f1f1f1", marginTop:"40px"}}> 
          Category
          </form> 
          <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
     
    </div>
  );
  
}