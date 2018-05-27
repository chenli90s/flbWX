import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Tabs from '../view/Tab'
// import Home from '../view/home'
import Form from '../view/form'
import Order from '../view/order'
import Join from '../view/join'
import Balance from '../view/balance'
import Prod from '../view/prod'


class Routers extends React.Component {


    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <Route path="/form/:type" exact component={Form}/>
                        <Route path="/user/order" exact component={Order}/>
                        <Route path="/user/join" exact component={Join}/>
                        <Route path="/user/balance" exact component={Balance}/>
                        <Route path="/user/prod" exact component={Prod}/>
                        <Route path="/:type" exact component={Tabs}/>
                        <Redirect from={'/'} to={'/1'}/>
                    </Switch>
            </BrowserRouter>
        );
    }
}

export default Routers;