import React from 'react';
import {Card, WhiteSpace, NavBar, Icon, WingBlank, Button, Grid} from 'antd-mobile'


const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];


class Prod extends React.Component{

    render(){
        return(
            <div className="prod">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/2')
                    }}
                >积分商城</NavBar>
                <WhiteSpace size="lg" />
                <Card full>
                    <Card.Header
                        title="name"
                        thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
                        // extra={<span>this is extra</span>}
                    />
                    <Card.Body>
                        <div>积分：0</div>
                    </Card.Body>
                    {/*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*/}
                    <WhiteSpace/>
                </Card>
                <WhiteSpace size="lg" />
                <Grid data={data} columnNum={2} renderItem={(item)=>{
                    return (
                        <div className="goods">
                            <img src={item.img}
                                 style={{width:90, height:90}}
                                 alt=""/>
                            <div className="goods-footer">
                                <div className="goods-text">
                                    <p>{item.des}</p>
                                    <p>积分:30</p>
                                </div>
                                <Button type={'primary'} inline size={'small'}>兑换</Button>
                            </div>
                        </div>
                    )
                }}/>
            </div>
        )
    }
}

export default Prod