import React from 'react';
import RemainingForm from './RemainingForm';
import AddFamilyButton from './AddFamilyButton';
import CreateFamilyForm from './CreateFamilyForm';
import EditFamilyForm from './EditFamilyForm';
import ResolveButton from './ResolveButton';
import MessageResolution from './MessageResolution';
import FamilyList from './FamilyList';
import {
  Grid,
  Header,
  Container
} from 'semantic-ui-react';

const App = () =>{
  const initialRemainingMoney = {remainingMoney: 0};
  return(
    <Container text>
      <Header size="medium" textAlign="center">
        Allez on partage !
      </Header>
      <Grid centered columns={2} stackable>
        <Grid.Column width={6}>
          <RemainingForm initialValues = {initialRemainingMoney}/>
          <ResolveButton/>
          <MessageResolution/>
        </Grid.Column>
        <Grid.Column width={10}>
          <FamilyList/>
          <AddFamilyButton/>
          <CreateFamilyForm/>
          <EditFamilyForm/>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default App;
