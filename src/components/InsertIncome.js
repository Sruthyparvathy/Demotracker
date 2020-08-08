import React, {useContext, useState} from 'react';
import axios from 'axios';
import {TextField,Button} from '@material-ui/core/';
import './Style.css';
//import { withStyles } from "@material-ui/core/styles";
import { makeStyles} from '@material-ui/core/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
//import Autocomplete from '@material-ui/lab/Autocomplete';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import * as API from '../constants/Api';
//import IncomeCategory from './IncomeCategory';
//import SelectIncomeCategory from "./Apiexpense";
import {UserContext} from './Context';

var newDate = new Date();
var moment = require('moment');
var dateIn = moment(newDate);
var formatedDate=dateIn.format("YYYY-MM-DD");


//Adding js styles
const useStyles = makeStyles( (theme) => ({
  container: {
      display: 'flex',    
      flexWrap: 'wrap',
      height: "100%",
  },
  datepickerx:{
      width: 150,
      paddingLeft: 70,
      underline: {
          "&&&:before": {
          color: "white"
          },
          "&&:after": {
          color: "white"
          }
          },
          '&& .MuiInput-root:hover::before': {
              borderColor: 'white',
          },
          '& .MuiInput-input':{ color: "white"},
       
          color: "white",
          textEmphasisColor: "white",
          '& .MuiInput-underline:before': {
          borderBottomColor: "white",
          '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
          },
          '& .MuiInput-underline:before': {
              borderBottomColor: 'white',
          },
          multilineColor:{
              color:'white'
          },
          '& label.Mui-focused': {
              color: 'white',
          },
          '& label': {
              color: 'white',
          },
          '&:hover fieldset': {
              borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
              borderColor: 'white',
          },
          
          
          },
      },
  Button:{
      marginLeft:-15,
      marginRight: 10,
      background: 'grey',
      border: 0,
      borderRadius: 3,
      color: "white",
      width:350,
      height: 50,
      marginTop: 25,
      textTransform: 'none',
      backgroundColor: '#37364b',
      borderColor: '#007bff',
      '&:hover': {
      backgroundColor: 'black',
      borderColor: '#0062cc',
      },
      '&:active': {
      boxShadow: 'none',
      backgroundColor: 'black',
      borderColor: '#005cbf',
      
      },
      '&:focus': {
      boxShadow: 'black',
      },
      
      
  },
  textField: {
    marginLeft:-15,
    marginRight: 10,
    width:350,
    paddingTop: 10,
    marginTop: 10,
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
  

    //Included with material ui code for Numberbox
    function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    
      return (
        <NumberFormat
          {...other}
          getInputRef={inputRef}
          onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
          }}
          thousandSeparator
          prefix="₹"
        />
      );
    }
    
    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired,
    };

export default function InsertIncome(props){

    const[date,setDate]=useState(formatedDate);
    const[item,setItem]=useState('');
    const[amount,setAmount]=useState('');
    //const[category,setCategory]=useState('');
    //const[selex,setSelex]=useState('');
    const[open,setOpen]=useState(false);
    //const[catName,setCatname]=useState('');
    const {openi,setOpeni,selex,setSelex,catName,setCatname,setTransactionState}=useContext(UserContext);
   

   const handleClose = () => {
        setOpen(false);
      };
    
      const  handleChange1 = event => {
        setDate(event.target.value);
      }
    
      const  handleChange2 = event => {
        setItem(event.target.value);
      }
    
      const  handleChange3 = event => {
        setAmount(event.target.value);
        
      }
    
      const handleOpeni = () =>{
        setOpeni(true);
        console.log(openi);
      }
      // const handleChange4 = event => {
      //   setCatname(event.target.value);
      // }

      const  handleSubmit = event => {
    
        event.preventDefault();
        console.log("dfdf");
        const fetchData=async()=>{
        const res = await axios.post(API.ADD_INCOME,JSON.stringify({
            "userId":props.message,
            "item" : item,
            "categoryId":selex,
            "amount":amount,
            "transactionDate":date,
          }), {headers: { "Content-Type":"application/json"}});
        
          console.log("res="+res);
          setOpen(true);
          setAmount('');
          setItem('');
          setSelex('');
          setCatname('');
          setDate(formatedDate); 
          setTransactionState(true);} 
          fetchData();
        }

          // const    updateCategory = category  =>{
          //     setSelex(category.ID);
          //     setCatname(category.CATEGORY_NAME);
          //     }
              

              // console.log("xxxxxxxx",options);
            //   console.log(this.context);
            const classes = useStyles();

            return (
                
      
                <div className="textdiv">
                  {/* form starts here */}
                  <form onSubmit={handleSubmit}  >
                 
                      {/* Datepicker */}
                      <label className="labelclass" style={{ marginLeft: -15}}> 
                      Date            
                              <TextField
                              onChange={handleChange1}
                              name="date" 
                              type="date"
                              value={date}
                              className={classes.datepickerx}
                              required                    
                              />
                              <CalendarTodayIcon style={{ fontSize: 25, paddingLeft:80 }}  />
                      </label>
          
                      {/* Item Field */}
                      <TextField 
                        required
                        InputLabelProps={{required: false}}  
                        className={classes.textField} 
                        label="Item" 
                        name="item" 
                        value={item}
                        onChange={handleChange2}/>
          
                      {/* Amount field */}
                      <TextField
                        className={classes.textField}
                        label="Amount"
                        required
                        InputLabelProps={{required: false}}  
                        name="amount"
                        value={amount}
                        onChange={handleChange3}
                        InputProps={{
                          inputComponent: NumberFormatCustom,
                        }}
                  />
                      
                      {/* Category Field */}
                      {/* <IncomeCategory message={props.message} 
            onCategoryChange={handleChange4} catName={catName}/> */}
            <TextField label="Category" name='category' id='category' autoComplete="off"
            required InputLabelProps={{required:false}}
            value={catName}          
            className={classes.textField} onClick={handleOpeni}  />
                      
                      {/* Submit button */}
          
                      <div> 
                       <Button className={classes.Button}  variant="contained" disableElevation type="submit">
                            Add Income
                       </Button>
                        <Snackbar
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                            autoHideDuration={1000}
                            variant="success"
                            message={<span  id="message-id">Income Insertion Successfull</span>}
                      /> 
                     </div>
                  </form>
                </div>
              );

}



