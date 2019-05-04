import React from 'react';
import { connect } from 'react-redux';
import { listFamilies } from '../actions';
import { Segment, List, Image } from 'semantic-ui-react';

class FamilyList extends React.Component{
  state = {
    account: {
      families: null
    }
  }
  familyDescription ({adultsNumber, kidsNumber}) {
    [adultsNumber,kidsNumber] = [adultsNumber,kidsNumber].map( nr => parseInt(nr))
    if((adultsNumber === 0 ) && (kidsNumber === 0)){
      return ""
    } else if (adultsNumber === 0){
      return `[${kidsNumber} enfants]`
    } else if (kidsNumber === 0){
      return `[${adultsNumber} adultes]`
    } else {
      return `[${adultsNumber} adultes et ${kidsNumber} enfants] `
    }
  }
  hasBrought(family){
    const verb  = (family.familyMoneySpent > 0) ? "a apporté" : "a en excès"
    return `${this.familyDescription(family)} ${verb} ${Math.abs(family.familyMoneySpent)} euros`;
  }

  renderFamily(family){
    return (
      <div key={`${family.familyName}-${family.adultsNumber}-${family.kidsNumber}-${family.familyMoneySpent}`}>
        <Segment>
          <List>
            <List.Item>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
              <List.Content>
                <List.Header as='a'>{family.familyName}</List.Header>
                <List.Description>
                   {this.hasBrought(family)}
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </div>
    );
  }

  render() {
    if (!this.props.families) {
      return(
      <div></div>
      );
    }

    return(this.props.families.map(family => this.renderFamily(family)));
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
    families: state.account.families
  };
};


export default connect(mapStateToProps,{listFamilies}) (FamilyList);
