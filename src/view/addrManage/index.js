import React from 'react'
import {WingBlank, NavBar, WhiteSpace, Icon, ListView, Button, Toast} from 'antd-mobile';
import config from '../../utils/config'
import {Link} from 'react-router-dom'

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
});

class MgAddr extends React.Component {

    state = {
        dataSource,
        isLoading: true,
    };

    componentDidMount = async () => {
        await config.user.checkOpenid(this.props);
        if (!config.user.openId) {
            return
        }
        console.log(config.user.openId);
        let resp = await config.http.get('/show_addr?unionid=' + config.user.openId,);
        if (resp.status == 600) {
            this.setState({isLoading: false});
            return
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

    edit = (data) => {
        this.props.history.push({'pathname': '/static/user/prodedit', state: data})
    };

    delOrder = async (id) => {
        await config.http.get('/del_goods', {id});
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
        const types = this.props.location.state;
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
                <div key={rowID} style={{padding: '0 15px', fontSize: '16px'}}>
                    <p>联系人: {rowData.name}</p>
                    <p>联系电话: {rowData.phone}</p>
                    <div style={{wordBreak: 'break-all'}}>地址: {rowData.addr}</div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        margin: '7px auto'
                    }}>
                        <Button type={'primary'} inline size={'small'} onClick={() => {
                            // if(!types){
                            //     Toast.fail('err no data');
                            //     return
                            // }
                            let paths = '/static/form/1';
                            this.props.history.push({
                                pathname: paths,
                                state: {rowData, type: types}
                            })
                        }}>选择</Button>
                        <Button type={'primary'} inline size={'small'} onClick={() => {
                            this.props.history.push({
                                pathname: '/static/user/editAddr',
                                state: {rowData, type: types}
                            })
                        }}>编辑</Button>
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
                        this.props.history.goBack()
                    }}
                    rightContent={[<Link to={'/static/user/editAddr'}>添加地址</Link>]}
                >地址管理</NavBar>
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

export default MgAddr