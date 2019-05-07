import React from 'react';
import { connect } from 'react-redux';
import { listFamilies, editFamilyForm, deleteFamily } from '../actions';
import { Segment, List, Image, Header,Icon } from 'semantic-ui-react';

class FamilyList extends React.Component{
  state = {
    account: {
      families: null
    }
  }
  familyDescription ({adultsNumber, kidsNumber}) {
    [adultsNumber,kidsNumber] = [adultsNumber,kidsNumber].map(nr => parseInt(nr))
    if((adultsNumber === 0 ) && (kidsNumber === 0)){
      return ""
    } else if (adultsNumber === 0){
      return `[${kidsNumber} enfants]`
    } else if (kidsNumber === 0){
      return `[${adultsNumber} adultes]`
    } else {
      return `[${adultsNumber} grands et ${kidsNumber} petits] `
    }
  }
  wordingForHasBrought(family){
    const verb  = (family.familyMoneySpent > 0) ? "a dépensé" : "contient encore";
    return `${this.familyDescription(family)} ${verb} ${Math.abs(family.familyMoneySpent)} euros`;
  }

  // console.log(name);
  onFamilyClick = (name) => (e) => {
    this.props.editFamilyForm(name);
  }

  onTrashClick = (name) => (e) => {
    this.props.deleteFamily(name);
  }

  trashIcon(family,nr){
    if(nr>1){
      return <Icon name="trash" color='red' onClick={this.onTrashClick(family.familyName)}/>
    } else {
      return null
    }
  }

  renderFamily(family,count){
    return (
      <div key={`${family.familyName}-${family.adultsNumber}-${family.kidsNumber}-${family.familyMoneySpent}`}>
        <List>
          <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
            <List.Content>
              <List.Header as='a'>
                <div onClick={this.onFamilyClick(family.familyName)}>
                  {family.familyName}
                </div>
              </List.Header>
              <List.Description>
                 {this.wordingForHasBrought(family)}
                 {this.trashIcon(family,count)}
              </List.Description>
            </List.Content>
          </List.Item>
        </List>
      </div>
    );
  }

  render() {
    if (this.props.list_families.length === 0) {
      return(
      <div></div>
      );
    }

    return(
      <Segment color='purple'>
        <Header as='h3'>
          <Icon name="child" color="purple"/>
          <Icon name="female" color="pink"/>
          <Icon name="female" color="green"/>
          <Icon name="male" color="orange"/>
          <Icon name="child" color="brown"/>
          <Icon name="child" color="yellow"/>
          Familles
        </Header>
        <div>
          { this.props.list_families.map(family => {
              return(this.renderFamily(
                family,
                this.props.list_families.length
              ))
           }
         )}
        </div>
      </Segment >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if(!state.account.families) {
    return({ families: null})
  }

	return {
    list_families: Object.values(state.account.families)
  };
};


export default connect(
  mapStateToProps,
  {
    listFamilies,
    deleteFamily,
    editFamilyForm
  }
) (FamilyList);
