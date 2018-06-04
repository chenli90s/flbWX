import React from 'react';
import {Card, WhiteSpace, NavBar, Icon, WingBlank, Button} from 'antd-mobile'
import config from '../../utils/config'

class Balance extends React.Component {

    state = {
        userInfo: ''
    };

    componentDidMount = async () => {
        if (!config.user.userInfo) {
            let userInfo = await config.user.getOpenInfo(this.props);
            if (userInfo) {
                console.log(userInfo)
                this.setState({userInfo})
            }
        } else {
            this.setState({userInfo: config.user.userInfo})
        }
    };

    render() {
        console.log(this.state.userInfo);
        return (
            <div className={'balance'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/2')
                    }}
                >我的余额</NavBar>
                <WhiteSpace size="lg"/>
                <Card full>
                    {this.state.userInfo && <Card.Header
                        title={this.state.userInfo.nickname}
                        thumb={this.state.userInfo.headimgurl}
                        // extra={<span>this is extra</span>}
                    />}
                    <Card.Body>
                        <div>余额：0</div>
                    </Card.Body>
                    {/*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*/}
                    <WhiteSpace/>
                    <WingBlank>
                        <Button type={'primary'}>提现</Button>
                    </WingBlank>
                </Card>
            </div>
        )
    }
}

export default Balance