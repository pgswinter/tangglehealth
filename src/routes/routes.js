import React from 'react';
import BillContainer from '../containers/BillContainer';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (	
  <Switch>
    <Route exact path="/" component={BillContainer} />
  </Switch> 
);

export default Routes;
