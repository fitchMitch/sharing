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
import { reset } from 'redux-form'

export let account = new Account(0);

export const setRemainingMoney = formValues => (dispatch, getState) => {
  const remainingMoney = formValues.remainingMoney;
  const dispatchRemainingMoney ={
    dispatch_function: dispatch,
    type: SET_REMAINING_MONEY
  }

  if (parseInt(remainingMoney * 100) > 0) {
    addRemainingCash(remainingMoney, account)
    dispatchRemainingMoney['payload'] = account.findFamilyDetails('Cagnotte')
  } else {
    dispatchRemainingMoney['payload'] = null
  }
  dispatchRemainingMoney['resolved_status'] = isResolved(getState())
  repaintResolve(dispatchRemainingMoney);
};

const repaintResolve = ({dispatch_function,type, payload,resolved_status}) => {
  dispatch_function({ type, payload });
  if(resolved_status === true){
    dispatch_function(resolveAction());
  }
}

export const submitFamilyForm = formValues => (dispatch, getState) => {
  let new_family = new Family(formValues)
  account.addFamily( new_family );
  dispatch(reset('createFamilyForm'))
  repaintResolve({
    dispatch_function: dispatch,
    type: SUBMIT_FAMILY_FORM,
    payload: new_family.showFamily(),
    resolved_status: isResolved(getState())
  });
};


export const updateFamily = formValues => (dispatch, getState) => {
  let abr_values =_.pick(formValues,'familyName','kidsNumber','adultsNumber','familyMoneySpent')
  account.deleteFamily(abr_values.familyName);
  account.addFamily(new Family(abr_values));
  repaintResolve({
    dispatch_function: dispatch,
    type: UPDATE_FAMILY,
    payload: abr_values,
    resolved_status: isResolved(getState())
  });
}

export const deleteFamily = familyName => (dispatch, getState) => {
  account.deleteFamily(familyName);
  repaintResolve({
    dispatch_function: dispatch,
    type: DELETE_FAMILY,
    payload: familyName,
    resolved_status: isResolved(getState())
  });
}

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

// private

const isResolved = (state) => (state.account.resolution_shown === true)


const addRemainingCash = (remainingMoney, account) => {
  const spared_money = new Family({
    familyName: "Cagnotte",
    familyMoneySpent: -remainingMoney
  });
  account.addFamily(spared_money);
}