// import React from "react";
// import axios from 'axios';
// import {TextField,Button} from '@material-ui/core/';
// import './Style.css';
// import { withStyles } from "@material-ui/core/styles";
// import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
// import NumberFormat from 'react-number-format';
// import PropTypes from 'prop-types';
// import Snackbar from '@material-ui/core/Snackbar';
// import Fade from '@material-ui/core/Fade';
// //import * as API from '../constants/Api';
// import IncomeCategory from '../components/IncomeCategory';
// //import Expense from './Api_Expense';
// import * as API from '../constants/Api';
// import {UserContext} from './Context';

// var newDate = new Date();
//     var moment = require('moment');
//     var dateIn = moment(newDate);
//     var formatedDate=dateIn.format("YYYY-MM-DD");
// //Adding js styles
// const styles = theme => (
//     {
//     container: {
//         display: 'flex',    
//         flexWrap: 'wrap',
//     },
//     datepickerx:{
//         width: 120,
//         underline: {
//             "&&&:before": {
//             color: "white"
//             },
//             "&&:after": {
//             color: "white"
//             }
//             },
//             '&& .MuiInput-root:hover::before': {
//                 borderColor: 'white',
//             },
//             '& .MuiInput-input':{ color: "white"},
//             paddingLeft: 140,
//             color: "white",
//             textEmphasisColor: "white",
//             '& .MuiInput-underline:before': {
//             borderBottomColor: "white",
//             '& .MuiInput-underline:after': {
//                 borderBottomColor: 'white',
//             },
//             '& .MuiInput-underline:before': {
//                 borderBottomColor: 'white',
//             },
//             multilineColor:{
//                 color:'white'
//             },
//             '& label.Mui-focused': {
//                 color: 'white',
//             },
//             '& label': {
//                 color: 'white',
//             },
//             '&:hover fieldset': {
//                 borderColor: 'white',
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: 'white',
//             },
            
            
//             },
//         },
//     Button:{
    
//         background: 'grey',
//         border: 0,
//         borderRadius: 3,
//         color: "white",
//         width:400,
//         height: 50,
//         marginTop: 50,
//         textTransform: 'none',
//         backgroundColor: '#37364b',
//         borderColor: '#007bff',
//         '&:hover': {
//         backgroundColor: 'black',
//         borderColor: '#0062cc',
//         },
//         '&:active': {
//         boxShadow: 'none',
//         backgroundColor: 'black',
//         borderColor: '#005cbf',
        
//         },
//         '&:focus': {
//         boxShadow: 'black',
//         },
        
        
//     },
//     textField: {
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//         width: 390,
//         paddingTop: 10,
//         marginTop: 20,
//         color: "white",
//         '& .MuiInput-input':{ color: "white"},
//         multilineColor:{
//         color:'white'
//         },
//         '& label.Mui-focused': {
//         color: 'white',
//         },
//         '& label': {
//         color: 'white',
//         },
//         '& .MuiInput-underline:after': {
//         borderBottomColor: 'white',
//         },
//         '& .MuiInput-underline:before': {
//         borderBottomColor: 'white',
//         },
        
