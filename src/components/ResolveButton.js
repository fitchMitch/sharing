import React from 'react';
import { connect } from 'react-redux';
import { resolveAction } from '../actions';
import { Segment } from 'semantic-ui-react';

class ResolveButton extends React.Component{
  state = {
      show_resolve_button: false
  }

  onClick = e => {
    e.preventDefault();
    this.props.resolveAction();
  }

  render() {
    return(
      <Segment disabled={!this.props.show_resolve_button} textAlign="center">
        <button
          className="ui button purple"
          onClick={ e => this.onClick(e)}
          disabled={!this.props.show_resolve_button}
        >
          PARTAGER !
        </button>
      </Segment>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    show_resolve_button: state.account.show_resolve_button,
    resolve_action: state.account.resolve_action
  };
};


export default connect(mapStateToProps,{resolveAction}) (ResolveButton);
