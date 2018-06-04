import React from 'react';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Tabs from '../view/Tab'
import User from '../view/user'
import Home from '../view/home'
import Form from '../view/form'
import Order from '../view/order'
import Join from '../view/join'
import Balance from '../view/balance'
import Prod from '../view/prod'
import Submit from '../view/prod/submit'
import ProdOrder from '../view/prodorder'
import GetOrder from '../view/getOrder'
import MyOrder from '../view/myorder'
import Confirm from '../view/confirm'
import HistoryOrder from '../view/historyOrder'
import Manage from '../view/manage'
import ManageOrder from '../view/manageOrder'


class Routers extends React.Component {


    render() {
        return (
            <BrowserRouter>
                    <Switch>
                        <Route path="/static/form/:type" exact component={Form}/>
                        <Route path="/static/user/submit" exact component={Submit}/>
                        <Route path="/static/user/confirm" exact component={Confirm}/>
                        <Route path="/static/user/order" exact component={Order}/>
                        <Route path="/static/user/manage" exact component={Manage}/>
                        <Route path="/static/user/manageOrder" exact component={ManageOrder}/>
                        <Route path="/static/user/historyorder" exact component={HistoryOrder}/>
                        <Route path="/static/user/myorder" exact component={MyOrder}/>
                        <Route path="/static/user/getorder" exact component={GetOrder}/>
                        <Route path="/static/user/prodorder" exact component={ProdOrder}/>
                        <Route path="/static/user/join" exact component={Join}/>
                        <Route path="/static/user/balance" exact component={Balance}/>
                        <Route path="/static/user/prod" exact component={Prod}/>
                        <Route path="/static/1" exact component={Home}/>
                        <Route path="/static/2" exact component={User}/>
                        <Redirect from={'/static'} to={'/static/1'}/>
                    </Switch>
            </BrowserRouter>
        );
    }
}

export default Routers;