import React from 'react';
import { connect } from 'react-redux';
import { resolveAction } from '../actions';
import { Segment, List, Image, Header, Icon } from 'semantic-ui-react';
import { moneyFormat } from '../helpers/formHelpers';

class MessageResolution extends React.Component{
  state = {
    account: {
      resolve_action: {}
    }
  }

  renderMessage(message){
    return(
      <div key={`${message.creditFamily}-${message.debitFamily}`}>
        <List>
          <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
            <List.Content>
              <List.Header as='a'>{message.creditFamily}</List.Header>
              <List.Description>
                doit {message.money} euros à {message.debitFamily}
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }

  render() {
    if (!this.props.message) {
      return(
        <div>
        </div>
      );
    }
    const {operations, generalDetails } = this.props.message

    return(
      <div>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' circular />
          <Header.Content>Résultats</Header.Content>
        </Header>

        <Segment>
          <p>
            Coût total : {generalDetails.totalCost} euros
          </p>
          <p>
            Coût moyen par personne : {moneyFormat(generalDetails.averageCostPerPerson)} euros
          </p>
          <div>
            {operations.map(operationDetail => this.renderMessage(operationDetail))}
          </div>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.account.resolve_action
  };
};

export default connect(mapStateToProps,{resolveAction}) (MessageResolution);
