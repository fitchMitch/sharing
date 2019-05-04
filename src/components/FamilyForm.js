import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFamilyForm } from '../actions';
import { Segment } from 'semantic-ui-react';
import { renderError, renderInput } from '../helpers/formHelpers';

class FamilyForm extends React.Component{
  state={
    account:{
      show_family_form: false
    }
  }



  onSubmit = formValues => this.props.submitFamilyForm(formValues);

  render() {
    const label_familyName = "Nom de la famille"
    const label_moneySpent = "Dépense occasionnée"
    const label_adultsNumber = "#Adultes"
    const label_kidsNumber = "#Kids"

    return(
      <Segment disabled={!this.props.show_family_form}>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h3 className="ui dividing header">Nouvelle famille</h3>
          <div className="ui container grid">
            <div className="ui row">
              <div className="eight wide column">
                <Field name="familyName" component={renderInput} label={label_familyName}/>
              </div>
              <div className="eight wide column">
                <Field name="familyMoneySpent" component={renderInput} label={label_moneySpent}/>
              </div>
              <div className="eight wide column">
                <Field name="adultsNumber" component={renderInput} label={label_adultsNumber}/>
              </div>
              <div className="eight wide column">
                <Field name="kidsNumber" component={renderInput} label={label_kidsNumber}/>
              </div>
            </div>
            <div className="ui row">
              <div className="sixteen wide column centered">
                <button className="ui button primary" disabled={!this.props.show_family_form}>OK</button>
              </div>
            </div>
          </div>
        </form>
      </Segment>
    );
  }
}

FamilyForm.defaultProps = {
  familyName: "Borré",
  familyMoneySpent: 66,
  adultsNumber: 3,
  kidsNumber: 2
}

const validate = ({familyMoneySpent, adultsNumber, kidsNumber}) => { // destructuring formValues
  const errors = {};
  if(!familyMoneySpent || isNaN(familyMoneySpent)){
    errors.familyMoneySpent = 'Vous devez entrer un montant en euros'
  }
  if( isNaN(adultsNumber)){
    errors.adultsNumber = 'Vous devez entrer un nombre'
  }
  if( isNaN(kidsNumber)){
    errors.kidsNumber = 'Vous devez entrer un nombre'
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
    show_family_form: state.account.show_family_form
  };
};

const formWrapped = reduxForm({
  form: 'AddFamilyForm',
  validate
}) (FamilyForm);

export default connect(mapStateToProps,{submitFamilyForm}) (formWrapped);
