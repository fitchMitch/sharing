import React from 'react';
import { connect } from 'react-redux';
import { updateFamily } from '../actions';
import FamilyForm from './FamilyForm';
import { Segment } from 'semantic-ui-react';
import _ from 'lodash';

class EditFamilyForm extends React.Component{
  state = {
      // show_edit_family_form: false,
      // have_edit_family_form_hidden: true
  }

  onSubmit = formValues => this.props.updateFamily(formValues);

  render() {
    if (this.props.have_edit_family_form_hidden === true) {
      return null
    }
    return(
      <Segment disabled={!this.props.show_edit_family_form} color="teal">
        <h3 className="ui dividing header">
          {`Editer la famille de ${this.props.initialValues.familyName}`}
        </h3>
        <FamilyForm
          initialValues = {_.pick(this.props.initialValues,'kidsNumber', 'adultsNumber','familyName','familyMoneySpent')}
          formId="editFamilyForm"
          name_disabled="true"
          onSubmit = {this.onSubmit}
        />
      </Segment>
    );
  }
}
EditFamilyForm.defaultProps = {
  show_edit_family_form: false,
  have_edit_family_form_hidden: true
}

const mapStateToProps = (state, ownProps) => {
	return {
    initialValues: state.account.selectedFamily,
    names: state.account.families.keys,
    show_edit_family_form: state.account.show_edit_family_form,
    have_edit_family_form_hidden: state.account.have_edit_family_form_hidden,
    name_disabled: true
  };
};

export default connect(mapStateToProps,{updateFamily}) (EditFamilyForm);
