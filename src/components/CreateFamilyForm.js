import React from 'react';
import FamilyForm from './FamilyForm';
import { connect } from 'react-redux';
import { submitFamilyForm } from '../actions';
import { Segment } from 'semantic-ui-react';

class CreateFamilyForm extends React.Component{
  state={
    account:{
      show_create_family_form: false
    }
  }

  onSubmit = formValues => this.props.submitFamilyForm(formValues);

  render() {
    if (this.props.have_create_family_form_hidden === true) {
      return null
    }

    return(
      <Segment color="green" disabled={!this.props.show_create_family_form}>
        <h3 className="ui dividing header">Nouvelle famille</h3>
        <FamilyForm
          onSubmit={this.onSubmit}
          formId="createFamilyForm"
          form_disabled={!this.props.show_create_family_form}
        />
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
    form: ownProps.formId,
    show_create_family_form: state.account.show_create_family_form,
    have_create_family_form_hidden: state.account.have_create_family_form_hidden
  };
};

export default connect(mapStateToProps,{submitFamilyForm}) (CreateFamilyForm);
