import {
  SET_REMAINING_MONEY,
  SHOW_CREATE_FAMILY_FORM,
  SHOW_UPDATE_FAMILY_FORM,
  SUBMIT_FAMILY_FORM,
  LIST_FAMILIES,
  SHOW_RESOLVE_BUTTON,
  RESOLVE_ACTION,
  EDIT_FAMILY_FORM,
  UPDATE_FAMILY,
  DELETE_FAMILY
} from './types';
import Account from '../models/Account';
import Family from '../models/Family';
import _ from 'lodash';

export let account = new Account(0);
export const setRemainingMoney = formValues => (dispatch, getState) => {
  const remainingMoney = formValues.remainingMoney;
  let spared_money = null;

  if (parseInt(remainingMoney * 100) > 0) {
    spared_money = new Family({
      familyName: "Cagnotte", familyMoneySpent: -remainingMoney
    })
    account.addFamily(spared_money);
    repaintResolve({
      dispatch_function: dispatch,
      type: SET_REMAINING_MONEY,
      payload: account.findFamilyDetails('Cagnotte'),
      resolved_status: (getState().account.resolution_shown === true)
    });
  } else {
    repaintResolve({
      dispatch_function: dispatch,
      type: SET_REMAINING_MONEY,
      payload: null,
      resolved_status: (getState().account.resolution_shown === true)
    });
  }
};

export const showCreateFamilyForm = () => {
  return( {
    type: SHOW_CREATE_FAMILY_FORM
  });
};

export const showUpdateFamilyForm = () => {
  return( {
    type: SHOW_UPDATE_FAMILY_FORM
  });
};

const repaintResolve = ({dispatch_function,type, payload,resolved_status}) => {
  if(resolved_status === true){
    dispatch_function({ type, payload });
    dispatch_function({
      type: RESOLVE_ACTION,
      payload: account.resolve()
    });
  } else {
    dispatch_function({ type, payload });
  }
}

export const submitFamilyForm = formValues => (dispatch, getState) => {
  let new_family = new Family(formValues)
  account.addFamily( new_family );
  repaintResolve({
    dispatch_function: dispatch,
    type: SUBMIT_FAMILY_FORM,
    payload: new_family.showFamily(),
    resolved_status: (getState().account.resolution_shown === true)
  });
};

export const listFamilies = () => {
  return({
    type: LIST_FAMILIES
  });
}

export const showResolveButton = () => {
  return({
    type: SHOW_RESOLVE_BUTTON
  });
}

export const resolveAction = () => {
  return({
    type: RESOLVE_ACTION,
    payload: account.resolve()
  });
}

export const editFamilyForm = familyName => {
  return({
    type: EDIT_FAMILY_FORM,
    payload: account.findFamilyDetails(familyName)
  });
}

export const updateFamily = formValues => (dispatch, getState) => {
  let abr_values =_.pick(formValues,'familyName','kidsNumber','adultsNumber','familyMoneySpent')
  account.deleteFamily(abr_values.familyName);
  account.addFamily(new Family(abr_values));
  repaintResolve({
    dispatch_function: dispatch,
    type: UPDATE_FAMILY,
    payload: abr_values,
    resolved_status: (getState().account.resolution_shown === true)
  });
}

export const deleteFamily = familyName => (dispatch, getState) => {
  account.deleteFamily(familyName);
  repaintResolve({
    dispatch_function: dispatch,
    type: DELETE_FAMILY,
    payload: familyName,
    resolved_status: (getState().account.resolution_shown === true)
  });
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
