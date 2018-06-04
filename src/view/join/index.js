import React from 'react';
import {WingBlank, Button,
    NavBar, WhiteSpace, Icon, List, InputItem, Picker, Toast} from 'antd-mobile';
import config from '../../utils/config'

class Join extends React.Component {

    state = {
        name: '',
        phone: '',
        type: ['货车']
    };

    submit = async ()=>{
        console.log(this.state);
        if(this.state.name&&this.state.phone){
            let resp = await config.http.get('/applys',
                {truename: this.state.name,
                    openid: config.user.openId,
                    phone:parseInt(this.state.phone.split(' ').join('')),
                    type:this.state.type[0]});
            if(resp.status==600){
                Toast.info('您已提交申请，请耐心等待审核');
                return
            }
            Toast.info('提交成功, 等待管理员审核');
            this.props.history.push('/static/2')
        }else {
            Toast.fail('请填写相关信息')
        }


    };

    componentDidMount = async ()=>{
        await config.user.checkOpenid(this.props)
    };

    render() {
        return (
            <div className="join">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/2')
                    }}
                >加入我们</NavBar>
                <List>
                    <InputItem placeholder={'请输入姓名'} type={'text'} value={this.state.name}
                        onChange={(e)=>{
                            // console.log(e)
                            this.setState({name: e})
                        }}
                    >
                        联系人
                    </InputItem>
                    <InputItem placeholder={'请输入号码'} type={'phone'} value={this.state.phone}
                               onChange={(e)=>{
                                   console.log(e);
                                   this.setState({phone: e})
                               }}
                    >
                        联系电话
                    </InputItem>
                    <Picker cascade={false}
                            data={[[{label: '货车', value: '货车'}, {label: '三轮车', value: '三轮车'}]]}
                            value={this.state.type}
                            onChange={type => this.setState({type})}
                            onOk={type => this.setState({type})}
                    >
                        <List.Item arrow="horizontal">车辆类型</List.Item>
                    </Picker>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type={'primary'} onClick={this.submit}>提交</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Join