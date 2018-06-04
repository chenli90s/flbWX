import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button, Toast} from 'antd-mobile';
import config from '../../utils/config'
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class HistoryOrder extends React.Component {

    state = {
        dataSource,
        isLoading: true,
    };

    componentDidMount = async () => {
        await config.user.checkOpenid(this.props);
        let resp = await config.http.get('/history', {openid: config.user.openId});
        console.log(resp);
        if (resp.status == 600) {
            this.setState({
                isLoading: false,
            });
            return;
        }
        if (resp.res.length > 0) {
            const dataBlob = {};
            resp.res.forEach((value, index) => {
                dataBlob[index] = value;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataBlob),
                isLoading: false,
            });
        }

    };

    delOrder = async (id, type, real_weight)=>{
        if(type){
            // await config.http.get('/complete_order', {openid:config.user.openId, order_id: id, real_weight, type});
            // let resp = await config.http.get('/my_order', {openid: config.user.openId});
            // console.log(resp);
            // Toast.info('提交成功');
            // if (resp.status == 600) {
            //     this.setState({
            //         isLoading: false,
            //     });
            //     return;
            // }
            // if (resp.res.length > 0) {
            //     const dataBlob = {};
            //     resp.res.forEach((value, index) => {
            //         dataBlob[index] = value;
            //     });
            //     this.setState({
            //         dataSource: this.state.dataSource.cloneWithRows(dataBlob),
            //         isLoading: false,
            //     });
            // }
            this.props.history.push({'pathname': '/static/user/confirm', state: {id, type}})
        }else {
            this.props.history.push({'pathname': '/static/user/confirm', state: {id}})
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
                        {/*<p>订单号：{rowData.id}</p>*/}
                        <p>名字：{rowData.name}</p>
                        <p>电话：{rowData.phone}</p>
                        <p>地址：{rowData.address}</p>
                        <p>重量：{rowData.weight}斤</p>
                        {rowData.money&&<p>价格：{rowData.money}元</p>}
                        <p>是否捐赠：{rowData.money?'否':'是'}</p>
                    </div>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        {/*<Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(rowData.id, rowData.type, rowData.weight)}}>完成接单</Button>*/}
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
                >历史订单</NavBar>

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

export default HistoryOrder