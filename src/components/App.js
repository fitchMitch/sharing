import React from 'react';
import RemainingForm from './RemainingForm';
import AddFamilyButton from './AddFamilyButton';
import FamilyForm from './FamilyForm';
import ResolveButton from './ResolveButton';
import MessageResolution from './MessageResolution';
import FamilyList from './FamilyList';
// import {
//   Button,
//   Form,
//   Grid,
//   Header,
//   Message,
//   Segment,
// } from 'semantic-ui-react';
import {
  Grid,
  Header,
  Container
} from 'semantic-ui-react';

const App = () =>{
  return(
    <Container>
      <Header as="h2" textAlign="center">
        Allez on partage !
      </Header>
      <Grid centered columns={2} stackable>
        <Grid.Column>
            <RemainingForm/>
            <ResolveButton/>
            <MessageResolution/>
        </Grid.Column>
        <Grid.Column>
            <AddFamilyButton/>
            <FamilyForm/>
            <FamilyList/>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default App;
