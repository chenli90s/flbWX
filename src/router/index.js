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
                        <Route path="/static/form/:type" exact component={Form}/>
                        <Route path="/static/user/order" exact component={Order}/>
                        <Route path="/static/user/join" exact component={Join}/>
                        <Route path="/static/user/balance" exact component={Balance}/>
                        <Route path="/static/user/prod" exact component={Prod}/>
                        <Route path="/static/:type" exact component={Tabs}/>
                        <Redirect from={'/static'} to={'/static/1'}/>
                    </Switch>
            </BrowserRouter>
        );
    }
}

export default Routers;