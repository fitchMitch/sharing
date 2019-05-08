import React from 'react';
import { connect } from 'react-redux';
import { showCreateFamilyForm } from '../actions';
import { Segment } from 'semantic-ui-react';

class AddFamilyButton extends React.Component{
  state={show_add_family_button:false}

  onClick = e => {
    e.preventDefault();
    this.props.showCreateFamilyForm();
  }

  render() {
    return(
      <Segment disabled={!this.props.show_add_family_button} textAlign="center">
        <button className="ui button green" onClick={ e => this.onClick(e)} disabled={!this.props.show_add_family_button}>
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


export default connect(mapStateToProps,{showCreateFamilyForm}) (AddFamilyButton);
