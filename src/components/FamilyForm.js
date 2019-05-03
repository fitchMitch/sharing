import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { submitFamilyForm } from '../actions';
import { Segment } from 'semantic-ui-react';

class FamilyForm extends React.Component{
  state={
    account:{
      show_family_form: false
    }
  }
  renderError = ({error,touched}) => {
    if(touched && error){
      return(
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return null;
  }

  renderInput = ({input, label, meta}) => { //destructuring formProps
    const isError = `field ${meta.error && meta.touched ? 'error' : ''}` ;
    return(
      <div className={isError}>
        <label htmlFor="">{label}</label>
        <input {...input} autoComplete="off" />
        <div>{meta.error}</div>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = formValues => this.props.submitFamilyForm(formValues);


  render() {
    const label_familyName = "Nom de la famille"
    const label_moneySpent = "Dépense occasionnée"
    const label_adultsNumber = "#Adultes"
    const label_kidsNumber = "#Kids"

    // const visibility = (this.state.account.show_family_form === true) ? "" : "ui form error hidden hide-me"
    console.log(this.props.load);
    return(
      <Segment disabled={!this.props.show_family_form}>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <h3 className="ui dividing header">Nouvelle famille</h3>
          <div className="ui container grid">
            <div className="ui row">
              <div className="eight wide column">
                <Field name="familyName" component={this.renderInput} label={label_familyName}/>
              </div>
              <div className="eight wide column">
                <Field name="familyMoneySpent" component={this.renderInput} label={label_moneySpent}/>
              </div>
              <div className="eight wide column">
                <Field name="adultsNumber" component={this.renderInput} label={label_adultsNumber}/>
              </div>
              <div className="eight wide column">
                <Field name="kidsNumber" component={this.renderInput} label={label_kidsNumber}/>
              </div>
            </div>
            <div className="ui row">
              <div className="sixteen wide column centered">
                <button className="ui button primary">OK</button>
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
// const validate = ({remainingMoney}) => { // destructuring formValues
//   const errors = {};
//   if(!remainingMoney){
//     errors.title = 'Vous devez entrer un montant en euros'
//   }
//   return errors;
// };
const mapStateToProps = (state, ownProps) => {
	return {
    show_family_form: state.account.show_family_form
  };
};



const formWrapped = reduxForm({
  form: 'AddFamilyForm'
  // , validate
}) (FamilyForm);

export default connect(mapStateToProps,{submitFamilyForm}) (formWrapped);
