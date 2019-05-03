import {
  SET_REMAINING_MONEY,
  SHOW_FAMILY_FORM,
  SUBMIT_FAMILY_FORM
} from '../actions/types';
// import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_REMAINING_MONEY:
      return {...state, remainingMoney: action.payload , show_add_family_button: true};
    case SHOW_FAMILY_FORM:
      return {...state, show_family_form: true, show_add_family_button: false };
    case SUBMIT_FAMILY_FORM:
      return {...state, show_family_form: false, show_add_family_button: true, families: action.payload };


    default:
      return state

  }
}
