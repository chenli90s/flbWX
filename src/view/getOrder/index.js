import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button, Toast} from 'antd-mobile';
import config from '../../utils/config'
import './style.css'
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class GetOrder extends React.Component {

    state = {
        dataSource,
        isLoading: true,
    };

    componentDidMount = async () => {
        await config.user.checkOpenid(this.props);
        // setTimeout(() => {
        //     this.rData = genData();
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(this.rData),
        //         isLoading: false,
        //     });
        // }, 600);
        let resp = await config.http.get('/order', {openid: config.user.openId});
        console.log(resp);
        // if (resp.status == 600) {
        //     this.setState({
        //         isLoading: false,
        //     });
        //     return;
        // }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(resp),
            isLoading: false,
        });

    };
    delOrder = async (id)=>{
        let resp = await config.http.get('/recv_order', {openid: config.user.openId, id})
        if(resp.status==200){
            Toast.info('接单成功');
            let resp = await config.http.get('/order', {openid: config.user.openId});
            console.log(resp);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(resp),
                isLoading: false,
            });
        }else {
            Toast.info('接单失败')
        }
    };

    render() {

        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} style={{padding: '0 15px', display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{lineHeight: '27px', fontSize: 16}}>
                        {/*<p>状态：{rowData.status}</p>*/}
                        <p>订单号：{rowData.id}</p>
                        <p>名字：{rowData.name}</p>
                        <p>电话：{rowData.phone}</p>
                        <p>地址：{rowData.address}</p>
                        <p>货品：{rowData.something}</p>
                        <p>上门时间：{rowData.smtime}</p>
                        <p>重量：{rowData.weight}斤</p>
                        <p>是否捐赠：{rowData.type?'是': '否'}</p>
                    </div>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        <Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(rowData.id)}}>接单</Button>
                    </div>
                </div>
            );
        };

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/2')
                    }}
                >我要接单</NavBar>

                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>我的订单</span>}
                    renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
                        {this.state.isLoading ? '加载中...' : '加载完成'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    className="am-list"
                    // pageSize={4}
                    useBodyScroll
                    // onScroll={() => { console.log('scroll'); }}
                    // scrollRenderAheadDistance={500}
                    // onEndReached={this.onEndReached}
                    // onEndReachedThreshold={10}
                />
            </div>
        )
    }
}

export default GetOrder