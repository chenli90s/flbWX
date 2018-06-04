import React from 'react'
import {SegmentedControl, WingBlank, NavBar, WhiteSpace, Icon, ListView, Button} from 'antd-mobile';
import config from '../../utils/config'


class Order extends React.Component {

    onChange = (e) => {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({index: e.nativeEvent.selectedSegmentIndex})
    };
    onValueChange = (value) => {
        console.log(value);
        this.setList(value)
    };

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            index: 0,
        };

        this.data = {
            '等接单': [],
            '上门中': [],
            '已完成': []
        }
    }

    setList = (types) => {
        const data = this.data[types];
        const dataBlob = {};
        data.forEach((value, index) => {
            dataBlob[index] = value;
        });
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataBlob),
            isLoading: false,
        });
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
        let resp = await config.http.get('/my_order', {openid: config.user.openId});
        console.log(resp);
        if(resp.status == 600){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
            });
            return;
        }
        if (resp.res.length > 0) {

            resp.res.forEach((value) => {

                this.data[value.status].push(value)
            });
            this.setList('等接单');
        }else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
            });
        }
    };

    // onEndReached = (event) => {
    //     // load new data
    //     // hasMore: from backend data, indicates whether it is the last page, here is false
    //     if (this.state.isLoading && !this.state.hasMore) {
    //         return;
    //     }
    //     console.log('reach end', event);
    //     this.setState({isLoading: true});
    //     setTimeout(() => {
    //         this.rData = {...this.rData, ...genData(++pageIndex)};
    //         console.log(this.rData)
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(this.rData),
    //             isLoading: false,
    //         });
    //     }, 1000);
    // }

    filterButton = (types, id) => {
        if (types == '等接单') {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(id)}}>取消订单</Button>
                </div>)
        }
        // if(types == '已完成') {
        //     return (
        //         <div style={{display: 'flex', alignItems: 'center'}}>
        //             <Button type={'primary'} inline size={'small'} onClick={()=>{this.delOrder(id)}}>删除订单</Button>
        //         </div>
        //     )
        // }
    };

    delOrder = async (order_id)=>{
        let resp = await config.http.get('/del_corder', {order_id})
        if(resp.status === 200){
            this.data = {
                '等接单': [],
                '上门中': [],
                '已完成': []
            }
            resp = await config.http.get('/my_order', {openid: config.user.openId});
            console.log(resp);
            if(resp.status == 600){
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows({}),
                    isLoading: false,
                });
                return;
            }
            if (resp.res.length > 0) {
                resp.res.forEach((value) => {
                    this.data[value.status].push(value)
                });
                if(this.state.index === 0){
                    this.setList('等接单');
                }else {
                    this.setList('已完成');
                }
            }
        }else {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows({}),
                isLoading: false,
            });
            return;
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
                        <p>状态：{rowData.status}</p>
                        <p>电话：{rowData.phone}</p>
                        <p>地址：{rowData.address}</p>
                        <p>上门时间：{rowData.sm_time}</p>
                    </div>
                    {this.filterButton(rowData.status, rowData.id)}
                </div>
            );
        };
        return (
            <div className="order">
                <NavBar
                    mode="light"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {
                        this.props.history.push('/static/2')
                    }}
                >我的订单</NavBar>
                <WhiteSpace/>
                <WhiteSpace/>
                <WingBlank size="lg" className="sc-example">
                    <SegmentedControl
                        values={['等接单', '上门中', '已完成']}
                        selectedIndex={this.state.index}
                        onChange={this.onChange}
                        onValueChange={this.onValueChange}
                    />
                </WingBlank>

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

export default Order