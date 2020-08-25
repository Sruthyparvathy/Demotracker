import React, {Component} from 'react';
import './Style.css';
import './card.css';
import FullWidthTabs from './CenterTab';
import CustomizedTabs from './Tab';
import CheckBox from './CheckBox';
import { UserProvider } from './Context';
import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';
import SettingsIcon from '@material-ui/icons/Settings';
import { Icon } from 'semantic-ui-react'
import {browserHistory} from 'react-router';

class Home extends Component{

  onClicklogout = () => {
  browserHistory.push("/Login");
 
  

  };

    render()
    
    {
        return(
        <div>
          <UserProvider>
        <div className="split1 left1"> <FullWidthTabs message = {this.props.params.id} /> 
        </div>
        
        <div className="split1 center1"style={{overflowX:"hidden", overflowY:"scroll"}} >
        <div className="split1 style"><CheckBox  message = {this.props.params.id} /></div>
        <ExpenseCategory message = {this.props.params.id}  />
        <IncomeCategory message = {this.props.params.id}  />
       </div>
      
       <div className="split1 right1"> 
      
        <div  className = "row">  
       
       <div className = "settings" > <SettingsIcon style={{marginTop:"25px",marginLeft:"-10px"}} /> </div> 
         <div className = "header"> {this.props.params.name}  </div>
        <div className = "exit"> <Icon name='sign-out' size='large' style={{color:"#9370DB",marginTop:"25px",marginLeft:"-10px"}} 
                                  onClick = {this.onClicklogout}/>
                            
         </div>
          </div>
         
               
        <CustomizedTabs  message = {this.props.params.id}/> </div> 
        </UserProvider>
       </div> 
  
        );
    }
}
export default Home;


