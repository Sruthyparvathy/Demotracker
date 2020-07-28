
import React, {createContext, useState} from "react";
const UserContext = createContext();


const UserProvider = (props) => {

  const [transactionState, setTransactionState] = useState(false);
 const [monthval, setMonthval] = useState(new Date().getMonth()+1);
  const [yearval, setYearval] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());
  console.log(monthval);
  console.log(yearval);
  console.log(year);

  
  return (
    <UserContext.Provider value={{
      transactionState, setTransactionState, monthval,
              yearval,
              year,
              setMonthval,
              setYearval,
              setYear   
            }}>
      {props.children}
    </UserContext.Provider>
  );
}
export { UserContext, UserProvider };



 