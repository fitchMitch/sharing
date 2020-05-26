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
} from '../actions/types';
import _ from 'lodash';

export default (state = {families:{}}, action) => {
  switch (action.type) {
    case SET_REMAINING_MONEY:
      if (action.payload === null){
        return {
          ...state,
          show_add_family_button: true,
          show_create_family_form: false,
          show_remaining_button: true,
          have_edit_family_form_hidden: true,
          resolution_shown: false,
          families:state.families
        }
      } else {
        return {
          ...state,
          show_add_family_button: true,
          show_create_family_form: false,
          show_remaining_button: false,
          have_edit_family_form_hidden: true,
          resolution_shown: false,
          families: {...state.families,[action.payload.familyName]:action.payload}
        }
      }

    case SHOW_CREATE_FAMILY_FORM:
      return {
        ...state,
        show_create_family_form: true,
        show_add_family_button: false,
      };

    case SUBMIT_FAMILY_FORM:
      const newState = {
        ...state,
        families: {...state.families,[action.payload.familyName]:action.payload},
        show_create_family_form: false,
        show_add_family_button: true
      }
      if(Object.values(state.families).length > 0){
        return ({
          ...newState,
          show_resolve_button: true
        });
      } else {
        return ({
          ...newState,
          show_resolve_button: false
        });
      }

    case EDIT_FAMILY_FORM:
      return({
        ...state,
        families: {...state.families},
        have_create_family_form_hidden:true,
        show_edit_family_form:true,
        have_edit_family_form_hidden: false,
        show_add_family_button: false,
        selectedFamily: action.payload
      })

    case SHOW_UPDATE_FAMILY_FORM:
      return ({
        ...state,
        have_create_family_form_hidden: true,
        have_edit_family_form_hidden: false,
      })

    case UPDATE_FAMILY:
      return ({
        ...state,
        families: {...state.families, [action.payload.familyName]:action.payload},
        have_create_family_form_hidden: false,
        have_edit_family_form_hidden: true,
        show_create_family_form: false,
        show_add_family_button: true
      })

    case RESOLVE_ACTION:
      return({
        ...state,
        resolve_action: action.payload,
        resolution_shown: true,
        show_resolve_button: false,
      })

    case DELETE_FAMILY:
      const delState = {
        ...state,
        families: _.omit(state.families, action.payload),
        show_add_family_button: true,
        have_edit_family_form_hidden: true,
      }
      if(Object.values(state.families).length > 1){
        if (action.payload === "Cagnotte"){
          return ({
            ...delState,
            show_resolve_button: true,
            show_remaining_button: true,
          })
        } else {
          return ({
            ...delState,
            show_resolve_button: true,
          })
        }
      } else {
        if (action.payload === "Cagnotte"){
          return ({
            ...delState,
            show_resolve_button: false,
            show_remaining_button: true,
          })
        } else {
          return ({
            ...delState,
            show_resolve_button: false,
          })
        }
      }

    case LIST_FAMILIES:
    case SHOW_RESOLVE_BUTTON:
      return state;
    default:
      return state

  }
}
