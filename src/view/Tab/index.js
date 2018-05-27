import React from 'react';
import {TabBar } from 'antd-mobile'
import homeSvg from '../../asset/icon/home.svg'
import userSvg from '../../asset/icon/user.svg'
import prodSvg from '../../asset/icon/prod.svg'
import dhomeSvg from '../../asset/icon/dhome.svg'
import duserSvg from '../../asset/icon/duser.svg'
import dprodSvg from '../../asset/icon/dprod.svg'
import Home from '../home'
import User from '../user'
import Prod from '../prod'

const Pages = {
    '0': Prod,
    '1': Home,
    '2': User
};

class Tabs extends React.Component{

    constructor(props) {
        super(props);
        const type = props.match.params.type;
        this.state = {
            selectedTab: type,
            hidden: false,
            fullScreen: false,
        };
    }

    renderContent(pageText) {
        const Page = Pages[pageText];
        if(!Page){
            return ''
        }
        return <Page {...this.props}/>
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 } }>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#55a532"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >
                    <TabBar.Item
                        title="积分商场"
                        key="Life"
                        icon={<img style={{
                            width: '22px',
                            height: '22px'}}
                            src={dprodSvg}
                        />
                        }
                        selectedIcon={<img style={{
                            width: '22px',
                            height: '22px',}}
                            src={prodSvg}
                        />
                        }
                        selected={this.state.selectedTab === '0'}
                        // badge={1}
                        onPress={() => {
                            this.setState({
                                selectedTab: '0',
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('0')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <img style={{
                                width: '22px',
                                height: '22px',}}
                                 src={dhomeSvg}
                            />
                        }
                        selectedIcon={
                            <img style={{
                                width: '22px',
                                height: '22px',}}
                                 src={homeSvg}
                            />
                        }
                        title="回收"
                        key="Koubei"
                        selected={this.state.selectedTab === '1'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '1',
                            });
                        }}
                        data-seed="logId1"
                    >
                        {this.renderContent('1')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <img style={{
                                width: '22px',
                                height: '22px',}}
                                 src={duserSvg}
                            />
                        }
                        selectedIcon={
                            <img style={{
                                width: '22px',
                                height: '22px',}}
                                 src={userSvg}
                            />
                        }
                        title="我的"
                        key="Friend"
                        selected={this.state.selectedTab === '2'}
                        onPress={() => {
                            this.setState({
                                selectedTab: '2',
                            });
                        }}
                    >
                        {this.renderContent('2')}
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Tabs