import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainApp from '../../pages/MainApp';

const Routes = () =>{
    return(
        <Router>
            <Switch>
                <Route path="/">
                    <MainApp/>
                </Route>
            </Switch>
        </Router>
    )
}
export default Routes