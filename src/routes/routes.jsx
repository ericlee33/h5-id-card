import React, { useEffect } from 'react';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Photo from '../views/photo/photo';

const Routes = () => {
    let hasToken = useSelector(state => state.hasToken);
    return (
        <Router>
            <Switch>
                <Route path="/photo" exact={true} component={Photo}></Route>
                <Redirect to="/photo" />
            </Switch>
        </Router>
    );
};

export default Routes;
