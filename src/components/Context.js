
import React, {createContext, useState} from "react";
 const UserContext = createContext();


const UserProvider = (props) => {

  const [transactionState, setTransactionState] = useState(false);
 const [monthval, setMonthval] = useState(new Date().getMonth()+1);
  const [yearval, setYearval] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());
  const[catName,setCatname] = useState('');
  const[selex,setSelex] = useState('');
  console.log(monthval);
  console.log(yearval);
  console.log(year);
  console.log(transactionState);




 
  
  return (
    <UserContext.Provider value={{
      transactionState,monthval,
              yearval,
              year,catName,setCatname,selex,setSelex,
              setTransactionState,
              setMonthval,
              setYearval,
              setYear   
            }}>
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };



 