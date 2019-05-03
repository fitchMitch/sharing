import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { setRemainingMoney } from '../actions'
import { Segment } from 'semantic-ui-react';
import { renderError, renderInput } from '../helpers/formHelpers';

class RemainingForm extends React.Component {
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
    console.log("meta");
    console.log(meta);
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

  onSubmit = formValues => this.props.setRemainingMoney(formValues)

  render() {
    const label = "Après la fête, il reste (en euros) : "
    return(
      <Segment>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="ui container grid">
            <div className="ui row">
              <div className="fourteen wide column">
                <Field name="remainingMoney" component={this.renderInput} label={label}/>
                <button className="ui button primary">OK</button>
              </div>
            </div>
          </div>
        </form>
      </Segment>
    );
  }
}
const validate = (values) => { // destructuring formValues
  console.log(values);
  const errors = {};
  if(!values.remainingMoney || isNaN(values.remainingMoney) ){
    errors.remainingMoney = 'Vous devez entrer un montant en euros. Pour les virgules, utilisez le caractère"."'
  }
  console.log("errors");
  console.log(errors);
  return errors;
};

const mapStateToProps = (state, ownProps) => {
	return {
    show_add_family_button: state.show_add_family_button
  };
};

const formWrapped = reduxForm({
  form: 'RemainingForm',
  validate
})(RemainingForm);

export default connect(mapStateToProps,{setRemainingMoney}) (formWrapped);
