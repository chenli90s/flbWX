import React from 'react';
import {
    NavBar,
    Icon, List,
    InputItem, DatePicker,
    WhiteSpace, TextareaItem,
    Picker, Switch, Button, WingBlank,
    Toast,
} from 'antd-mobile'
import config from '../../utils/config'

class Submit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            concat: '',
            phone: '',
            addrDe: ''
        }
    }

    submit = async () => {
        const {state}  = this.props.location;
        const resp = await config.http.get('goods_duihuan',
            {
                openid: config.user.openId,
                point: state.s,
                phone: parseInt(this.state.phone.split(' ').join('')),
                addr: this.state.addrDe,
                goodid: parseInt(state.id)
            });
        if(resp.status==200){
            Toast.info('提交成功');
            this.props.history.push('/static/user/prod')
        }
    };

    render() {

        return (
            <div>
                <List>
                    <InputItem
                        type={'text'}
                        value={this.state.concat}
                        onChange={value => this.setState({concat: value})}
                        placeholder="请输入联系人姓名"
                        // onExtraClick={(e) => {
                        //     console.log(e)
                        // }}
                    >
                        联系人
                    </InputItem>
                    <InputItem
                        type={'phone'}
                        value={this.state.phone}
                        onChange={value => this.setState({phone: value})}
                        placeholder="请输入联系人电话"
                    >
                        联系电话
                    </InputItem>
                    <TextareaItem
                        title="详细地址"
                        placeholder=""
                        // data-seed="logId"
                        // ref={el => this.autoFocusInst = el}
                        autoHeight
                        onChange={(e) => this.setState({addrDe: e})}
                        value={this.state.addrDe}
                    />
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

export default Submit