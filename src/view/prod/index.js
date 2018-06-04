import React from 'react';
import {Card, WhiteSpace, NavBar, Icon, WingBlank, Button, Grid, Toast} from 'antd-mobile'
import config from '../../utils/config'

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


class Prod extends React.Component {

    state = {
        name: '',
        head: '',
        integral: '',
        data: []
    };

    componentDidMount = async () => {


        // await config.user.checkOpenid(this.props);

        let info = await config.user.getOpenInfo(this.props);
        if (info) {
            this.setState({
                name: info.nickname,
                head: info.headimgurl
            })
        }

        let res = await config.http.get('/per_info', {openid: config.user.openId});
        // this.setState({role: resp.role})
        if(res.role==2){
            this.props.history.push('/static/2')
        }

        // this.setState({name: info})
        let integral = await config.http.get('/integral', {openid: config.user.openId});
        this.setState({integral: integral.integral});
        let resp = await config.http.get('/goods_list');
        this.setState({data: resp.res})
    };

    submit = async (id, s) => {
        let resp = await config.http.get('/per_info', {openid: config.user.openId});
        // this.setState({role: resp.role})
        if(resp.role==3){
            Toast.info('你已是超级管理员， 无法提交')
        }

        console.log(id, s);
        if (this.state.integral < parseInt(s)) {
            Toast.fail('积分不够无法换取');
            return null;
        }
        this.props.history.push({pathname:'/static/user/submit', state: {id, s}})
    };

    render() {
        console.log(this);
        let {type} = this.props.match.params;
        return (
            <div className="prod">
                {type?'':<NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/2')
                    }}
                >积分商城</NavBar>}
                <WhiteSpace size="lg"/>
                <Card full>
                    {this.state.name && <Card.Header
                        title={this.state.name}
                        thumb={this.state.head}
                        // extra={<span>this is extra</span>}
                    />}
                    <Card.Body>
                        <div>积分：{this.state.integral}</div>
                    </Card.Body>
                    {/*<Card.Footer content="footer content" extra={<div>extra footer content</div>} />*/}
                    <WhiteSpace/>
                </Card>
                <WhiteSpace size="lg"/>
                <Grid data={this.state.data} columnNum={2}
                      itemStyle={{height: 210}}
                      renderItem={(item) => {
                          return (
                              <div className="goods">
                                  <img src={item.url}
                                       style={{width: 90, height: 90}}
                                       alt=""/>
                                  <div className="goods-footer">
                                      <div className="goods-text">
                                          <p>{item.goods_name}</p>
                                          {/*<p>价格：{item.jia}</p>*/}
                                          <p>积分:{item.need_int}</p>
                                      </div>
                                      <Button type={'primary'} inline size={'small'}
                                              onClick={() => {
                                                  this.submit(item.id, item.need_int)
                                              }}
                                      >兑换</Button>
                                  </div>
                              </div>
                          )
                      }}/>
            </div>
        )
    }
}

export default Prod