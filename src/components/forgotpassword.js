import React, {Component} from 'react';
import '../styles/Login.css';
import Background from '../image/background.jpg';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import WebFont from 'webfontloader';
import axios from 'axios';
import * as API from '../constants/Api';
import {browserHistory} from 'react-router';


//Method to load the font
WebFont.load({
    google: {
      families: ['Source Sans Pro']
    }
  });

//Declare variable for error message
  
  var errormsg='';
  var errormsg1='';
  var errormsg2='';
  var errormsg3='';
  var errormsg4='';
  var errormsg5='';
  var errormsg6='';
  //class starts here
export default class Registration extends Component{
    // constructers
    constructor(props){
        super(props);
        this.state = {
        User : [],
        emailid:'',
        name:'',
        password:'',
        confirmPassword:'',
        showError: false,
        showError1: false,
        showError2: false,
        showError3: false,
        showError4: false,
        showError5: false,
        showError6:false
      }
    }

    handleChange1 = event => {
        this.setState({ name: event.target.value });
      }
    handleChange2 = event => {
        this.setState({ emailid: event.target.value });
      }
    handleChange3 = event => {
        this.setState({ password: event.target.value });
      }
    handleChange4 = event => {
        this.setState({ confirmPassword: event.target.value });
        console.log(this.state.name);
        console.log(this.state.emailid);
        console.log(this.state.password);
        console.log(this.state.confirmPassword);
      }

      //Function to handle submit an event
    handleSubmit = event => {
        event.preventDefault();
        //var name=this.state.name;
        var emailid=this.state.emailid;
        var password=this.state.password;
        var confirmPassword=this.state.confirmPassword;
        var flag=0;
        this.setState((prevState, props) => {
          return { showError: false, showError1: false,showError2:false,showError3:false,showError4:false,showError5:false }
        })
        if( emailid==='' || password==='' || confirmPassword==='')
            {
                console.log("Empty111111111111.....");
                errormsg1="All fields required!!!";
                this.setState((prevState, props) => {
                    return { showError1: true }
                  })
            }
        
         else{
          if (!/\S+@\S+\.\S+/.test(emailid)) {
            flag=1;
             console.log("Emailerror");
               errormsg2='Email address is invalid!!!';
               this.setState((prevState, props) => {
                //  flag=1;
                   return { showError2: true }
                 })
             }
 
          
          if(!password.match("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}")){
            flag=1;
            
               errormsg4='Password must be strong!!!';
                   this.setState((prevState, props) => {
                    return { showError4: true }
                     })
          }
          else{
            var x=password.localeCompare(confirmPassword);
            if(x!==0){
            flag=1; 
            errormsg5='Passwords must be match!!!';
                   this.setState((prevState, props) => {
                    return { showError5: true }
                     })
          }
        } 
     
        
         if(flag===0){
         
          axios.put(API.REGISTER+ emailid +'/'+ password) 
          
            .then(response => {
            console.log(response)
           
            if(response.status===200)
            {
            if(response.data===1)
            {
            errormsg='Password Updated!!!' ;
            this.setState((prevState, props) => {
              return { showError: true }
            
              
            })
          }
          if(response.data===0)
            {
            errormsg6='Invalid Username!!!' ;
            this.setState((prevState, props) => {
              return { showError6: true }
            
              
            })
          }
        }
        })  
            
            .catch(error => {
             errormsg6='Password not updated!!! '  + error ;
             this.setState((prevState, props) => {
             
              return { showError6: true }

                })
                
               }); 
       }
    }
  }
        

render() {
    return (
        <div>
            {/* Split the left part */}
        <div className="split left">
            <img src={Background} alt="Background"/>
        </div>
        {/* Split the right part */}
        <div className="split right">
        <div>
                {this.state.showError1 && <div className="error-message">{errormsg1} </div>  }        
            </div>
            <div>
                {this.state.showError2 && <div className="error-message">{errormsg2}</div>}        
            </div>
            <div>
                {this.state.showError3 && <div className="error-message">{errormsg3}</div>}        
            </div>
            <div>
                {this.state.showError4 && <div className="error-message">{errormsg4}</div>}        
            </div>
            <div>
                {this.state.showError5 && <div className="error-message">{errormsg5}</div>}        
            </div>
            <div>
                {this.state.showError6  && setTimeout(() => { browserHistory.push('/Login'); }, 2000) && <div className="error-message">{errormsg6} 
                
            </div>} 
             
            </div>
            <div>
                {this.state.showError && setTimeout(() => { browserHistory.push('/Login'); }, 2000) && <div className="msg">{errormsg}</div>}        
            </div>
            <div className='rightcontainer' >
            <h1 WebFont>DEX Expenses</h1>
                <h2 style={{fontFamily:WebFont,fontSize:'18px',fontWeight:'normal'}}>Forgot password</h2>
                <form onSubmit={this.handleSubmit} >
 
                    <Input 
                        type="text"
                        name="emailid"
                        placeholder="Username" 
                        inputProps={{ 'aria-label': 'description' }}
                        style={{width: 445, height: 30,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal',textDecoration:'none'}} 
                        onFocus={{border:"2px solid #37364B"}}
                        onChange={this.handleChange2}
                        value={this.state.emailid}/>
                    <div className="space"></div>
                    <Input 
                        name="password"
                        type="password"
                        placeholder="New Password" 
                        inputProps={{ 'aria-label': 'description' }}
                        style={{width: 445, height:30,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal',textDecoration:'none'}} 
                        onFocus={{border:"2px solid #37364B"}}
                        onChange={this.handleChange3}
                        value={this.state.password}/>
                    <div className="space"></div>
                    <Input 
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password" 
                        inputProps={{ 'aria-label': 'description' }}
                        style={{width: 445, height:30,fontFamily:WebFont,fontSize:'16px',fontWeight:'normal',textDecoration:'none'}} 
                        onFocus={{border:"2px solid #37364B"}}
                        onChange={this.handleChange4}
                        value={this.state.confirmPassword}/>
                                     
                    <div className="space2"></div>

                    <Button  variant="contained" WebFont color="primary" 
                    
                    type="submit"
                    style={{backgroundColor: "#37364B", width:445, height: 50,fontFamily:WebFont,fontSize:'18px',textTransform:'none'}} 
                    >
                       Submit
                       
                    </Button>
        
                </form>
                </div>
        </div>
        
    </div>
    )
}
}