import React from 'react';
import {
    Icon, List,NavBar,
    WhiteSpace,
} from 'antd-mobile'


class User extends React.Component{

    render(){
        return (
            <div className={'user'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/')
                    }}
                >我的账户</NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <List>
                    <List.Item arrow="horizontal"
                        onClick={()=>{this.props.history.push('/user/order')}}
                    >我的订单</List.Item>
                    <List.Item arrow="horizontal" onClick={()=>{
                        this.props.history.push('/user/prod')
                    }}>我的积分</List.Item>
                    <List.Item arrow="horizontal"
                        onClick={()=>{this.props.history.push('/user/balance')}}
                    >我的余额</List.Item>
                    <List.Item arrow="horizontal">我的银行卡</List.Item>
                    <List.Item arrow="horizontal"
                        onClick={()=>{this.props.history.push('/user/join')}}
                    >加入我们</List.Item>
                </List>
            </div>
        )
    }
}

export default User