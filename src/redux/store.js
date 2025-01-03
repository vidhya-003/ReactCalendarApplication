
import {configureStore} from '@reduxjs/toolkit'
import companyReducer from '../redux/companySlice';
import communicationReducer from '../redux/commmunicationSlice'

const store = configureStore({
    reducer: {
      companies: companyReducer,
      communications: communicationReducer,
    },
  });
export default store;
