import React                        from 'react';
import { connect }                  from 'react-redux';
import { Field, reduxForm }         from 'redux-form';
import { setRemainingMoney }        from '../actions'
import { Segment }                  from 'semantic-ui-react';
import { renderInput } from '../helpers/formHelpers';

class RemainingForm extends React.Component {


  onSubmit = formValues => this.props.setRemainingMoney(formValues)

  render() {
    const label = "Après la fête, il reste (en euros) : "

    const hideRemainingMoney = null;

    const showRemainingMoney =
      <Segment
        disabled={!this.props.show_remaining_button}
        color="blue"
      >
        <form className="ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)} >
          <div className="ui container grid">
            <div className="ui row">
              <div className="fourteen wide column">
                <Field name="remainingMoney" component={renderInput} label={label}/>
                <button className="ui button primary" disabled={!this.props.show_remaining_button}>OK</button>
              </div>
            </div>
          </div>
        </form>
      </Segment>
    return (this.props.show_remaining_button) ? showRemainingMoney
                                              : hideRemainingMoney;
  }
}
RemainingForm.defaultProps = {
  show_remaining_button: true
}

const validate = ({remainingMoney}) => { // destructuring formValues
  const errors = {};
  if(remainingMoney === "" || isNaN(remainingMoney) ){
    errors.remainingMoney = 'Saisissez un montant en euros, pour les virgules, utilisez le caractère : "."'
  }
  return errors;
};

const mapStateToProps = (state) => {
	return {
    show_remaining_button: state.account.show_remaining_button
  };
};

const formWrapped = reduxForm({
  form: 'RemainingForm',
  enableReinitialize : true,
  validate
})(RemainingForm);

export default connect(
  mapStateToProps,{
    setRemainingMoney
  }) (formWrapped);
