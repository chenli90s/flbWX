import React from 'react';
import {Carousel, Grid} from 'antd-mobile'
import Images from '../../asset/img/timg.jpg'
import './style.css'
import Svg1 from '../../asset/icon/1.svg'
import Svg2 from '../../asset/icon/2.svg'
import Svg3 from '../../asset/icon/3.svg'
import Svg4 from '../../asset/icon/4.svg'
import Svg5 from '../../asset/icon/5.svg'
import Svg6 from '../../asset/icon/6.svg'

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
            imgHeight: 400,
        };
    }

    select =(index)=>{
        // console.log(index)
        const {history} = this.props;
        history.push(`/static/form/${index.type}`)
    };


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
                                src={Images}
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