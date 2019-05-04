import {
  SET_REMAINING_MONEY,
  SHOW_FAMILY_FORM,
  SUBMIT_FAMILY_FORM,
  LIST_FAMILIES,
  SHOW_RESOLVE_BUTTON,
  RESOLVE_ACTION
} from './types';
import Account from '../models/Account';
import Family from '../models/Family';

export let account = new Account(0);
export const setRemainingMoney = formValues => {
  const remainingMoney = formValues.remainingMoney;

  account.addFamily(new Family({
    familyName: "Cagnotte", familyMoneySpent: -remainingMoney
  }));
  return( {
    type: SET_REMAINING_MONEY,
    payload: account.showFamilies()
  });
};

export const showFamilyForm = () => {
  return( {
    type: SHOW_FAMILY_FORM
  });
};

export const submitFamilyForm = formValues => {
  account.addFamily(new Family(formValues));
  return( {
    type: SUBMIT_FAMILY_FORM,
    payload: account.showFamilies()
  });
};

export const listFamilies = () => {
  return({
    type: LIST_FAMILIES
  })
}

export const showResolveButton = () => {
  return({
    type: SHOW_RESOLVE_BUTTON
  })
}

export const resolveAction = () => {
  return({
    type: RESOLVE_ACTION,
    payload: account.resolve()
  })
}


// export const createStream = formValues => async  (dispatch, getState ) => {
//   const {userId} = getState().auth;
//   const response = await streams.post('/streams',{...formValues, userId});
//   dispatch( {
//     type: CREATE_STREAM,
//     payload: response.data
//   });
//   history.push('/')
// };
