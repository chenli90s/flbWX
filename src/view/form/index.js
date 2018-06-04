import React from 'react';
import {
    NavBar,
    Icon, List,
    InputItem, DatePicker,
    WhiteSpace, TextareaItem,
    Picker, Switch, Button, WingBlank,
    Toast,
} from 'antd-mobile'
import './style.css'
import config from '../../utils/config'


const data = {
    '1': {
        title: '废纸',
        type: [[{
            label: '纸箱',
            value: '纸箱',
        },
            {
                label: '报纸',
                value: '报纸',
            }, {
                label: '书本',
                value: '书本',
            }, {
                label: '其他',
                value: '其他',
            },
        ]]
    },
    '2': {
        title: '废塑料',
        type: [[{
            label: '废饮料瓶',
            value: '废饮料瓶',
        },
            {
                label: '废塑料泡沫',
                value: '废塑料泡沫',
            }, {
                label: '废塑料制品',
                value: '废塑料制品',
            }, {
                label: '其他',
                value: '其他',
            },
        ]]
    },
    '3': {
        title: '废金属',
        type: [[{
            label: '废铜',
            value: '废铜',
        },
            {
                label: '废铁',
                value: '废铁',
            }, {
                label: '废钢',
                value: '废钢',
            }, {
                label: '其他',
                value: '其他',
            },
        ]]
    },
    '4': {
        title: '废纺织品',
        type: [[{
            label: '旧夏装',
            value: '旧夏装',
        },
            {
                label: '旧冬装',
                value: '旧冬装',
            }, {
                label: '旧鞋',
                value: '旧鞋',
            }, {
                label: '其他',
                value: '其他',
            },
        ]]
    },
    '5': {
        title: '废家电',
        type: [[{
            label: '家用小电器',
            value: '家用小电器',
        },
            {
                label: '家用大电器',
                value: '家用大电器',
            }, {
                label: '其他',
                value: '其他',
            },
        ]]
    },
    '6': {
        title: '其他',
        type: [[{
            label: '其他',
            value: '其他',
        }]]
    },

};

class Form extends React.Component {
    state = {
        date: '',
        concat: '',
        phone: '',
        addr: '',
        addrDe: '',
        weight: '',
        type: '',
        isGive: false
    };

    openId = '';

    componentWillMount = () => {
        const {type} = this.props.match.params;
        const vals = data[type];
        this.setState({type: [vals.type[0][0].value]})
    };

    componentDidMount = async () => {
        config.user.checkOpenid(this.props);
    };

    submit = async () => {
        let resp = await config.http.get('/per_info', {openid: config.user.openId});
        // this.setState({role: resp.role})
        if(resp.role==3||resp.role==2){
            Toast.info('你已是管理员， 无法提交')
        }
        console.log(this.state);
        let params = {
            weight: this.state.weight,
            something: this.state.type[0],
            address: this.state.addrDe,
            phone: this.state.phone.split(' ').join(''),
            openid: config.user.openId,
            smtime: config.dateFormat(this.state.date),
            name: this.state.concat
        };
        if(this.state.isGive){
            params.types = 1
        }
        config.http.get('/place_order', params)
            .then(resp => {
                if (resp.status == 200) {
                    //跳转
                    this.props.history.push('/static/user/order')
                } else {
                    Toast.info('网络链接错误， 稍后再试')
                }
            }).catch(err => {
            Toast.info('网络链接错误， 稍后再试')
        })
    };

    render() {
        const {type} = this.props.match.params;
        const vals = data[type];
        return (
            <div className="form">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/1')
                    }}
                >{vals.title}</NavBar>
                <WhiteSpace/>
                <List>
                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({date})}
                        placeholder="请选择取货时间"
                        style={{overflow: 'visible'}}
                        format='YYYY-MM-DD HH:mm'
                    >
                        <List.Item arrow="horizontal">取货时间</List.Item>
                    </DatePicker>
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
                    {/*<InputItem*/}
                    {/*type={'text'}*/}
                    {/*value={this.state.addr}*/}
                    {/*onChange={value => this.setState({addr: value})}*/}
                    {/*placeholder="请输入联系人地址"*/}
                    {/*>*/}
                    {/*取货地点*/}
                    {/*</InputItem>*/}
                    <TextareaItem
                        title="详细地址"
                        placeholder=""
                        // data-seed="logId"
                        // ref={el => this.autoFocusInst = el}
                        autoHeight
                        onChange={(e) => this.setState({addrDe: e})}
                        value={this.state.addrDe}
                    />
                    <InputItem
                        type={'number'}
                        value={this.state.weight}
                        onChange={value => this.setState({weight: value})}
                        placeholder="请输入重量"
                        extra={'斤'}
                    >
                        预估重量
                    </InputItem>
                    <Picker
                        data={vals.type}
                        title=""
                        cascade={false}
                        // cols={1}
                        // extra="请选择(可选)"
                        value={this.state.type}
                        onChange={type => this.setState({type})}
                        onOk={type => this.setState({type})}
                    ><List.Item arrow="horizontal">废品类型</List.Item>
                    </Picker>

                    <List.Item
                        extra={<Switch checked={this.state.isGive} platform={'ios'}
                                       onClick={() => (this.setState({isGive: !this.state.isGive}))}
                        />}>公益赠送</List.Item>

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


export default Form