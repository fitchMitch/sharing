import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderInput } from '../helpers/formHelpers';

class FamilyForm extends React.Component{


  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }

  render() {
    const label_familyName = "Nom de la famille"
    const label_moneySpent = "Dépense occasionnée"
    const label_adultsNumber = "#Adultes"
    const label_kidsNumber = "#Kids"
    const disabled = (this.props.name_edit_disabled === 'true')
    
    return(
      <form className="ui form error"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="ui container grid">
          <div className="ui row">
            <div className="eight wide column">
              <Field
                name="familyName"
                component={renderInput}
                label={label_familyName}
                disabled={disabled}
              />
            </div>
            <div className="eight wide column">
              <Field
                name="familyMoneySpent"
                component={renderInput}
                label={label_moneySpent}
              />
            </div>
          </div>
          <div className="ui row">
            <div className="eight wide column">
              <Field
                name="adultsNumber"
                component={renderInput}
                label={label_adultsNumber}
              />
            </div>
            <div className="eight wide column">
              <Field
                name="kidsNumber"
                component={renderInput}
                label={label_kidsNumber}
              />
            </div>
          </div>
          <div className="ui row">
            <div className="sixteen wide column centered">
              <button
                className="ui button primary"
                disabled={this.props.form_disabled}>
                OK
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
FamilyForm.defaultProps = {
  kidsNumber:0,
  adultsNumber:1
}

const validate = ({familyName, familyMoneySpent, adultsNumber, kidsNumber}) => { // destructuring formValues
  const errors = {};
  if(familyName)
  if(familyMoneySpent==="" || isNaN(familyMoneySpent)){
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

const mapStateToProps = (state, parentProps) => {
	return {
    form: parentProps.formId,
    names: parentProps.names,
    name_disabled:parentProps.name_disabled
  };
};

const formWrapper = reduxForm({
  enableReinitialize : true,
  validate
}) (FamilyForm);

export default connect(mapStateToProps)(formWrapper);
