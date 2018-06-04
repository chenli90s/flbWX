import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button, Toast} from 'antd-mobile';
import config from '../../utils/config'
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class ManageOrder extends React.Component {

    state = {
        dataSource,
        isLoading: true,
    };

    componentDidMount = async () => {
        await config.user.checkOpenid(this.props);
        let resp = await config.http.get('/all_goods', {openid: config.user.openId});
        console.log(resp);
        // if (resp.status == 600) {
        //     this.setState({
        //         isLoading: false,
        //     });
        //     return;
        // }
        if (resp.res.length > 0) {
            const dataBlob = {};
            resp.res.forEach((value, index) => {
                dataBlob[index] = value;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataBlob),
                isLoading: false,
            });
        }else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
            });
        }

    };

    delOrder = async (id)=>{
        await config.http.get('/set_goods', {id});
        let resp = await config.http.get('/all_goods');
        console.log(resp);
        // if (resp.status == 600) {
        //     this.setState({
        //         isLoading: false,
        //     });
        //     return;
        // }
        if (resp.res.length > 0) {
            const dataBlob = {};
            resp.res.forEach((value, index) => {
                dataBlob[index] = value;
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataBlob),
                isLoading: false,
            });
        }else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
            });
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
                        <p>商品名字：{rowData.goods_name}</p>
                        <p>电话：{rowData.phone}</p>
                        <p>地址：{rowData.addr}</p>
                    </div>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        <Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(rowData.id)}}>点击完成</Button>
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
                >商城订单</NavBar>

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

export default ManageOrder