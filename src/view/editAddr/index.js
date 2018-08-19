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
import Form from "../form";


class EditAddr extends React.Component{


    constructor(props){
        super(props);
        const data = props.location.state;
        console.log(props);
        if(data){
            this.isUpdate = true;
            this.id = data.rowData.id;
            this.type = data.type;
            this.state = {
            concat: data.rowData.name,
            phone: data.rowData.phone,
            addrDe: data.rowData.addr
        }
        }else {
            this.isUpdate = false;
            this.state = {
            concat: '',
            phone: '',
            addrDe: ''
        }
        }

    }

    submit = async ()=>{
        let id = config.user.openId;
        // console.log(id);
        let result = this.state.phone&&this.state.addrDe&&this.state.concat
        if(!result){
            Toast.fail("提交的地址,电话,联系人不能为空");
            return
        }
        if(this.isUpdate){
            await config.http
            .get('/xiu_addr', {id: this.id,
                                phone: this.state.phone,
                                addr: this.state.addrDe,
                                name: this.state.concat
                                });
        }else {
            await config.http
            .get('/add_addr', {openid: id,
                                phone: this.state.phone,
                                addr: this.state.addrDe,
                                name: this.state.concat
                                });
        }
        this.props.history.push({pathname: '/static/user/myAddr', state: this.type})
    };

    render(){


        return (
            <div className="form">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >{"编辑"}</NavBar>
                <WhiteSpace/>
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


export default EditAddr