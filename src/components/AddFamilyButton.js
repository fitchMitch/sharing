import React from 'react';
import { connect } from 'react-redux';
import { show_family_form } from '../actions';
import { Segment } from 'semantic-ui-react';

class AddFamilyButton extends React.Component{
  state={show_add_family_button:false}

  onClick = e => {
    e.preventDefault();
    this.props.show_family_form();
  }

  render() {
    return(
      <Segment disabled={!this.props.show_add_family_button}>
        <button className="ui button green" onClick={ e => this.onClick(e)}>
          Ajouter une famille participante
        </button>
      </Segment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
	return {
    show_add_family_button: state.account.show_add_family_button
  };
};


export default connect(mapStateToProps,{show_family_form}) (AddFamilyButton);
