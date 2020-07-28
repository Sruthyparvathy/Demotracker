import {createStore} from 'redux';
import incomeReducer from './redux/IncomeReducer';

const store = createStore( incomeReducer)

export default store
