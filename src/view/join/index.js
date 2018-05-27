import React from 'react';
import {WingBlank, Button,
    NavBar, WhiteSpace, Icon, List, InputItem, Picker} from 'antd-mobile';

class Join extends React.Component {

    state = {
        name: '',
        phone: '',
        type: ['货车']
    };

    submit = ()=>{
        console.log(this.state)
    }

    render() {
        return (
            <div className="join">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/2')
                    }}
                >加入我们</NavBar>
                <List>
                    <InputItem placeholder={'请输入姓名'} type={'text'}>
                        联系人
                    </InputItem>
                    <InputItem placeholder={'请输入号码'} type={'phone'}>
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