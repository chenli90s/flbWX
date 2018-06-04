import React from 'react';
import {Carousel, Grid, Toast} from 'antd-mobile'
// import Images from '../../asset/img/timg.jpg'
import One from '../../asset/img/1.jpg'
import Two from '../../asset/img/2.jpg'
import Three from '../../asset/img/3.jpg'
import './style.css'
import Svg1 from '../../asset/icon/1.svg'
import Svg2 from '../../asset/icon/2.svg'
import Svg3 from '../../asset/icon/3.svg'
import Svg4 from '../../asset/icon/4.svg'
import Svg5 from '../../asset/icon/5.svg'
import Svg6 from '../../asset/icon/6.svg'
import config from "../../utils/config";

const datas = [
    {
        text: '废纸',
        type: '1',
        icon: Svg1
    },
    {
        text: '废塑料',
        type: '2',
        icon: Svg2,
    },{
        icon: Svg3,
        text: '废金属',
        type: '3'
    },{
        icon: Svg4,
        text: '废纺织品',
        type: '4'

    },{
        text: '废家店',
        icon: Svg5,
        type: '5'

    },{
        text: '其他',
        icon: Svg6,
        type: '6'
    },

];

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 150,
        };
        this.imgs = {
            '1': One,
            '2': Two,
            '3': Three,

        }
    }

    select =(index)=>{
        console.log(index)
        const {history} = this.props;
        if(index.type==1){
            history.push(`/static/form/${index.type}`)
        }else {
            Toast.info('此功能暂未开放')
        }

    };

    // componentWillMount = async ()=>{
    //     await config.user.checkOpenid(this.props);
    //     let resp = await config.http.get('/per_info', {openid: config.user.openId});
    //     // this.setState({role: resp.role})
    //     if(resp.role==2){
    //         this.props.history.push('/static/2')
    //     }
    // };


    render(){
        return(
            <div className={'home'}>
                <Carousel
                    autoplay={true}
                    infinite
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                >
                    {this.state.data.map(val => (
                        <a
                            key={val}
                            href="#"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={this.imgs[val]}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <Grid data={datas}
                      onClick={this.select}
                      columnNum={3} itemStyle={{ height: '150px', background: 'rgba(0,0,0,.05)' }}/>
            </div>
        )
    }
}

export default Home