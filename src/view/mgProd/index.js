import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button, Toast} from 'antd-mobile';
import config from '../../utils/config'
import { Link } from 'react-router-dom'
const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class MgProd extends React.Component {

    state = {
        dataSource,
        isLoading: true,
    };

    componentDidMount = async () => {
        await config.wx.getWx(this.props);
        let resp = await config.http.get('/goods_list');
        // console.log(resp);
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

    edit = (data)=>{
        this.props.history.push({'pathname': '/static/user/prodedit', state:data})
    };

    delOrder = async (id)=>{
        await config.http.get('/del_goods', {id})
        let resp = await config.http.get('/goods_list');
        // console.log(resp);
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
                        <img src={rowData.url} alt="" style={{height:90, width:90}}/>
                    </div>
                    <div style={{width: '100%', marginLeft: '10px', marginTop: '10px'}}>
                        <p style={{fontSize: '20px'}}>{rowData.goods_name}</p>
                        <p>积分：{rowData.need_int}</p>
                        <p>价格：{rowData.jia}</p>
                    </div>
                    <div style={{margin: 'auto'}}>
                        <Button type={'primary'} inline size={'small'} onClick={()=>{this.edit(rowData)}}>修改</Button>
                        <div style={{width: 30}}/>
                        <Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(rowData.id)}}>删除</Button>
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
                    rightContent={[<Link to={'/static/user/prodedit'}>添加</Link>]}
                >商品管理</NavBar>
                <WhiteSpace/>
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

export default MgProd