import {
  SET_REMAINING_MONEY,
  SHOW_FAMILY_FORM,
  SUBMIT_FAMILY_FORM,
  LIST_FAMILIES,
  SHOW_RESOLVE_BUTTON,
  RESOLVE_ACTION
} from '../actions/types';
// import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_REMAINING_MONEY:
      return {
        ...state,
        families: action.payload ,
        show_add_family_button: true,
        show_remaining_button: false
      };
    case SHOW_FAMILY_FORM:
      return {
        ...state,
        show_family_form: true,
        show_add_family_button: false
      };
    case SUBMIT_FAMILY_FORM:
      if(action.payload.length > 2){
        return ({
          ...state,
          show_family_form: false,
          show_add_family_button: true,
          show_resolve_button: true,
          families: action.payload
        });
      } else {
        return ({
          ...state,
          show_family_form: false,
          show_add_family_button: true,
          show_resolve_button: false,
          families: action.payload
        });
      }
    case RESOLVE_ACTION:
      return({
        ...state,
        resolve_action: action.payload
      })
    case LIST_FAMILIES:
    case SHOW_RESOLVE_BUTTON:
      return state;
    default:
      return state

  }
}
