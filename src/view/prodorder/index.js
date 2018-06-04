import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button} from 'antd-mobile';
import config from '../../utils/config'

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class ProdOrder extends React.Component {

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
        let resp = await config.http.get('/goods_order', {openid: config.user.openId});
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
                        <p>电话：{rowData.phone}</p>
                        <p>地址：{rowData.address}</p>
                        <p>商品名称：{rowData.goods_name}</p>
                        {/*<p>上门时间：{rowData.sm_time}</p>*/}
                    </div>
                    {/*{this.filterButton(rowData.status, rowData.id)}*/}
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
                    renderHeader={() => <span>我的订单</span>}
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

export default ProdOrder