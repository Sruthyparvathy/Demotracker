import React, { useEffect, useState, useContext }  from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormDialog from '../components/ECategory';
import './card.css';
import * as API from '../constants/Api';
import axios from 'axios';
import {UserContext} from './Context';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles( (theme) => ({
 
  drawerPaper:{
   width:"67%",
   backgroundColor:"#F35B8C",
   marginLeft:"31.5%",
   //marginRight:"50px",
   height:"100%",
  },
 

  root: {
    flexGrow: 1,
    marginLeft:"45px",
    marginRight:"35px",
    width:"470px",
  },

  paper: {
    flexDirection:'row',
    marginLeft:"2px",
    marginRight:"1px",
    paddingTop:"35px",
    textAlign:"center",
    position:"justify",
    color:"#F35B8C",
    padding:"10px",
    height:"95px",width:"95px",
    marginBottom:"2px",marginTop:"1px",
    backgroundColor:"#ffcce6"
    //backgroundColor:"#ecc1c1"
  },
}));
  
export default  function  SelectCategory(props) {
  const [count,setCount] = useState(1);
  const {opend,setOpend,setCatname,setSelex} = useContext(UserContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(API.CAT_LIST_EXPENSE,{ params: {userId:props.message}})
      .then(response  => setData(response.data));
  },[count,props.message]);

  const addCategory = () =>{
    setCount(count+1);
  }

 const onPaperClick = (text) =>{
    console.log({text});
 setCatname(text.CATEGORY_NAME);
 setSelex(text.ID);
 setOpend(false); 
  }

  const classes = useStyles();
 

const handleClose = () =>{
    setOpend(false);
}
  
// display category names
  const list = (
    <div>
      <Drawer  classes={{ paper: classes.drawerPaper}} variant='persistent' anchor='top' open={opend} onClose={handleClose} > 
    <div className={classes.categorylist}>
          <p style={{marginTop:"55px",color:"#f1f1f1",marginLeft:"90px"}}> Select Category</p>
          {/* <DeleteIcon className={classes.delete} onClick={deleteCategory}/> */}
          <Grid container className={classes.root} >
      <Grid item xs={10}>
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