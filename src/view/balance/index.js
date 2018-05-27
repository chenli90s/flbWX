import React from 'react';
import {Card, WhiteSpace, NavBar, Icon, WingBlank, Button} from 'antd-mobile'

class Balance extends React.Component{

    render(){
        return(
            <div className={'balance'}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/2')
                    }}
                >我的余额</NavBar>
                <WhiteSpace size="lg" />
                <Card full>
                    <Card.Header
                        title="name"
                        thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                        // extra={<span>this is extra</span>}
                    />
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