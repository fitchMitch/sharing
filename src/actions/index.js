import {
  SET_REMAINING_MONEY,
  SHOW_FAMILY_FORM,
  SUBMIT_FAMILY_FORM
} from './types';
import Account from '../models/Account';
import Family from '../models/Family';

export let account;
export const setRemainingMoney = formValues => {
  const remainingMoney = formValues.remainingMoney;
  account = new Account(remainingMoney);
  return( {
    type: SET_REMAINING_MONEY,
    payload: remainingMoney
  });
};

export const show_family_form = () => {
  return( {
    type: SHOW_FAMILY_FORM
  });
};

export const submitFamilyForm = formValues => {
  account.addFamily(new Family(formValues));
  console.log(account.showFamilies());
  return( {
    type: SUBMIT_FAMILY_FORM,
    payload: account.showFamilies()
  });
};
// export const createStream = formValues => async  (dispatch, getState ) => {
//   const {userId} = getState().auth;
//   const response = await streams.post('/streams',{...formValues, userId});
//   dispatch( {
//     type: CREATE_STREAM,
//     payload: response.data
//   });
//   history.push('/')
// };