//         '&:hover fieldset': {
//         borderColor: 'white',
//         },
//         '&.Mui-focused fieldset': {
//         borderColor: 'white',
//         },
//         '&& .MuiInput-root:hover::before': {
//         borderColor: 'white',
//         } 
//         },
//     dense: {
//         marginTop: 19,
//     },
//     menu: {
//         width: 100,
//     },
//     });
    

//     //Included with material ui code for Numberbox
//     function NumberFormatCustom(props) {
//     const { inputRef, onChange, ...other } = props;
    
//       return (
//         <NumberFormat
//           {...other}
//           getInputRef={inputRef}
//           onValueChange={values => {
//           onChange({
//             target: {
//               value: values.value,
//             },
//           });
//           }}
//           thousandSeparator
//           prefix="₹"
//         />
//       );
//     }
    
//     NumberFormatCustom.propTypes = {
//       inputRef: PropTypes.func.isRequired,
//       onChange: PropTypes.func.isRequired,
//     };

//   // class starts here
//   class InsertIncome extends React.Component {
//     static contextType = UserContext;
//     // constructers
//     constructor(props){
//     super(props);
//     this.state = {
//     date: formatedDate,
//     item:'',
//     amount:'',
//     category:'',
//     selex:'',
//     selectedOption: '',
//     ProductData: [] ,
//     open: false,
   
    
//   }
// }
//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   handleChange1 = event => {
//     this.setState({ date: event.target.value });
//     console.log(this.state.date);
//   }

//   handleChange2 = event => {
//     this.setState({ item: event.target.value });
//     console.log(this.state.item);
//     console.log("----------------",this.state.ProductData);
//   }

//   handleChange3 = event => {
//     this.setState({ amount: event.target.value });
//     console.log(this.state.amount);
    
//   }

//   handleChange4 = event => {
//     this.setState({ catname: event.target.value });
//     console.log(this.state.catname);

//   }

//   // handleOptionSelected =  (event, values) => {
//   //   this.setState({selex: values}, () => {
//   //     console.log("0000000000000",this.state.selex);
//   //   });
//   // }

//   //Function to handle submit event
//   handleSubmit = event => {
    
//     event.preventDefault();
//     console.log("dfdf");
//     const {item,amount,selex,date} = this.state;
//     axios.post(API.ADD_INCOME,JSON.stringify({
//       "userId":this.props.message,
//       "item" : item,
//       "categoryId":selex,
//       "amount":amount,
//       "transactionDate":date,
//     }), {headers: { "Content-Type":"application/json"}}) 
//     .then(res => {
//       console.log("res="+res);
//       this.setState({ open: true ,amount:'',item:'',selex:'',catname:'',date:formatedDate});
//       this.context.updateState(this.state.open);
//     })
//   }
  
//   updateCategory = category  =>{ 
// console.log(category);
// this.setState({selex:category.ID, catname:category.CATEGORY_NAME});
//   }

//   render() {
//     const { classes } = this.props;

//     //Mapping result into label and value
   
    
//     return (
      
//       <div class="textdiv">
//         {/* form starts here */}
      
//         <form onSubmit={this.handleSubmit} >
       
//             {/* Datepicker */}
//             <label className="labelclass"> 
//             Date            
//                     <TextField
//                     onChange={this.handleChange1}
//                     name="date" 
//                     type="date"
//                     value={this.state.date}
//                     className={classes.datepickerx}
//                     required                    
//                     />
//                     <CalendarTodayIcon style={{ fontSize: 25, paddingLeft:70 }}  />
//             </label>

//             {/* Item Field */}

//             <TextField 
//               required
//               InputLabelProps={{required: false}}  
//               className={classes.textField} 
//               label="Item" 
//               name="item" 
//               value={this.state.item}
//               onChange={this.handleChange2}/>

//             {/* Amount field */}
//             <TextField
//               className={classes.textField}
//               label="Amount"
//               required
//               InputLabelProps={{required: false}}  
//               name="amount"
//               value={this.state.amount}
//               onChange={this.handleChange3}
//               InputProps={{
//                 inputComponent: NumberFormatCustom,
//               }}
//         />
           
//             <IncomeCategory message={this.props.message} onCategoryChange = {this.updateCategory}/>

//             <TextField style={{marginTop:"-20px"}} autoComplete="off"
//               required
//               InputLabelProps={{required: false}}  
//               className={classes.textField} 
//               name="category" 
//               value={this.state.catname}
//               onChange={this.handleChange4}/>

//             <div> 
//              <Button className={classes.Button}  variant="contained" disableElevation type="submit">
//                   Add Income
//              </Button>
//               <Snackbar
//                   open={this.state.open}
//                   onClose={this.handleClose}
//                   TransitionComponent={Fade}
//                   autoHideDuration={1000}
//                   variant="success"
//                   message={<span  id="message-id">Income Insertion Successfull</span>}
//             /> 
//            </div>
          
//         </form>
//       </div>
     
//     );
//   }
// }
// export default withStyles(styles)(InsertIncome);

