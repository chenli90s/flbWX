import React from 'react';
import {
    WingBlank, Button,
    NavBar, WhiteSpace, Icon, List, InputItem, Picker, Toast
} from 'antd-mobile';
import config from '../../utils/config'

class Confirm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            unit: null,
            weight: null,
        };
    }


    submit = async () => {
        const {id, type} = this.props.location.state;
        if (type) {
            if (this.state.weight) {
                let resp = await config.http.get('/complete_order',
                    {
                        openid: config.user.openId,
                        order_id: id,
                        real_weight: this.state.weight,
                        type,
                    });
                this.props.history.goBack()
            } else {
                Toast.info('请输入单价和重量')
            }
        } else {
            if (this.state.unit && this.state.weight) {
                let resp = await config.http.get('/complete_order',
                    {
                        openid: config.user.openId,
                        order_id: id,
                        money: (this.state.unit * this.state.weight).toFixed(2),
                        real_weight: this.state.weight
                    });
                this.props.history.goBack()
            } else {
                Toast.info('请输入单价和重量')
            }
        }
    };

    componentDidMount = async () => {
        await config.user.checkOpenid(this.props)
    };

    render() {
        const {type} = this.props.location.state;
        return (
            <div className="join">
                <NavBar
                    mode="light"
                    // icon={<Icon type="left"/>}
                    // onLeftClick={() => {
                    //     this.props.history.push('/static/2')
                    // }}
                >结算</NavBar>
                {type ?
                    <List>
                        <InputItem placeholder={'请输入真实重量'} type={'money'} value={this.state.weight}
                                   onChange={(e) => {
                                       // console.log(typeof e);
                                       this.setState({weight: e})
                                   }}
                        >
                            重量
                        </InputItem>
                    </List>
                    : <List>
                        <InputItem placeholder={'请输入单价'} type={'money'} value={this.state.unit}
                                   onChange={(e) => {
                                       // console.log(e)
                                       this.setState({unit: e})
                                   }}
                        >
                            单价
                        </InputItem>
                        <InputItem placeholder={'请输入真实重量'} type={'money'} value={this.state.weight}
                                   onChange={(e) => {
                                       // console.log(typeof e);
                                       this.setState({weight: e})
                                   }}
                        >
                            重量
                        </InputItem>
                        <InputItem placeholder={'价格自动生成'} type={'money'}
                                   value={(this.state.unit * this.state.weight).toFixed(2)}
                        >
                            价格
                        </InputItem>
                    </List>}
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank>
                    <Button type={'primary'} onClick={this.submit}>提交</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Confirm