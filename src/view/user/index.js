import React from 'react';
import {
    Icon, List,NavBar,
    WhiteSpace,
} from 'antd-mobile'
import config from '../../utils/config'

class User extends React.Component{

    state = {
        role: 0
    };

    componentDidMount = async ()=>{
        await config.user.checkOpenid(this.props);
        let resp = await config.http.get('/per_info', {openid: config.user.openId})
        this.setState({role: resp.role})
    };

    filterRole = ()=>{
        if(this.state.role==1){
            return(
                <List>
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/order')}}
                    >我的订单</List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        this.props.history.push('/static/user/prod')
                    }}>我的积分</List.Item>
                    {/*<List.Item arrow="horizontal"*/}
                    {/*onClick={()=>{this.props.history.push('/static/user/balance')}}*/}
                    {/*>我的余额</List.Item>*/}
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/prodorder')}}
                    >商城订单</List.Item>
                    {/*<List.Item arrow="horizontal">我的银行卡</List.Item>*/}
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/join')}}
                    >加入我们</List.Item>
                </List>
            )
        }
        if(this.state.role == 2){

            return(
                <List>
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/getorder')}}
                    >我要接单</List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        this.props.history.push('/static/user/myorder')
                    }}>我的订单</List.Item>
                    {/*<List.Item arrow="horizontal"*/}
                    {/*onClick={()=>{this.props.history.push('/static/user/balance')}}*/}
                    {/*>我的余额</List.Item>*/}
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/historyorder')}}
                    >历史订单</List.Item>
                    {/*<List.Item arrow="horizontal">我的银行卡</List.Item>*/}
                </List>
            )
        }

        if(this.state.role == 3){

            return(
                <List>
                    <List.Item arrow="horizontal"
                               onClick={()=>{this.props.history.push('/static/user/manageOrder')}}
                    >商城订单</List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        this.props.history.push('/static/user/manage')
                    }}>管理</List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        this.props.history.push('/static/user/mgprod')
                    }}>商品管理</List.Item>
                    {/*<List.Item arrow="horizontal" onClick={()=>{*/}
                        {/*this.props.history.push('/static/user/manage')*/}
                    {/*}}>商品添加</List.Item>*/}
                </List>
            )
        }
    };

    render(){
        return (
            <div className={'user'}>
                <NavBar
                    mode="light"
                    // icon={<Icon type="left"/>}
                    // onLeftClick={() => {
                    //     this.props.history.push('/static')
                    // }}
                >个人中心</NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                {this.filterRole()}
            </div>
        )
    }
}

export default User